'use client';

// ============================================================
// DeadlineWall — Legacy component from MVP
// Kept for potential future use but updated to work with new types
// ============================================================

import { motion } from 'framer-motion';
import { Clock, Bot, AlertTriangle } from 'lucide-react';

interface DeadlineItem {
  id: string;
  title: string;
  amount: number;
  source: string;
  daysLeft: number;
  totalDays: number;
  status: string;
  agentAction: string;
}

interface DeadlineWallProps {
  items: DeadlineItem[];
}

const SOURCE_CONFIG: Record<string, { label: string; color: string; bgColor: string }> = {
  razorpay:  { label: 'Paytm PG',   color: '#528FF0',  bgColor: 'rgba(82,143,240,0.12)' },
  amazon:    { label: 'Amazon',    color: '#FF9900',  bgColor: 'rgba(255,153,0,0.12)' },
  flipkart:  { label: 'Flipkart',  color: '#F7E532',  bgColor: 'rgba(247,229,50,0.12)' },
  shiprocket:{ label: 'Shiprocket', color: '#8B5CF6', bgColor: 'rgba(139,92,246,0.12)' },
  cashfree:  { label: 'Paytm Wallet', color: '#00D09C', bgColor: 'rgba(0,208,156,0.12)' },
};

function getUrgencyLevel(daysLeft: number, totalDays: number): 'critical' | 'warning' | 'normal' {
  const ratio = daysLeft / totalDays;
  if (daysLeft <= 5 || ratio < 0.15) return 'critical';
  if (daysLeft <= 14 || ratio < 0.35) return 'warning';
  return 'normal';
}

function getProgressPercent(daysLeft: number, totalDays: number): number {
  return Math.round(((totalDays - daysLeft) / totalDays) * 100);
}

export default function DeadlineWall({ items }: DeadlineWallProps) {
  const sorted = [...items].sort((a, b) => a.daysLeft - b.daysLeft);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-5 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-accent-amber" />
          <span className="text-text-primary text-sm font-semibold" style={{ fontFamily: 'var(--font-mono)' }}>
            ACTIVE RECOVERIES
          </span>
        </div>
        <span className="text-accent-amber text-xs font-bold" style={{ fontFamily: 'var(--font-mono)' }}>
          ₹{new Intl.NumberFormat('en-IN').format(items.reduce((s, i) => s + i.amount, 0))}
        </span>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {sorted.map((item, idx) => {
          const urgency = getUrgencyLevel(item.daysLeft, item.totalDays);
          const progress = getProgressPercent(item.daysLeft, item.totalDays);
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className={`deadline-card ${urgency === 'critical' ? 'urgent' : 'active'}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="tag" style={{ background: SOURCE_CONFIG[item.source]?.bgColor, color: SOURCE_CONFIG[item.source]?.color, border: `1px solid ${SOURCE_CONFIG[item.source]?.color}33` }}>
                  {SOURCE_CONFIG[item.source]?.label}
                </span>
                <span className="text-text-primary text-sm font-bold" style={{ fontFamily: 'var(--font-mono)' }}>
                  ₹{new Intl.NumberFormat('en-IN').format(item.amount)}
                </span>
              </div>
              <p className="text-text-secondary text-xs leading-relaxed mb-2 line-clamp-2">{item.title}</p>
              <div className="w-full h-1 rounded-full bg-bg-elevated mb-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, delay: idx * 0.1 }}
                  className="h-full rounded-full"
                  style={{
                    background: urgency === 'critical' ? 'linear-gradient(90deg, #ff3b5c, #ff6b81)' : urgency === 'warning' ? 'linear-gradient(90deg, #ffb800, #ffd166)' : 'linear-gradient(90deg, #00ff87, #00cc6a)',
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {urgency === 'critical' && <AlertTriangle className="w-3 h-3 text-accent-red" />}
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${urgency === 'critical' ? 'text-accent-red' : urgency === 'warning' ? 'text-accent-amber' : 'text-text-muted'}`} style={{ fontFamily: 'var(--font-mono)' }}>
                    {item.daysLeft}d left
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Bot className="w-3 h-3 text-accent-green" />
                  <span className="text-accent-green text-[10px] font-semibold" style={{ fontFamily: 'var(--font-mono)' }}>
                    {item.status === 'escalated' ? 'ESCALATED' : item.status === 'approved' ? 'WON' : 'FILED'}
                  </span>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-border">
                <div className="flex items-start gap-1.5">
                  <Bot className="w-3 h-3 text-text-muted flex-shrink-0 mt-0.5" />
                  <span className="text-text-muted text-[10px] leading-relaxed">{item.agentAction}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
