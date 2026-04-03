'use client';

import { motion } from 'framer-motion';
import { DASHBOARD_STATS } from '@/lib/dashboard-data';
import { TrendingUp, Activity, Shield, ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function HeroStats() {
  const [dailyRecovered, setDailyRecovered] = useState(0);

  // Simple animation for the '+X today' value
  useEffect(() => {
    const timer = setTimeout(() => {
      let current = 0;
      const target = 14240;
      const step = target / 30;
      const interval = setInterval(() => {
        current += step;
        if (current >= target) {
          setDailyRecovered(target);
          clearInterval(interval);
        } else {
          setDailyRecovered(Math.floor(current));
        }
      }, 50);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Main Hero Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="col-span-1 md:col-span-2 glass-card-glow p-8 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-green-glow rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10 flex flex-col justify-between h-full">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-accent-green" />
            <h2 className="text-text-muted font-mono uppercase tracking-widest text-sm font-semibold m-0">
              Total Revenue Recovered
            </h2>
          </div>
          
          <div className="flex items-baseline gap-4 mt-auto">
            <h1 className="counter-massive m-0">
              ₹{new Intl.NumberFormat('en-IN').format(DASHBOARD_STATS.totalRecovered)}
            </h1>
            <div className="flex items-center gap-1 text-accent-green bg-accent-green/10 px-3 py-1.5 rounded-full border border-accent-green/20">
              <TrendingUp className="w-4 h-4" />
              <span className="font-mono text-sm font-bold">+₹{new Intl.NumberFormat('en-IN').format(dailyRecovered)} today</span>
            </div>
          </div>
          <p className="text-text-secondary mt-4 text-sm max-w-md">
            SettleGuard AI is actively scanning {DASHBOARD_STATS.transactionsScanned.toLocaleString('en-IN')} transactions across {DASHBOARD_STATS.platformsConnected} platforms.
          </p>
        </div>
      </motion.div>

      {/* Secondary Stats */}
      <div className="col-span-1 flex flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card p-6 flex-1 flex flex-col justify-center relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-text-muted text-xs font-mono uppercase font-bold m-0">Active Risk Pipeline</p>
            <Activity className="w-4 h-4 text-accent-amber" />
          </div>
          <p className="text-3xl font-bold font-mono text-text-primary m-0">
            ₹{new Intl.NumberFormat('en-IN').format(DASHBOARD_STATS.moneyAtRisk)}
          </p>
          <p className="text-text-secondary text-xs mt-2 m-0">Identified in {DASHBOARD_STATS.activeClaims} pending claims</p>
          <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-accent-amber to-accent-red w-full opacity-50" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card p-6 flex-1 flex flex-col justify-center relative"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-text-muted text-xs font-mono uppercase font-bold m-0">AI Win Rate</p>
            <ArrowUpRight className="w-4 h-4 text-accent-green" />
          </div>
          <p className="text-3xl font-bold font-mono text-text-primary m-0">
            {DASHBOARD_STATS.winRate}%
          </p>
          <p className="text-accent-green text-xs mt-2 m-0 font-medium">Top quartile accuracy</p>
        </motion.div>
      </div>
    </div>
  );
}
