'use client';

import { motion } from 'framer-motion';
import { Activity, Shield, Zap, Wifi } from 'lucide-react';
import { AgentStats } from '@/lib/types';

interface AgentStatusBarProps {
  isActive: boolean;
  stats: AgentStats;
  eventsProcessed: number;
}

export default function AgentStatusBar({ isActive, stats, eventsProcessed }: AgentStatusBarProps) {
  return (
    <div className="agent-status-bar px-6 py-3 flex items-center justify-between">
      {/* Left: Agent identity */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-accent-purple" />
          <span className="text-text-primary text-sm font-semibold tracking-wide">
            SETTLEGUARD
          </span>
          <span className="text-accent-purple text-sm font-bold" style={{ fontFamily: 'var(--font-mono)' }}>
            AUTOPILOT
          </span>
        </div>

        <div className="h-4 w-px bg-border mx-1" />

        {/* Status indicator */}
        <div className="flex items-center gap-2">
          {isActive ? (
            <>
              <div className="w-2 h-2 rounded-full bg-accent-purple pulse-dot" />
              <span className="text-accent-purple text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>
                Agent Active
              </span>
            </>
          ) : (
            <>
              <div className="w-2 h-2 rounded-full bg-text-muted" />
              <span className="text-text-muted text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>
                Standby
              </span>
            </>
          )}
        </div>
      </div>

      {/* Right: Live stats */}
      <div className="flex items-center gap-5">
        <StatPill icon={<Zap className="w-3 h-3" />} label="Claims Filed" value={stats.claimsFiled.toString()} />
        <StatPill icon={<Activity className="w-3 h-3" />} label="Win Rate" value={`${stats.winRate}%`} accent />
        <StatPill icon={<Wifi className="w-3 h-3" />} label="Active" value={stats.activeClaims.toString()} />
        
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-1.5 ml-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-accent-purple pulse-dot" />
            <span className="text-accent-purple text-[10px] font-mono font-bold uppercase tracking-wider">
              Live
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function StatPill({ icon, label, value, accent }: { icon: React.ReactNode; label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-text-muted">{icon}</span>
      <span className="text-text-muted text-[10px] uppercase tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>
        {label}
      </span>
      <span className={`text-xs font-bold ${accent ? 'text-accent-green' : 'text-text-primary'}`} style={{ fontFamily: 'var(--font-mono)' }}>
        {value}
      </span>
    </div>
  );
}
