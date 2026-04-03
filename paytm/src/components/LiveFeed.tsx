'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RecoveryEvent, AgentThought } from '@/lib/types';
import { SOURCE_CONFIG } from '@/lib/data';
import { Brain, Scan, AlertTriangle, Zap, CheckCircle2, Bot } from 'lucide-react';

interface LiveFeedProps {
  events: RecoveryEvent[];
}

const STATUS_CONFIG: Record<string, { icon: React.ReactNode; label: string; tagClass: string; borderColor: string }> = {
  'scanning':  { icon: <Scan className="w-4 h-4" />,          label: 'SCANNING',    tagClass: 'tag-green',  borderColor: 'rgba(0,255,135,0.3)' },
  'analyzing': { icon: <Brain className="w-4 h-4" />,         label: 'AI THINKING', tagClass: 'tag-amber',  borderColor: 'rgba(255,184,0,0.4)' },
  'deciding':  { icon: <Brain className="w-4 h-4" />,         label: 'AI DECIDING', tagClass: 'tag-amber',  borderColor: 'rgba(255,184,0,0.5)' },
  'alert':     { icon: <AlertTriangle className="w-4 h-4" />, label: 'ALERT',       tagClass: 'tag-red',    borderColor: 'rgba(255,59,92,0.3)' },
  'acting':    { icon: <Bot className="w-4 h-4" />,           label: 'AI ACTING',   tagClass: 'tag-green',  borderColor: 'rgba(0,255,135,0.4)' },
  'recovered': { icon: <CheckCircle2 className="w-4 h-4" />,  label: 'RECOVERED',   tagClass: 'tag-green',  borderColor: 'rgba(0,255,135,0.5)' },
  'thinking':  { icon: <Brain className="w-4 h-4" />,         label: 'THINKING',    tagClass: 'tag-blue',   borderColor: 'rgba(59,130,246,0.3)' },
};

// Typewriter component that types out text character by character
function TypewriterText({ text, speed = 18, onComplete, className }: { 
  text: string; speed?: number; onComplete?: () => void; className?: string 
}) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
        onComplete?.();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span className={className}>
      {displayed}
      {!done && <span className="inline-block w-[6px] h-[14px] bg-accent-green ml-0.5 animate-pulse" style={{ verticalAlign: 'text-bottom' }} />}
    </span>
  );
}

// Confidence bar that animates in
function ConfidenceBar({ confidence }: { confidence: number }) {
  return (
    <div className="flex items-center gap-2 mt-1">
      <div className="w-20 h-1.5 rounded-full bg-bg-elevated overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${confidence}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{
            background: confidence > 80 
              ? 'linear-gradient(90deg, #00ff87, #00cc6a)' 
              : confidence > 50 
                ? 'linear-gradient(90deg, #ffb800, #ffd166)' 
                : 'linear-gradient(90deg, #ff3b5c, #ff6b81)',
          }}
        />
      </div>
      <span className={`text-[10px] font-bold ${
        confidence > 80 ? 'text-accent-green' : confidence > 50 ? 'text-accent-amber' : 'text-accent-red'
      }`} style={{ fontFamily: 'var(--font-mono)' }}>
        {confidence}%
      </span>
    </div>
  );
}

function ThoughtLine({ thought, delay }: { thought: AgentThought; delay: number }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  if (!visible) return null;

  const prefixMap: Record<string, { icon: string; color: string }> = {
    observation: { icon: '👁️', color: 'text-text-secondary' },
    reasoning:   { icon: '🧠', color: 'text-accent-amber' },
    decision:    { icon: '⚡', color: 'text-accent-green' },
    action:      { icon: '🤖', color: 'text-accent-green' },
    result:      { icon: '💰', color: 'text-accent-green' },
  };

  const { icon, color } = prefixMap[thought.type] || prefixMap.observation;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      className="flex items-start gap-2 py-1"
    >
      <span className="text-xs flex-shrink-0 mt-0.5">{icon}</span>
      <div className="flex-1 min-w-0">
        <TypewriterText 
          text={thought.text} 
          speed={thought.type === 'decision' || thought.type === 'result' ? 12 : 15}
          className={`text-xs leading-relaxed ${
            thought.type === 'decision' || thought.type === 'action' || thought.type === 'result'
              ? `${color} font-semibold` 
              : 'text-text-secondary'
          }`} 
        />
        {thought.confidence && <ConfidenceBar confidence={thought.confidence} />}
      </div>
    </motion.div>
  );
}

export default function LiveFeed({ events }: LiveFeedProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to top (newest first)
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [events.length]);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3.5 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-accent-green pulse-dot" />
          <span className="text-text-primary text-sm font-bold tracking-wide" style={{ fontFamily: 'var(--font-mono)' }}>
            AI AGENT LOG
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Brain className="w-3.5 h-3.5 text-accent-purple" />
          <span className="text-accent-purple text-[10px] font-bold uppercase tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>
            Thinking...
          </span>
        </div>
      </div>

      {/* Feed */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-4 space-y-2">
        <AnimatePresence initial={false}>
          {[...events].reverse().map((event) => {
            const config = STATUS_CONFIG[event.status] || STATUS_CONFIG.scanning;
            const isRecovery = event.status === 'recovered';
            const isDecision = event.status === 'deciding';
            const isAction = event.status === 'acting';

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: -20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                transition={{ type: 'spring', stiffness: 250, damping: 30 }}
                className={`rounded-xl p-4 mb-3 transition-all duration-300 ${
                  isRecovery ? 'celebrate' : ''
                }`}
                style={{
                  background: isRecovery 
                    ? 'linear-gradient(135deg, rgba(0,255,135,0.06), rgba(0,204,106,0.02))'
                    : isDecision
                      ? 'linear-gradient(135deg, rgba(255,184,0,0.04), rgba(255,184,0,0.01))'
                      : 'rgba(17,19,24,0.6)',
                  border: `1px solid ${config.borderColor}`,
                }}
              >
                {/* Event header */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className={
                      event.status === 'scanning' ? 'text-accent-green animate-pulse' 
                      : event.status === 'analyzing' || event.status === 'deciding' ? 'text-accent-amber'
                      : event.status === 'acting' ? 'text-accent-green'
                      : event.status === 'recovered' ? 'text-accent-green'
                      : 'text-text-muted'
                    }>
                      {config.icon}
                    </span>
                    <span className={`text-sm font-semibold leading-snug ${isRecovery ? 'text-accent-green' : 'text-text-primary'}`}>
                      {event.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`tag ${config.tagClass}`}>
                      {config.label}
                    </span>
                    <span 
                      className="tag"
                      style={{ 
                        background: SOURCE_CONFIG[event.source]?.bgColor, 
                        color: SOURCE_CONFIG[event.source]?.color,
                        border: `1px solid ${SOURCE_CONFIG[event.source]?.color}33`
                      }}
                    >
                      {SOURCE_CONFIG[event.source]?.label}
                    </span>
                  </div>
                </div>

                {/* Timestamp */}
                <div className="text-text-muted text-[10px] mb-2.5" style={{ fontFamily: 'var(--font-mono)' }}>
                  {event.timestamp.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
                </div>

                {/* AI Thoughts — typed out one by one */}
                <div className="space-y-0.5 ml-0.5">
                  {event.thoughts.map((thought, tIdx) => (
                    <ThoughtLine key={tIdx} thought={thought} delay={tIdx * 600} />
                  ))}
                </div>

                {/* Recovery celebration badge */}
                {isRecovery && event.recoveryAmount && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, type: 'spring', stiffness: 300 }}
                    className="mt-4 inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl"
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(0,255,135,0.12), rgba(0,255,135,0.04))', 
                      border: '1px solid rgba(0,255,135,0.3)',
                      boxShadow: '0 0 30px rgba(0,255,135,0.08)',
                    }}
                  >
                    <span className="text-accent-green text-lg font-black" style={{ fontFamily: 'var(--font-mono)' }}>
                      +₹{new Intl.NumberFormat('en-IN').format(event.recoveryAmount)}
                    </span>
                    <span className="text-accent-green text-[10px] font-bold uppercase tracking-widest">
                      CREDITED TO ACCOUNT
                    </span>
                  </motion.div>
                )}

                {/* Claim filed badge */}
                {isAction && event.recoveryAmount && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5 }}
                    className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg"
                    style={{ 
                      background: 'rgba(255,184,0,0.08)', 
                      border: '1px solid rgba(255,184,0,0.2)' 
                    }}
                  >
                    <Zap className="w-3 h-3 text-accent-amber" />
                    <span className="text-accent-amber text-xs font-bold" style={{ fontFamily: 'var(--font-mono)' }}>
                      ₹{new Intl.NumberFormat('en-IN').format(event.recoveryAmount)} CLAIM FILED
                    </span>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Empty state */}
        {events.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-text-muted py-20">
            <Brain className="w-10 h-10 mb-4 animate-pulse text-accent-purple opacity-50" />
            <span className="text-sm" style={{ fontFamily: 'var(--font-mono)' }}>
              Agent initializing...
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
