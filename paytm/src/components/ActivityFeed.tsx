'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EnrichedClaim, ClaimStage, STAGE_ORDER, STAGE_LABELS } from '@/lib/types';
import { ChevronDown, ChevronUp, AlertTriangle, CheckCircle2, Clock, FileText, Search, ArrowRight } from 'lucide-react';
import { STAGE_PROGRESSION_DELAYS } from '@/lib/dashboard-data';

// ============================================================
// Activity Feed — Human-readable claim events with stage
// progression. Claims auto-advance through stages over time.
// ============================================================

interface ActivityFeedProps {
  claims: EnrichedClaim[];
}

// Stage icon mapping
function StageIcon({ stage }: { stage: ClaimStage }) {
  const icons: Record<ClaimStage, React.ReactNode> = {
    detected: <AlertTriangle className="w-3.5 h-3.5" />,
    filed: <FileText className="w-3.5 h-3.5" />,
    under_review: <Search className="w-3.5 h-3.5" />,
    approved: <CheckCircle2 className="w-3.5 h-3.5" />,
    recovered: <CheckCircle2 className="w-3.5 h-3.5" />,
  };
  return <>{icons[stage]}</>;
}

// Stage color mapping
function getStageColor(stage: ClaimStage): string {
  const colors: Record<ClaimStage, string> = {
    detected: 'var(--color-accent-amber)',
    filed: 'var(--color-accent-blue)',
    under_review: 'var(--color-accent-amber)',
    approved: 'var(--color-accent-green)',
    recovered: 'var(--color-accent-green)',
  };
  return colors[stage];
}

function getStageTagClass(stage: ClaimStage): string {
  const classes: Record<ClaimStage, string> = {
    detected: 'tag-amber',
    filed: 'tag-blue',
    under_review: 'tag-amber',
    approved: 'tag-green',
    recovered: 'tag-green',
  };
  return classes[stage];
}

// Human-readable, story-like message for a claim event
function getEventMessage(claim: EnrichedClaim): string {
  const amount = `₹${new Intl.NumberFormat('en-IN').format(claim.amount)}`;
  const messages: Record<ClaimStage, string> = {
    detected: `You were overcharged ${amount} by ${claim.platform}`,
    filed: `${amount} claim filed against ${claim.platform} — awaiting response`,
    under_review: `${claim.platform} is reviewing your ${amount} claim`,
    approved: `${amount} approved by ${claim.platform} — money incoming!`,
    recovered: `${amount} overcharged by ${claim.platform} → recovered automatically`,
  };
  return messages[claim.stage];
}

// Stage progression bar component
function StageProgressBar({ currentStage }: { currentStage: ClaimStage }) {
  const currentIdx = STAGE_ORDER.indexOf(currentStage);

  return (
    <div className="stage-progress-bar">
      {STAGE_ORDER.map((stage, idx) => {
        const isComplete = idx < currentIdx;
        const isCurrent = idx === currentIdx;

        return (
          <div key={stage} className="stage-step">
            {/* Connector line (before dot, skip for first) */}
            {idx > 0 && (
              <div
                className="stage-connector"
                style={{
                  background: isComplete || isCurrent
                    ? getStageColor(currentStage)
                    : 'var(--color-border)',
                }}
              />
            )}
            {/* Dot */}
            <div
              className={`stage-dot ${isCurrent ? 'active' : ''}`}
              style={{
                background: isComplete || isCurrent
                  ? getStageColor(currentStage)
                  : 'var(--color-border)',
                boxShadow: isCurrent ? `0 0 8px ${getStageColor(currentStage)}50` : 'none',
              }}
            />
            {/* Label */}
            <span className={`stage-label ${isCurrent ? 'current' : isComplete ? 'complete' : 'future'}`}>
              {STAGE_LABELS[stage]}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// Individual claim card in the activity feed
function ActivityClaimCard({ claim, onStageAdvance }: {
  claim: EnrichedClaim;
  onStageAdvance: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const isRecovered = claim.stage === 'recovered';
  const isDetected = claim.stage === 'detected';

  // Priority badge color
  const priorityColors: Record<string, { bg: string; text: string; label: string }> = {
    critical: { bg: 'rgba(255,59,92,0.1)', text: '#ff3b5c', label: 'CRITICAL' },
    high: { bg: 'rgba(255,184,0,0.1)', text: '#ffb800', label: 'HIGH' },
    medium: { bg: 'rgba(59,130,246,0.1)', text: '#3b82f6', label: 'MEDIUM' },
    low: { bg: 'rgba(139,92,246,0.1)', text: '#8B5CF6', label: 'LOW' },
  };

  const priority = priorityColors[claim.priorityRank];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className={`activity-card ${isRecovered ? 'recovered' : ''} ${isDetected ? 'new-detection' : ''}`}
    >
      {/* Main row */}
      <div className="flex items-start gap-3 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        {/* Platform icon */}
        <div
          className="activity-platform-badge"
          style={{
            background: `${claim.platformColor}12`,
            border: `1px solid ${claim.platformColor}30`,
            color: claim.platformColor,
          }}
        >
          {claim.platformIcon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium m-0 leading-snug ${isRecovered ? 'text-accent-green' : 'text-text-primary'}`}>
            {getEventMessage(claim)}
          </p>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <span className={`tag ${getStageTagClass(claim.stage)}`}>
              <StageIcon stage={claim.stage} />
              {STAGE_LABELS[claim.stage]}
            </span>
            <span className="tag" style={{ background: priority.bg, color: priority.text, border: `1px solid ${priority.text}30` }}>
              {priority.label}
            </span>
            {claim.deadlineDays && claim.deadlineDays <= 7 && (
              <span className="tag tag-red">
                <Clock className="w-3 h-3" />
                {claim.deadlineDays}d left
              </span>
            )}
          </div>
        </div>

        {/* Right side */}
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <span className={`text-sm font-bold ${isRecovered ? 'text-accent-green' : 'text-text-primary'}`} style={{ fontFamily: 'var(--font-mono)' }}>
            ₹{new Intl.NumberFormat('en-IN').format(claim.amount)}
          </span>
          <div className="flex items-center gap-1">
            <span className="text-text-muted text-[10px]" style={{ fontFamily: 'var(--font-mono)' }}>
              {claim.recoveryProbability}% likely
            </span>
          </div>
          {expanded ? <ChevronUp className="w-4 h-4 text-text-muted mt-1" /> : <ChevronDown className="w-4 h-4 text-text-muted mt-1" />}
        </div>
      </div>

      {/* Expanded section — AI explanation + stage bar */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="activity-expanded">
              {/* AI Explanation */}
              <div className="ai-explanation">
                <div className="ai-explanation-row">
                  <span className="ai-explanation-label">What happened</span>
                  <span className="ai-explanation-value">{claim.aiExplanation.whatWentWrong}</span>
                </div>
                <div className="ai-explanation-row">
                  <span className="ai-explanation-label">Why it&apos;s wrong</span>
                  <span className="ai-explanation-value">{claim.aiExplanation.whyItsWrong}</span>
                </div>
                <div className="ai-explanation-row">
                  <span className="ai-explanation-label">You lost</span>
                  <span className="ai-explanation-value text-accent-red font-semibold">
                    ₹{new Intl.NumberFormat('en-IN').format(claim.aiExplanation.howMuchLost)}
                  </span>
                </div>
              </div>

              {/* Stage progression */}
              <StageProgressBar currentStage={claim.stage} />

              {/* Recovery probability bar */}
              <div className="recovery-prob-bar">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-text-muted text-[10px] uppercase tracking-wider font-semibold" style={{ fontFamily: 'var(--font-mono)' }}>
                    Recovery Probability
                  </span>
                  <span className={`text-xs font-bold ${claim.recoveryProbability >= 80 ? 'text-accent-green' : claim.recoveryProbability >= 50 ? 'text-accent-amber' : 'text-accent-red'}`} style={{ fontFamily: 'var(--font-mono)' }}>
                    {claim.recoveryProbability}%
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-bg-elevated overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${claim.recoveryProbability}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{
                      background: claim.recoveryProbability >= 80
                        ? 'linear-gradient(90deg, #00ff87, #00cc6a)'
                        : claim.recoveryProbability >= 50
                          ? 'linear-gradient(90deg, #ffb800, #ffd166)'
                          : 'linear-gradient(90deg, #ff3b5c, #ff6b81)',
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ActivityFeed({ claims: initialClaims }: ActivityFeedProps) {
  const [claims, setClaims] = useState<EnrichedClaim[]>(initialClaims);
  const [filter, setFilter] = useState<ClaimStage | 'all'>('all');
  const timerRefs = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Auto-progression simulation: claims advance through stages
  const advanceClaim = useCallback((claimId: string) => {
    setClaims(prev => prev.map(c => {
      if (c.id !== claimId) return c;
      const currentIdx = STAGE_ORDER.indexOf(c.stage);
      if (currentIdx >= STAGE_ORDER.length - 1) return c;
      const nextStage = STAGE_ORDER[currentIdx + 1];
      return {
        ...c,
        stage: nextStage,
        recoveryProbability: nextStage === 'recovered' ? 100 : Math.min(c.recoveryProbability + 8, 99),
      };
    }));
  }, []);

  // Set up auto-progression timers for non-terminal claims
  useEffect(() => {
    timerRefs.current.forEach(clearTimeout);
    timerRefs.current = [];

    claims.forEach(claim => {
      const delay = STAGE_PROGRESSION_DELAYS[claim.stage];
      if (delay > 0) {
        const timer = setTimeout(() => advanceClaim(claim.id), delay);
        timerRefs.current.push(timer);
      }
    });

    return () => {
      timerRefs.current.forEach(clearTimeout);
      timerRefs.current = [];
    };
  }, [claims, advanceClaim]);

  const filteredClaims = filter === 'all' ? claims : claims.filter(c => c.stage === filter);

  // Sort: critical priority first, then by amount descending
  const sortedClaims = [...filteredClaims].sort((a, b) => {
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    const pDiff = priorityOrder[a.priorityRank] - priorityOrder[b.priorityRank];
    if (pDiff !== 0) return pDiff;
    return b.amount - a.amount;
  });

  // Stage filter counts
  const stageCounts = STAGE_ORDER.reduce((acc, stage) => {
    acc[stage] = claims.filter(c => c.stage === stage).length;
    return acc;
  }, {} as Record<ClaimStage, number>);

  return (
    <div className="activity-feed">
      {/* Header */}
      <div className="activity-feed-header">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent-purple pulse-dot" />
          <span className="text-text-primary text-sm font-bold">Activity Feed</span>
          <span className="text-text-muted text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
            {claims.length} claims
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="activity-filters">
        <button
          className={`activity-filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({claims.length})
        </button>
        {STAGE_ORDER.map(stage => (
          <button
            key={stage}
            className={`activity-filter-btn ${filter === stage ? 'active' : ''}`}
            onClick={() => setFilter(stage)}
          >
            {STAGE_LABELS[stage]} ({stageCounts[stage]})
          </button>
        ))}
      </div>

      {/* Claim cards */}
      <div className="activity-feed-list">
        <AnimatePresence mode="popLayout">
          {sortedClaims.map(claim => (
            <ActivityClaimCard
              key={claim.id}
              claim={claim}
              onStageAdvance={advanceClaim}
            />
          ))}
        </AnimatePresence>

        {sortedClaims.length === 0 && (
          <div className="text-center py-12 text-text-muted text-sm">
            No claims in this stage
          </div>
        )}
      </div>
    </div>
  );
}
