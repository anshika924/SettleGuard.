'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, CheckCircle2, Search, FileSearch, AlertTriangle, TrendingUp, Sparkles } from 'lucide-react';

// ============================================================
// AnalysisSimulation — Clean, contained AI analysis flow
// ============================================================

interface AnalysisStep {
  id: string;
  label: string;
  icon: React.ReactNode;
  durationMs: number;
}

interface AnalysisResult {
  recoverable: number;
  claimsDetected: number;
  commissionMismatch: boolean;
  feeErrors: number;
}

interface AnalysisSimulationProps {
  platformName: string;
  platformIcon: string;
  platformColor: string;
  onComplete: (result: AnalysisResult) => void;
}

const STEPS: AnalysisStep[] = [
  { id: 'fetch', label: 'Fetching transactions...', icon: <Search className="w-3.5 h-3.5" />, durationMs: 1800 },
  { id: 'match', label: 'Matching fees & commissions...', icon: <FileSearch className="w-3.5 h-3.5" />, durationMs: 2200 },
  { id: 'anomaly', label: 'Detecting anomalies...', icon: <AlertTriangle className="w-3.5 h-3.5" />, durationMs: 2000 },
  { id: 'recover', label: 'Identifying recoverable losses...', icon: <TrendingUp className="w-3.5 h-3.5" />, durationMs: 1600 },
];

export default function AnalysisSimulation({ platformName, platformIcon, platformColor, onComplete }: AnalysisSimulationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [animatedAmount, setAnimatedAmount] = useState(0);
  const [thinking, setThinking] = useState(true);
  const started = useRef(false);

  useEffect(() => {
    let isActive = true;
    let timeoutId: NodeJS.Timeout;

    const runStep = (idx: number) => {
      if (!isActive) return;
      if (idx >= STEPS.length) {
        const r: AnalysisResult = {
          recoverable: 6100 + Math.floor(Math.random() * 2000),
          claimsDetected: 3,
          commissionMismatch: true,
          feeErrors: 2,
        };
        setResult(r);
        setIsComplete(true);
        setThinking(false);
        onComplete(r);
        return;
      }
      
      setCurrentStep(idx);
      timeoutId = setTimeout(() => {
        if (!isActive) return;
        setCompletedSteps(prev => [...prev, STEPS[idx].id]);
        runStep(idx + 1);
      }, STEPS[idx].durationMs);
    };

    runStep(0);

    return () => {
      isActive = false;
      clearTimeout(timeoutId);
    };
  }, [onComplete]);

  // Animate counter
  useEffect(() => {
    if (!result) return;
    const target = result.recoverable;
    const dur = 1400;
    const start = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - start) / dur, 1);
      setAnimatedAmount(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [result]);

  const totalMs = STEPS.reduce((s, st) => s + st.durationMs, 0);
  const doneMs = STEPS.filter(s => completedSteps.includes(s.id)).reduce((a, s) => a + s.durationMs, 0);
  const pct = isComplete ? 100 : Math.round((doneMs / totalMs) * 100);

  return (
    <div className="cp-analysis">
      {/* Header */}
      <div className="cp-analysis-head">
        <div className="cp-analysis-head-left">
          <div className="cp-analysis-head-icon" style={{ background: `${platformColor}10`, borderColor: `${platformColor}20` }}>
            <Brain className="w-4 h-4" style={{ color: platformColor }} />
          </div>
          <div>
            <p className="cp-analysis-head-title">Analyzing {platformName}</p>
            <p className="cp-analysis-head-sub">{platformIcon} Deep-scanning transaction history</p>
          </div>
        </div>
        {thinking && (
          <motion.span
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="cp-thinking-badge"
          >
            <Sparkles className="w-3 h-3" />
            AI Agent Thinking...
          </motion.span>
        )}
      </div>

      {/* Progress */}
      <div className="cp-progress-track">
        <motion.div
          className="cp-progress-bar"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4 }}
          style={{
            background: isComplete
              ? 'linear-gradient(90deg, #22c55e, #16a34a)'
              : `linear-gradient(90deg, ${platformColor}70, ${platformColor})`,
          }}
        />
      </div>

      {/* Steps */}
      <div className="cp-steps">
        {STEPS.map((step, i) => {
          const active = i === currentStep && !completedSteps.includes(step.id);
          const done = completedSteps.includes(step.id);
          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`cp-step ${active ? 'cp-step--active' : ''} ${done ? 'cp-step--done' : ''}`}
            >
              <div className={`cp-step-dot ${active ? 'cp-step-dot--active' : ''} ${done ? 'cp-step-dot--done' : ''}`}>
                {done ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent-green" />
                ) : active ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }} style={{ color: platformColor, display: 'flex' }}>
                    {step.icon}
                  </motion.div>
                ) : (
                  <span className="text-text-muted">{step.icon}</span>
                )}
              </div>
              <span className="cp-step-text" style={{ color: done ? '#22c55e' : active ? platformColor : undefined }}>
                {step.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Results */}
      <AnimatePresence>
        {isComplete && result && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="cp-results"
          >
            <div className="cp-results-line" />

            <div className="cp-results-head">
              <CheckCircle2 className="w-3.5 h-3.5 text-accent-green" />
              <span>Analysis Complete</span>
            </div>

            <div className="cp-results-grid">
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ delay: 0.4, type: 'spring' }} className="cp-result-item cp-result-item--big">
                <span className="cp-result-lbl">Recoverable</span>
                <span className="cp-result-val cp-result-val--green">₹{new Intl.NumberFormat('en-IN').format(animatedAmount)}</span>
              </motion.div>
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ delay: 0.55, type: 'spring' }} className="cp-result-item">
                <span className="cp-result-lbl">Claims Detected</span>
                <span className="cp-result-val">{result.claimsDetected}</span>
              </motion.div>
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ delay: 0.7, type: 'spring' }} className="cp-result-item">
                <span className="cp-result-lbl">Commission Mismatch</span>
                <span className="cp-result-val cp-result-val--amber">Found</span>
              </motion.div>
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ delay: 0.85, type: 'spring' }} className="cp-result-item">
                <span className="cp-result-lbl">Fee Errors</span>
                <span className="cp-result-val">{result.feeErrors}</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
