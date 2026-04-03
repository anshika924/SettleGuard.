'use client';

import { motion } from 'framer-motion';
import { InsightCard, AlertItem } from '@/lib/types';
import { TrendingUp, TrendingDown, Minus, AlertTriangle, AlertOctagon, Info } from 'lucide-react';

// ============================================================
// Insights Panel — Revenue intelligence + risk alerts
// Keep it to 3-4 key insights only. No information overload.
// ============================================================

interface InsightsPanelProps {
  insights: InsightCard[];
  alerts: AlertItem[];
}

function InsightCardComponent({ insight, delay }: { insight: InsightCard; delay: number }) {
  const trendIcon = insight.trend === 'up'
    ? <TrendingUp className="w-3 h-3" />
    : insight.trend === 'down'
      ? <TrendingDown className="w-3 h-3" />
      : <Minus className="w-3 h-3" />;

  const colorMap = {
    green: { border: 'rgba(0,255,135,0.15)', bg: 'rgba(0,255,135,0.03)', accent: '#00ff87' },
    amber: { border: 'rgba(255,184,0,0.15)', bg: 'rgba(255,184,0,0.03)', accent: '#ffb800' },
    red: { border: 'rgba(255,59,92,0.15)', bg: 'rgba(255,59,92,0.03)', accent: '#ff3b5c' },
    blue: { border: 'rgba(59,130,246,0.15)', bg: 'rgba(59,130,246,0.03)', accent: '#3b82f6' },
  };

  const colors = colorMap[insight.color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="insight-card"
      style={{
        borderColor: colors.border,
        background: colors.bg,
      }}
    >
      <div className="flex items-start gap-3">
        <span className="text-lg">{insight.icon}</span>
        <div className="flex-1 min-w-0">
          <p className="text-text-muted text-[10px] uppercase tracking-wider font-semibold m-0 mb-1" style={{ fontFamily: 'var(--font-mono)' }}>
            {insight.title}
          </p>
          <p className="text-text-primary text-lg font-bold m-0 mb-0.5" style={{ fontFamily: 'var(--font-mono)' }}>
            {insight.value}
          </p>
          <p className="text-text-secondary text-xs m-0 mb-1.5 leading-relaxed">
            {insight.subtitle}
          </p>
          {insight.trendValue && (
            <div className="flex items-center gap-1.5">
              <span className={`${insight.trend === 'up' && insight.color === 'green' ? 'text-accent-green' : insight.trend === 'down' ? 'text-accent-green' : 'text-text-muted'}`}>
                {trendIcon}
              </span>
              <span className="text-text-muted text-[10px]" style={{ fontFamily: 'var(--font-mono)' }}>
                {insight.trendValue}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function AlertCard({ alert, delay }: { alert: AlertItem; delay: number }) {
  const severityConfig = {
    critical: {
      icon: <AlertOctagon className="w-4 h-4" />,
      border: 'rgba(255,59,92,0.3)',
      bg: 'rgba(255,59,92,0.05)',
      color: '#ff3b5c',
      pulse: true,
    },
    warning: {
      icon: <AlertTriangle className="w-4 h-4" />,
      border: 'rgba(255,184,0,0.25)',
      bg: 'rgba(255,184,0,0.04)',
      color: '#ffb800',
      pulse: false,
    },
    info: {
      icon: <Info className="w-4 h-4" />,
      border: 'rgba(59,130,246,0.2)',
      bg: 'rgba(59,130,246,0.04)',
      color: '#3b82f6',
      pulse: false,
    },
  };

  const config = severityConfig[alert.severity];

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
      className={`alert-card ${config.pulse ? 'alert-pulse' : ''}`}
      style={{
        borderColor: config.border,
        background: config.bg,
      }}
    >
      <div className="flex items-start gap-2.5">
        <span style={{ color: config.color }} className="mt-0.5 flex-shrink-0">
          {config.icon}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-text-primary text-xs font-semibold m-0 mb-0.5 leading-snug">
            {alert.title}
          </p>
          <p className="text-text-muted text-[11px] m-0 leading-relaxed">
            {alert.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function InsightsPanel({ insights, alerts }: InsightsPanelProps) {
  return (
    <div className="insights-panel">
      {/* Revenue Intelligence */}
      <div className="mb-5">
        <h3 className="insights-section-title">
          <span className="text-lg">💡</span>
          Key Insights
        </h3>
        <div className="space-y-3">
          {insights.map((insight, idx) => (
            <InsightCardComponent key={insight.id} insight={insight} delay={0.1 + idx * 0.08} />
          ))}
        </div>
      </div>

      {/* Risk Alerts */}
      <div>
        <h3 className="insights-section-title">
          <span className="text-lg">🚨</span>
          Risk Alerts
        </h3>
        <div className="space-y-2.5">
          {alerts.map((alert, idx) => (
            <AlertCard key={alert.id} alert={alert} delay={0.3 + idx * 0.08} />
          ))}
        </div>
      </div>
    </div>
  );
}
