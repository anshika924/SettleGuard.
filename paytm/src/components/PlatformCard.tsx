'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2, ExternalLink, CheckCircle2 } from 'lucide-react';

// ============================================================
// PlatformCard — Compact, clean card for each platform
// ============================================================

export type PlatformStatus = 'idle' | 'connecting' | 'connected';

export interface PlatformInfo {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  transactionCount: string;
}

interface PlatformCardProps {
  platform: PlatformInfo;
  status: PlatformStatus;
  onConnect: (id: string) => void;
  analyzed?: boolean;
}

export default function PlatformCard({ platform, status, onConnect, analyzed }: PlatformCardProps) {
  return (
    <div
      className={`cp-card ${status === 'connected' ? 'cp-card--connected' : ''}`}
      style={{
        '--platform-color': platform.color,
        '--platform-color-12': `${platform.color}12`,
        '--platform-color-20': `${platform.color}20`,
        '--platform-color-30': `${platform.color}30`,
        '--platform-color-60': `${platform.color}60`,
      } as React.CSSProperties}
    >
      {/* Connected accent stripe */}
      {status === 'connected' && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.4 }}
          className="cp-card-stripe"
          style={{ background: `linear-gradient(90deg, transparent, ${platform.color}80, transparent)` }}
        />
      )}

      <div className="cp-card-row">
        {/* Platform icon */}
        <div className="cp-card-icon" style={{ background: `${platform.color}10`, borderColor: `${platform.color}20` }}>
          <span>{platform.icon}</span>
        </div>

        {/* Info */}
        <div className="cp-card-body">
          <div className="cp-card-top">
            <h4 className="cp-card-name">{platform.name}</h4>
            {analyzed && (
              <span className="cp-card-analyzed-tag">
                <CheckCircle2 className="w-3 h-3" />
                Analyzed
              </span>
            )}
          </div>
          <p className="cp-card-desc">{platform.description}</p>

          <div className="cp-card-footer">
            <span className="cp-card-meta">
              {platform.transactionCount} transactions
            </span>

            {/* Action */}
            {status === 'idle' && (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onConnect(platform.id)}
                className="cp-card-connect-btn"
                style={{
                  background: `${platform.color}10`,
                  borderColor: `${platform.color}25`,
                  color: platform.color,
                }}
              >
                <ExternalLink className="w-3 h-3" />
                Connect
              </motion.button>
            )}

            {status === 'connecting' && (
              <div className="cp-card-connecting">
                <Loader2 className="w-3.5 h-3.5 animate-spin" style={{ color: platform.color }} />
                <span style={{ color: platform.color }}>Connecting...</span>
                <div className="cp-card-progress-track">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2.5, ease: 'easeInOut' }}
                    className="cp-card-progress-fill"
                    style={{ background: `linear-gradient(90deg, ${platform.color}50, ${platform.color})` }}
                  />
                </div>
              </div>
            )}

            {status === 'connected' && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                className="cp-card-connected-tag"
              >
                <Check className="w-3 h-3" />
                Connected
              </motion.span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
