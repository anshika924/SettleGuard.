'use client';

import { useState, useEffect, useRef } from 'react';
import LiveFeed from '@/components/LiveFeed';
import { LIVE_EVENTS, EVENT_SCHEDULE, INITIAL_STATS } from '@/lib/data';
import { RecoveryEvent } from '@/lib/types';
import { Shield, Activity, Clock, TrendingUp, CheckCircle2 } from 'lucide-react';

// ============================================================
// Live Agent Page — Watch the AI agent work in real-time
// Events unfold on a schedule to tell a compelling story
// ============================================================

export default function AgentPage() {
  const [visibleEvents, setVisibleEvents] = useState<RecoveryEvent[]>([]);
  const [stats, setStats] = useState(INITIAL_STATS);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Schedule events to appear one by one
  useEffect(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    LIVE_EVENTS.forEach((event, idx) => {
      const timer = setTimeout(() => {
        setVisibleEvents(prev => [...prev, { ...event, timestamp: new Date() }]);

        // Update stats when recovery happens
        if (event.status === 'recovered' && event.recoveryAmount) {
          setStats(prev => ({
            ...prev,
            totalRecovered: prev.totalRecovered + event.recoveryAmount!,
          }));
        }
        if (event.status === 'acting') {
          setStats(prev => ({
            ...prev,
            claimsFiled: prev.claimsFiled + 1,
            activeClaims: prev.activeClaims + 1,
          }));
        }
      }, EVENT_SCHEDULE[idx]);

      timersRef.current.push(timer);
    });

    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  const recoveredCount = visibleEvents.filter(e => e.status === 'recovered').length;
  const claimsFiled = visibleEvents.filter(e => e.status === 'acting').length;

  return (
    <div className="agent-page">
      {/* Page header */}
      <div className="agent-page-header">
        <div className="flex items-center gap-3">
          <div className="agent-page-icon">
            <Shield className="w-5 h-5 text-accent-purple" />
          </div>
          <div>
            <h1 className="text-text-primary text-lg font-bold m-0">Live Agent</h1>
            <p className="text-text-secondary text-xs m-0 mt-0.5">Watch your AI agent scan, detect, and recover revenue across Paytm and connected platforms</p>
          </div>
        </div>
        <div className="agent-live-badge">
          <div className="w-2 h-2 rounded-full bg-accent-green pulse-dot" />
          <span>LIVE</span>
        </div>
      </div>

      {/* Quick stats row */}
      <div className="agent-stats-row">
        <div className="agent-stat-pill">
          <Activity className="w-3.5 h-3.5 text-accent-purple" />
          <span className="agent-stat-label">Events</span>
          <span className="agent-stat-value">{visibleEvents.length}</span>
        </div>
        <div className="agent-stat-pill">
          <Clock className="w-3.5 h-3.5 text-accent-blue" />
          <span className="agent-stat-label">Claims Filed</span>
          <span className="agent-stat-value">{claimsFiled}</span>
        </div>
        <div className="agent-stat-pill">
          <CheckCircle2 className="w-3.5 h-3.5 text-accent-green" />
          <span className="agent-stat-label">Recovered</span>
          <span className="agent-stat-value">{recoveredCount}</span>
        </div>
        <div className="agent-stat-pill">
          <TrendingUp className="w-3.5 h-3.5 text-accent-green" />
          <span className="agent-stat-label">Total</span>
          <span className="agent-stat-value text-accent-green" style={{ fontFamily: 'var(--font-mono)' }}>
            ₹{new Intl.NumberFormat('en-IN').format(stats.totalRecovered)}
          </span>
        </div>
      </div>

      {/* Live Feed — the main content */}
      <div className="agent-feed-container">
        <LiveFeed events={visibleEvents} />
      </div>
    </div>
  );
}
