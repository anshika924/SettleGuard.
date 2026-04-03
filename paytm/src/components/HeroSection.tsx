'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Shield, ArrowUpRight } from 'lucide-react';
import { FinancialSummary } from '@/lib/types';

// ============================================================
// Hero Section — Clean, focused. "This AI is making me money."
// Big counter → tagline → 3 simple stats. No overload.
// ============================================================

interface HeroSectionProps {
  summary: FinancialSummary;
}

export default function HeroSection({ summary }: HeroSectionProps) {
  const [displayAmount, setDisplayAmount] = useState(0);
  const [showDaily, setShowDaily] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [merchantName, setMerchantName] = useState('');
  const animatedRef = useRef(false);

  useEffect(() => {
    // Also load merchant name from localStorage to personalize the hero
    setMerchantName(localStorage.getItem('merchantName') || '');
  }, []);

  // Animated counter on mount
  useEffect(() => {
    if (animatedRef.current) return;
    animatedRef.current = true;

    const target = summary.totalRecovered;
    const duration = 2200;
    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayAmount(Math.round(target * eased));
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => setShowDaily(true), 300);
        setTimeout(() => setShowStats(true), 800);
      }
    };
    requestAnimationFrame(tick);
  }, [summary.totalRecovered]);

  const formatted = new Intl.NumberFormat('en-IN').format(displayAmount);

  return (
    <div className="hero-section">
      <div className="hero-inner">
        {/* Shield badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex items-center gap-2 mb-4"
        >
          <div className="hero-icon-badge">
            <Shield className="w-4 h-4 text-accent-purple" />
          </div>
          <span className="text-accent-purple text-[11px] uppercase tracking-[0.2em] font-bold" style={{ fontFamily: 'var(--font-mono)' }}>
            {merchantName ? `${merchantName}'s ` : ''}AI Recovery Engine
          </span>
        </motion.div>

        {/* BIG number */}
        <div className="flex items-baseline gap-3 mb-1">
          <span className="text-text-muted text-3xl font-light" style={{ fontFamily: 'var(--font-mono)' }}>₹</span>
          <span className="counter-massive">{formatted}</span>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="hero-tagline"
        >
          Recovered automatically by AI
        </motion.p>

        {/* Daily gain + success rate */}
        <AnimatePresence>
          {showDaily && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="flex items-center gap-4 mt-3"
            >
              <span className="hero-daily-badge">
                <ArrowUpRight className="w-4 h-4" />
                +₹{new Intl.NumberFormat('en-IN').format(summary.recoveredToday)} recovered today
              </span>
              <span className="text-text-secondary text-xs flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-accent-green" />
                {summary.recoverySuccessRate}% success rate
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Simple stats row — clean, 4 items in a single row */}
        <AnimatePresence>
          {showStats && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="hero-stats-strip"
            >
              <div className="hero-strip-item">
                <span className="hero-strip-label">Lost This Month</span>
                <span className="hero-strip-value text-accent-red" style={{ fontFamily: 'var(--font-mono)' }}>
                  ₹{new Intl.NumberFormat('en-IN').format(summary.monthlyLoss)}
                </span>
              </div>
              <div className="hero-strip-divider" />
              <div className="hero-strip-item">
                <span className="hero-strip-label">At Risk</span>
                <span className="hero-strip-value text-accent-amber" style={{ fontFamily: 'var(--font-mono)' }}>
                  ₹{new Intl.NumberFormat('en-IN').format(summary.totalAtRisk)}
                </span>
              </div>
              <div className="hero-strip-divider" />
              <div className="hero-strip-item">
                <span className="hero-strip-label">Claims Won</span>
                <span className="hero-strip-value text-accent-green" style={{ fontFamily: 'var(--font-mono)' }}>
                  {summary.claimsWon}
                </span>
              </div>
              <div className="hero-strip-divider" />
              <div className="hero-strip-item">
                <span className="hero-strip-label">Active</span>
                <span className="hero-strip-value text-text-primary" style={{ fontFamily: 'var(--font-mono)' }}>
                  {summary.claimsActive}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
