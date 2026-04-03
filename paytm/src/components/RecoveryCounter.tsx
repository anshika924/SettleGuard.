'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RecoveryCounterProps {
  baseAmount: number;
  deltas: number[];
}

export default function RecoveryCounter({ baseAmount, deltas }: RecoveryCounterProps) {
  const [displayAmount, setDisplayAmount] = useState(baseAmount);
  const [lastDelta, setLastDelta] = useState<number | null>(null);
  const [showDelta, setShowDelta] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const prevTotal = useRef(baseAmount);

  useEffect(() => {
    const total = baseAmount + deltas.reduce((s, d) => s + d, 0);
    if (total !== prevTotal.current) {
      const diff = total - prevTotal.current;
      setLastDelta(diff);
      setShowDelta(true);
      setIsFlashing(true);

      const start = prevTotal.current;
      const end = total;
      const duration = 1500;
      const startTime = Date.now();

      const tick = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplayAmount(Math.round(start + (end - start) * eased));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      prevTotal.current = total;

      setTimeout(() => setShowDelta(false), 4000);
      setTimeout(() => setIsFlashing(false), 1000);
    }
  }, [baseAmount, deltas]);

  const formatted = new Intl.NumberFormat('en-IN').format(displayAmount);

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Label above */}
      <p className="text-text-muted text-[10px] mb-2 uppercase tracking-[0.25em] font-semibold" style={{ fontFamily: 'var(--font-mono)' }}>
        Money Recovered by AI Agent
      </p>
      
      {/* Main counter */}
      <div className="flex items-baseline gap-1">
        <span className="text-text-muted text-xl font-light" style={{ fontFamily: 'var(--font-mono)' }}>₹</span>
        <span className={`counter-massive ${isFlashing ? 'animate-ticker-flash' : ''}`}>
          {formatted}
        </span>
      </div>

      {/* Delta indicator */}
      <AnimatePresence>
        {showDelta && lastDelta !== null && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.7 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="mt-3 flex items-center gap-2"
          >
            <span className="text-accent-green text-base font-black" style={{ fontFamily: 'var(--font-mono)' }}>
              ↑ +₹{new Intl.NumberFormat('en-IN').format(lastDelta)}
            </span>
            <span className="tag tag-green text-[10px]">
              JUST RECOVERED
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
