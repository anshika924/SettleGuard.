'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { DETAILED_CLAIMS } from '@/lib/dashboard-data';
import { DetailedClaim, ClaimStage } from '@/lib/types';
import { CheckCircle2, Circle, AlertCircle, Clock, Zap, ArrowRight, Brain } from 'lucide-react';
import { useState, useEffect } from 'react';

const STAGE_ORDER: ClaimStage[] = ['detected', 'filed', 'review', 'approved', 'recovered'];

function StageIcon({ stage, currentStage }: { stage: ClaimStage; currentStage: ClaimStage }) {
  const stageIdx = STAGE_ORDER.indexOf(stage);
  const currentIdx = STAGE_ORDER.indexOf(currentStage);

  if (stageIdx < currentIdx) {
    return <CheckCircle2 className="w-4 h-4 text-accent-green" />;
  }
  if (stageIdx === currentIdx) {
    return (
      <div className="relative flex items-center justify-center">
        <Circle className="w-4 h-4 text-accent-amber" />
        <div className="absolute w-2 h-2 rounded-full bg-accent-amber animate-pulse"></div>
      </div>
    );
  }
  return <Circle className="w-4 h-4 text-border-bright" />;
}

export default function ActivityFeed() {
  const [claims, setClaims] = useState<DetailedClaim[]>(DETAILED_CLAIMS);

  // Simulate an auto follow-up update for demo purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      setClaims((prev) =>
        prev.map((c) => {
          if (c.id === 'AM-2026-0445' && c.status === 'detected') {
            return { ...c, status: 'filed' as ClaimStage };
          }
          if (c.id === 'FL-9982' && c.status === 'review') {
            return { ...c, status: 'approved' as ClaimStage };
          }
          return c;
        })
      );
    }, 4000); // 4 seconds into demo, they update automatically

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="glass-card flex flex-col h-full overflow-hidden col-span-2">
      <div className="px-6 py-5 border-b border-border bg-bg-secondary/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Zap className="w-5 h-5 text-accent-blue" />
          <h2 className="text-text-primary text-base font-bold m-0 tracking-wide">Live Recovery Updates</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-green"></span>
          </span>
          <span className="text-xs font-mono text-text-muted font-bold uppercase tracking-wider">Agent Active</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-3 p-4">
          <AnimatePresence>
            {claims.map((claim) => (
              <motion.div
                key={claim.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-bg-card-hover border border-border rounded-lg p-5 flex flex-col gap-4 relative"
              >
                {/* Header info */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold shadow-sm"
                      style={{ background: `${claim.platformColor}15`, color: claim.platformColor, border: `1px solid ${claim.platformColor}30` }}
                    >
                      {claim.platform.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-text-primary font-bold text-sm m-0">{claim.type}</h3>
                      <p className="text-text-muted text-xs font-mono m-0 mt-0.5">{claim.id} • {claim.platform}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-lg font-bold text-text-primary m-0">
                      ₹{new Intl.NumberFormat('en-IN').format(claim.amount)}
                    </p>
                    <p className="font-mono text-[10px] text-accent-green font-semibold uppercase tracking-widest mt-0.5 m-0">
                      {claim.recoveryProbability}% Probability
                    </p>
                  </div>
                </div>

                {/* AI Reasoning Block */}
                <div className="bg-bg-primary/50 border border-border-bright rounded-md p-3 relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-accent-blue/80 to-accent-blue/20"></div>
                  <div className="pl-2 space-y-2">
                    <div className="flex gap-2">
                      <AlertCircle className="w-3.5 h-3.5 text-accent-red shrink-0 mt-0.5" />
                      <p className="text-xs text-text-secondary m-0 leading-relaxed">
                        <span className="text-text-primary font-semibold">Issue: </span>{claim.reasoning.whatWentWrong}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Brain className="w-3.5 h-3.5 text-accent-blue shrink-0 mt-0.5" />
                      <p className="text-xs text-text-secondary m-0 leading-relaxed">
                        <span className="text-text-primary font-semibold">Logic: </span>{claim.reasoning.whyItsWrong}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Timeline status */}
                <div className="pt-2 flex items-center justify-between text-xs font-mono font-medium relative w-full px-2">
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-border-bright -z-10 translate-y-[-50%]"></div>
                  {STAGE_ORDER.map((stage) => {
                    const isPast = STAGE_ORDER.indexOf(stage) <= STAGE_ORDER.indexOf(claim.status);
                    return (
                      <div key={stage} className="flex flex-col items-center gap-1.5 bg-bg-card-hover">
                        <StageIcon stage={stage} currentStage={claim.status} />
                        <span className={`${isPast ? 'text-text-primary' : 'text-text-muted'} capitalize text-[10px]`}>
                          {stage}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
