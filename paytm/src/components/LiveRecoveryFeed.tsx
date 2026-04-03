'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { RecoveryEvent } from '@/lib/types';
import { SOURCE_CONFIG } from '@/lib/data';
import { Bot, CheckCircle2, AlertTriangle, XCircle, ArrowUpCircle, TrendingUp, Scan } from 'lucide-react';

interface LiveRecoveryFeedProps {
  events: RecoveryEvent[];
}

const STATUS_ICONS: Record<string, React.ReactNode> = {
  'scanning': <Scan className="w-4 h-4 text-accent-green animate-pulse" />,
  'verified': <CheckCircle2 className="w-4 h-4 text-accent-green" />,
  'alert': <AlertTriangle className="w-4 h-4 text-accent-amber" />,
  'recovered': <CheckCircle2 className="w-4 h-4 text-accent-green" />,
  'escalated': <ArrowUpCircle className="w-4 h-4 text-accent-blue" />,
  'critical': <XCircle className="w-4 h-4 text-accent-red" />,
  'auto-action': <Bot className="w-4 h-4 text-accent-green" />,
  'optimized': <TrendingUp className="w-4 h-4 text-accent-blue" />,
};

const STATUS_TAGS: Record<string, { class: string; label: string }> = {
  'scanning': { class: 'tag-green', label: 'SCANNING' },
  'verified': { class: 'tag-green', label: 'VERIFIED' },
  'alert': { class: 'tag-amber', label: 'OVERCHARGE' },
  'recovered': { class: 'tag-green', label: 'RECOVERED' },
  'escalated': { class: 'tag-blue', label: 'ESCALATED' },
  'critical': { class: 'tag-red', label: 'CRITICAL' },
  'auto-action': { class: 'tag-green', label: 'AUTO-ACTION' },
  'optimized': { class: 'tag-blue', label: 'OPTIMIZATION' },
};

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
}

export default function LiveRecoveryFeed({ events }: LiveRecoveryFeedProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Feed header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent-green pulse-dot" />
          <span className="text-text-primary text-sm font-semibold" style={{ fontFamily: 'var(--font-mono)' }}>
            LIVE RECOVERY FEED
          </span>
        </div>
        <span className="text-text-muted text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
          {events.length} events
        </span>
      </div>

      {/* Feed content — scrollable, newest on top */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-1 relative scanline">
        <AnimatePresence initial={false}>
          {[...events].reverse().map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -30, height: 0 }}
              animate={{ opacity: 1, x: 0, height: 'auto' }}
              transition={{ 
                type: 'spring', 
                stiffness: 300, 
                damping: 30,
                delay: idx === 0 ? 0 : 0
              }}
              className={`feed-entry ${event.status} mb-4`}
            >
              {/* Header row */}
              <div className="flex items-start justify-between gap-3 mb-1.5">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {STATUS_ICONS[event.status]}
                  <span className="text-text-primary text-sm font-semibold truncate leading-snug">
                    {event.title}
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`tag ${STATUS_TAGS[event.status]?.class}`}>
                    {STATUS_TAGS[event.status]?.label}
                  </span>
                  {event.source && (
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
                  )}
                </div>
              </div>

              {/* Timestamp */}
              <div className="text-text-muted text-[10px] mb-2" style={{ fontFamily: 'var(--font-mono)' }}>
                {formatTime(event.timestamp)}
              </div>

              {/* Thoughts */}
              <div className="space-y-1 ml-0.5">
                {event.thoughts.map((thought, tIdx) => (
                  <div key={tIdx} className="flex items-start gap-2">
                    <span className="text-xs leading-relaxed flex-shrink-0">
                      {thought.type === 'action' || thought.type === 'result' ? '🤖' : thought.type === 'reasoning' ? '🧠' : '👁️'}
                    </span>
                    <span className={`text-xs leading-relaxed ${
                      thought.type === 'action' || thought.type === 'result'
                        ? 'text-accent-green font-semibold' 
                        : thought.type === 'decision'
                          ? 'text-text-primary font-medium'
                          : 'text-text-secondary'
                    }`}>
                      {thought.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Recovery amount badge */}
              {event.recoveryAmount && event.status === 'recovered' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg"
                  style={{ background: 'rgba(0, 255, 135, 0.08)', border: '1px solid rgba(0, 255, 135, 0.2)' }}
                >
                  <span className="text-accent-green text-sm font-bold" style={{ fontFamily: 'var(--font-mono)' }}>
                    +₹{new Intl.NumberFormat('en-IN').format(event.recoveryAmount)}
                  </span>
                  <span className="text-accent-green text-[10px] uppercase tracking-wider font-semibold">
                    credited
                  </span>
                </motion.div>
              )}

              {event.recoveryAmount && event.status === 'acting' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg"
                  style={{ background: 'rgba(255, 184, 0, 0.08)', border: '1px solid rgba(255, 184, 0, 0.2)' }}
                >
                  <span className="text-accent-amber text-sm font-bold" style={{ fontFamily: 'var(--font-mono)' }}>
                    ₹{new Intl.NumberFormat('en-IN').format(event.recoveryAmount)}
                  </span>
                  <span className="text-accent-amber text-[10px] uppercase tracking-wider font-semibold">
                    claim filed
                  </span>
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty state */}
        {events.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-text-muted">
            <Scan className="w-8 h-8 mb-3 animate-pulse" />
            <span className="text-sm" style={{ fontFamily: 'var(--font-mono)' }}>
              Initializing agent...
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
