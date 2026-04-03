'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plug, ArrowLeft } from 'lucide-react';
import PlatformCard, { PlatformInfo, PlatformStatus } from './PlatformCard';
import AnalysisSimulation from './AnalysisSimulation';

// ============================================================
// ConnectPlatformsModal — Polished slide-over panel
// ============================================================

const CONNECT_PLATFORMS: PlatformInfo[] = [
  {
    id: 'amazon',
    name: 'Amazon Seller Central',
    description: 'Scan for commission overcharges, FBA fee errors, and return fraud.',
    icon: '📦',
    color: '#FF9900',
    transactionCount: '8,400+',
  },
  {
    id: 'flipkart',
    name: 'Flipkart Seller Hub',
    description: 'Detect weight disputes, wrong category charges, and shipping overcharges.',
    icon: '🛒',
    color: '#F7E532',
    transactionCount: '5,600+',
  },
  {
    id: 'paytm',
    name: 'Paytm Business',
    description: 'Monitor payment gateway fees, settlement mismatches, and GST overcharges.',
    icon: '💳',
    color: '#00BAF2',
    transactionCount: '12,400+',
  },
  {
    id: 'shiprocket',
    name: 'Shiprocket',
    description: 'Track COD remittances, shipping weight disputes, and delivery gaps.',
    icon: '🚚',
    color: '#8B5CF6',
    transactionCount: '3,200+',
  },
];

type ModalView = 'platforms' | 'analyzing';

interface ConnectPlatformsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConnectPlatformsModal({ isOpen, onClose }: ConnectPlatformsModalProps) {
  const [platformStatuses, setPlatformStatuses] = useState<Record<string, PlatformStatus>>({});
  const [view, setView] = useState<ModalView>('platforms');
  const [analyzingPlatform, setAnalyzingPlatform] = useState<PlatformInfo | null>(null);
  const [analysisResults, setAnalysisResults] = useState<Record<string, boolean>>({});

  const connectedCount = Object.values(platformStatuses).filter(s => s === 'connected').length;

  const handleConnect = useCallback((platformId: string) => {
    const platform = CONNECT_PLATFORMS.find(p => p.id === platformId);
    if (!platform) return;

    setPlatformStatuses(prev => ({ ...prev, [platformId]: 'connecting' }));

    setTimeout(() => {
      setPlatformStatuses(prev => ({ ...prev, [platformId]: 'connected' }));
      setTimeout(() => {
        setAnalyzingPlatform(platform);
        setView('analyzing');
      }, 500);
    }, 2500);
  }, []);

  const handleClose = useCallback(() => {
    onClose();
    setTimeout(() => {
      setView('platforms');
      setAnalyzingPlatform(null);
    }, 300);
  }, [onClose]);

  const handleAnalysisComplete = useCallback(() => {
    if (analyzingPlatform) {
      setAnalysisResults(prev => ({ ...prev, [analyzingPlatform.id]: true }));
      
      // Automatically return to dashboard after showing results for 3.5 seconds
      setTimeout(() => {
        handleClose();
      }, 3500);
    }
  }, [analyzingPlatform, handleClose]);

  const handleBackToPlatforms = useCallback(() => {
    setView('platforms');
    setAnalyzingPlatform(null);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="cp-backdrop"
            onClick={handleClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%', opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0.5 }}
            transition={{ type: 'spring', damping: 32, stiffness: 320 }}
            className="cp-panel"
          >
            {/* Accent line top */}
            <div className="cp-panel-accent" />

            {/* Header */}
            <div className="cp-panel-header">
              <div className="cp-header-left">
                {view === 'analyzing' && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={handleBackToPlatforms}
                    className="cp-back-btn"
                    title="Back to platforms"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </motion.button>
                )}
                <div className="cp-header-icon">
                  <Plug className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h2 className="cp-header-title">
                    {view === 'platforms' ? 'Connect Platforms' : 'AI Analysis'}
                  </h2>
                  <p className="cp-header-sub">
                    {view === 'platforms'
                      ? `${connectedCount}/${CONNECT_PLATFORMS.length} connected`
                      : analyzingPlatform?.name}
                  </p>
                </div>
              </div>
              <button onClick={handleClose} className="cp-close-btn" title="Close">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Body */}
            <div className="cp-panel-body">
              <AnimatePresence mode="wait">
                {view === 'platforms' ? (
                  <motion.div
                    key="platforms-view"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="cp-platforms-list"
                  >
                    {/* Connected banner */}
                    {connectedCount > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="cp-connected-banner"
                      >
                        <div className="cp-banner-dot" />
                        {connectedCount} platform{connectedCount > 1 ? 's' : ''} connected
                        {Object.keys(analysisResults).length > 0 && ' · Losses found'}
                      </motion.div>
                    )}

                    {CONNECT_PLATFORMS.map((platform, i) => (
                      <motion.div
                        key={platform.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 }}
                      >
                        <PlatformCard
                          platform={platform}
                          status={platformStatuses[platform.id] || 'idle'}
                          onConnect={handleConnect}
                          analyzed={!!analysisResults[platform.id]}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  analyzingPlatform && (
                    <motion.div
                      key="analysis-view"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <AnalysisSimulation
                        platformName={analyzingPlatform.name}
                        platformIcon={analyzingPlatform.icon}
                        platformColor={analyzingPlatform.color}
                        onComplete={handleAnalysisComplete}
                      />

                      {analysisResults[analyzingPlatform.id] && (
                        <motion.button
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.2 }}
                          onClick={handleClose}
                          className="cp-cta-btn"
                        >
                          Return to Dashboard
                        </motion.button>
                      )}
                    </motion.div>
                  )
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
