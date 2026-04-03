'use client';

import { motion } from 'framer-motion';
import { INSIGHTS } from '@/lib/dashboard-data';
import { Insight } from '@/lib/types';
import { BarChart3, TriangleAlert, TrendingUp, TrendingDown } from 'lucide-react';

function InsightIcon({ type }: { type: Insight['type'] }) {
  switch (type) {
    case 'recovery':
      return <TrendingUp className="w-5 h-5 text-accent-green" />;
    case 'loss':
      return <TrendingDown className="w-5 h-5 text-accent-red" />;
    case 'alert':
      return <TriangleAlert className="w-5 h-5 text-accent-amber" />;
    case 'trend':
      return <BarChart3 className="w-5 h-5 text-accent-blue" />;
  }
}

function InsightCard({ insight, index }: { insight: Insight; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="bg-bg-card border border-border rounded-lg p-5 hover:border-border-bright transition-colors duration-300 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <InsightIcon type={insight.type} />
      </div>
      <div className="flex gap-4 relative z-10">
        <div className="shrink-0 mt-1">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center
            ${insight.type === 'recovery' ? 'bg-accent-green/10 text-accent-green border border-accent-green/20' : ''}
            ${insight.type === 'loss' ? 'bg-accent-red/10 text-accent-red border border-accent-red/20' : ''}
            ${insight.type === 'alert' ? 'bg-accent-amber/10 text-accent-amber border border-accent-amber/20' : ''}
            ${insight.type === 'trend' ? 'bg-accent-blue/10 text-accent-blue border border-accent-blue/20' : ''}
          `}>
            <InsightIcon type={insight.type} />
          </div>
        </div>
        <div>
          <h3 className="text-text-primary text-sm font-bold tracking-wide m-0 leading-tight">
            {insight.title}
          </h3>
          <p className="text-text-secondary text-xs mt-1.5 m-0 leading-relaxed font-mono">
            {insight.description}
          </p>
          {insight.impact && (
            <div className="mt-3">
              <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-bg-card-hover border border-border">
                Impact: ₹{new Intl.NumberFormat('en-IN').format(insight.impact)}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function InsightsPanel() {
  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-6 bg-accent-blue rounded-full"></div>
        <h2 className="text-text-primary text-lg font-bold m-0 tracking-wide font-mono uppercase">
          Revenue Intelligence
        </h2>
      </div>
      
      <div className="flex-1 space-y-4">
        {INSIGHTS.map((insight, idx) => (
          <InsightCard key={insight.id} insight={insight} index={idx} />
        ))}
      </div>
    </div>
  );
}
