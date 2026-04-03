'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Brain, Sparkles } from 'lucide-react';
import { ChatMessage } from '@/lib/types';
import { AI_RESPONSES, AI_SUGGESTIONS } from '@/lib/dashboard-data';

// ============================================================
// AI Assistant — Conversational, helpful, context-aware
// Floating chat panel with pre-built responses
// ============================================================

function matchResponse(input: string): string {
  const lower = input.toLowerCase().trim();

  // Try to match against known queries
  for (const [key, response] of Object.entries(AI_RESPONSES)) {
    if (key === 'default') continue;
    // Check if the input contains key words from the query
    const keyWords = key.split(' ');
    const matchCount = keyWords.filter(w => lower.includes(w)).length;
    if (matchCount >= keyWords.length * 0.6) {
      return response;
    }
  }

  // Fallback
  return AI_RESPONSES['default'];
}

// Simple markdown-like formatting for bold text
function FormattedText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="font-semibold text-text-primary">{part.slice(2, -2)}</strong>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={`chat-message ${isUser ? 'user' : 'assistant'}`}
    >
      {!isUser && (
        <div className="chat-avatar">
          <Brain className="w-3.5 h-3.5 text-accent-purple" />
        </div>
      )}
      <div className={`chat-bubble ${isUser ? 'user' : 'assistant'}`}>
        {message.text.split('\n').map((line, i) => (
          <p key={i} className="m-0 mb-1 last:mb-0 text-[13px] leading-relaxed">
            <FormattedText text={line} />
          </p>
        ))}
      </div>
    </motion.div>
  );
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="chat-message assistant"
    >
      <div className="chat-avatar">
        <Brain className="w-3.5 h-3.5 text-accent-purple" />
      </div>
      <div className="chat-bubble assistant">
        <div className="typing-dots">
          <span className="typing-dot" style={{ animationDelay: '0ms' }} />
          <span className="typing-dot" style={{ animationDelay: '150ms' }} />
          <span className="typing-dot" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </motion.div>
  );
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Hi! I\'m your SettleGuard AI assistant for the Paytm merchant ecosystem. I can help you understand your losses, prioritize claims, and track recoveries across Paytm and all connected platforms. Ask me anything!',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: text.trim(),
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulate AI typing delay
    setIsTyping(true);
    const delay = 800 + Math.random() * 1200; // 0.8-2s delay for realism
    setTimeout(() => {
      const response = matchResponse(text);
      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        text: response,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, delay);
  };

  return (
    <>
      {/* Floating trigger button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="ai-fab"
          >
            <Sparkles className="w-4 h-4 text-bg-primary" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="ai-chat-panel"
          >
            {/* Header */}
            <div className="ai-chat-header">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.15)' }}>
                  <Brain className="w-3.5 h-3.5 text-accent-purple" />
                </div>
                <div>
                  <p className="text-text-primary text-sm font-semibold m-0">AI Assistant</p>
                  <p className="text-accent-purple text-[10px] font-semibold m-0" style={{ fontFamily: 'var(--font-mono)' }}>ONLINE</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="ai-chat-close">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="ai-chat-messages">
              {messages.map(msg => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={chatEndRef} />
            </div>

            {/* Suggestions — show after every AI response */}
            {!isTyping && (
              <div className="ai-chat-suggestions">
                {AI_SUGGESTIONS.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => sendMessage(suggestion)}
                    className="ai-suggestion-btn"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="ai-chat-input-row">
              <input
                ref={inputRef}
                type="text"
                placeholder="Ask me anything..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                className="ai-chat-input"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
                className="ai-chat-send"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
