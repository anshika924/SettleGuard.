'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Sparkles, AlertTriangle } from 'lucide-react';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  options?: string[];
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'msg-1',
    sender: 'ai',
    text: 'Hello. I am SettleGuard AI. I am currently monitoring 5 platforms. You have pending claims at risk.',
    options: ['Where am I losing money?', 'What should I prioritize?']
  }
];

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Mock AI response
    setTimeout(() => {
      let aiResponseText = 'I am analyzing your settlement data now...';
      
      if (text.toLowerCase().includes('losing money')) {
        aiResponseText = 'Your highest leakage category is currently Flipkart Return Fraud (Weight Disputes), totaling ₹3,890 this week. Amazon FBA Storage overcharges are catching up at ₹8,200 but they are freshly detected.';
      } else if (text.toLowerCase().includes('prioritize')) {
        aiResponseText = 'I highly recommend reviewing the Missing COD claim for Shiprocket (₹4,100). The deadline is in 2 days. I can file this for you now if you approve.';
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiResponseText,
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[500px] glass-card rounded-lg border border-border overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-bg-secondary/50 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-accent-blue" />
          <h2 className="text-text-primary text-sm font-bold tracking-wide m-0">SettleGuard Copilot</h2>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-accent-green/10 border border-accent-green/20">
          <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse"></div>
          <span className="text-[10px] font-mono font-bold text-accent-green uppercase">Online</span>
        </div>
      </div>

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center
                ${msg.sender === 'user' ? 'bg-bg-card-hover border border-border' : 'bg-accent-blue/10 border border-accent-blue/30'}
              `}>
                {msg.sender === 'user' ? (
                  <User className="w-4 h-4 text-text-muted" />
                ) : (
                  <Sparkles className="w-4 h-4 text-accent-blue" />
                )}
              </div>
              
              <div className="flex flex-col gap-2">
                <div className={`p-3 rounded-lg text-sm leading-relaxed
                  ${msg.sender === 'user' ? 'bg-bg-elevated border border-border text-text-primary' : 'bg-transparent border border-accent-blue/20 text-text-primary shadow-[0_0_15px_rgba(59,130,246,0.05)]'}
                `}>
                  {msg.text}
                </div>
                
                {msg.options && msg.sender === 'ai' && (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {msg.options.map(opt => (
                      <button
                        key={opt}
                        onClick={() => handleSend(opt)}
                        className="text-xs bg-bg-card-hover border border-border hover:border-accent-blue hover:text-accent-blue transition-colors px-3 py-1.5 rounded-full text-text-secondary text-left"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          {isTyping && (
             <motion.div
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="flex gap-3 max-w-[85%]"
           >
             <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center bg-accent-blue/10 border border-accent-blue/30">
                 <Sparkles className="w-4 h-4 text-accent-blue" />
             </div>
             <div className="p-3 rounded-lg bg-transparent border border-accent-blue/20 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-bounce" style={{ animationDelay: '0.4s' }}></span>
             </div>
           </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="p-3 border-t border-border bg-bg-secondary/50">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about revenue leakage..."
            className="flex-1 bg-bg-card border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent-blue/50 transition-colors"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isTyping}
            className="p-2 bg-accent-blue hover:bg-accent-blue-dim disabled:opacity-50 text-white rounded-lg transition-colors flex items-center justify-center shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
