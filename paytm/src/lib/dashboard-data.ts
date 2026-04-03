// ============================================================
// Enriched mock data for the product-level dashboard
// Realistic scenarios across Paytm merchant ecosystem and other platforms
// ============================================================

import {
  EnrichedClaim,
  InsightCard,
  AlertItem,
  FinancialSummary,
  ActivityEvent,
  ClaimStage,
} from './types';

// --- Financial Summary ---
export const FINANCIAL_SUMMARY: FinancialSummary = {
  totalRecovered: 481448,
  totalAtRisk: 32950,
  recoverySuccessRate: 78,
  claimsWon: 34,
  claimsLost: 5,
  claimsActive: 9,
  recoveredToday: 9130,
  monthlyLoss: 47200,
};

// --- Platform Connection data (kept for sidebar) ---
export interface PlatformConnection {
  id: string;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  status: 'connected' | 'syncing' | 'disconnected';
  lastSync: string;
  totalTransactions: number;
  issuesFound: number;
  amountRecovered: number;
}

export const PLATFORMS: PlatformConnection[] = [
  {
    id: 'amazon',
    name: 'Amazon Seller Central',
    icon: '📦',
    color: '#FF9900',
    bgColor: 'rgba(255,153,0,0.08)',
    status: 'connected',
    lastSync: '2 min ago',
    totalTransactions: 8432,
    issuesFound: 23,
    amountRecovered: 187400,
  },
  {
    id: 'flipkart',
    name: 'Flipkart Seller Hub',
    icon: '🛒',
    color: '#F7E532',
    bgColor: 'rgba(247,229,50,0.06)',
    status: 'connected',
    lastSync: '5 min ago',
    totalTransactions: 5621,
    issuesFound: 14,
    amountRecovered: 92300,
  },
  {
    id: 'razorpay',
    name: 'Paytm Payment Gateway',
    icon: '💳',
    color: '#528FF0',
    bgColor: 'rgba(82,143,240,0.08)',
    status: 'connected',
    lastSync: '1 min ago',
    totalTransactions: 12450,
    issuesFound: 8,
    amountRecovered: 45200,
  },
  {
    id: 'shiprocket',
    name: 'Shiprocket',
    icon: '🚚',
    color: '#8B5CF6',
    bgColor: 'rgba(139,92,246,0.08)',
    status: 'syncing',
    lastSync: 'Syncing...',
    totalTransactions: 3200,
    issuesFound: 6,
    amountRecovered: 28100,
  },
  {
    id: 'cashfree',
    name: 'Paytm Merchant Wallet',
    icon: '🏦',
    color: '#00D09C',
    bgColor: 'rgba(0,208,156,0.08)',
    status: 'connected',
    lastSync: '12 min ago',
    totalTransactions: 4100,
    issuesFound: 3,
    amountRecovered: 12800,
  },
];

// --- Enriched Claims with full lifecycle data ---
export const CLAIMS: EnrichedClaim[] = [
  {
    id: 'ST-2026-4821',
    platform: 'Amazon',
    platformColor: '#FF9900',
    platformIcon: '📦',
    type: 'Commission Overcharge',
    category: 'commission',
    amount: 2340,
    stage: 'filed',
    recoveryProbability: 81,
    priorityRank: 'high',
    aiExplanation: {
      whatWentWrong: 'SKU "Premium Silk Kurta" charged 17% commission under Apparel category',
      whyItsWrong: 'Product has embroidery + ethnic design patterns — should classify as Ethnic Wear (12%)',
      howMuchLost: 2340,
    },
    aiConfidence: 94,
    filedDate: '2026-03-28',
    deadlineDays: 12,
    description: '12 orders overcharged due to wrong category classification',
  },
  {
    id: 'ST-2026-4760',
    platform: 'Amazon',
    platformColor: '#FF9900',
    platformIcon: '📦',
    type: 'Commission Correction',
    category: 'commission',
    amount: 5240,
    stage: 'recovered',
    recoveryProbability: 100,
    priorityRank: 'medium',
    aiExplanation: {
      whatWentWrong: '14 SKUs charged under "Electronics Accessories" at 18%',
      whyItsWrong: 'Products are "Mobile Accessories" — correct rate is 9%. Fee schedule mismatch confirmed.',
      howMuchLost: 5240,
    },
    aiConfidence: 87,
    filedDate: '2026-03-16',
    resolvedDate: '2026-03-28',
    description: 'Systematic miscategorization across 14 SKUs, approved on first pass',
  },
  {
    id: 'FL-9982',
    platform: 'Flipkart',
    platformColor: '#F7E532',
    platformIcon: '🛒',
    type: 'Return Fraud',
    category: 'refund',
    amount: 3890,
    stage: 'recovered',
    recoveryProbability: 100,
    priorityRank: 'high',
    aiExplanation: {
      whatWentWrong: 'Customer returned wrong item (weight 380g vs original 1.2kg)',
      whyItsWrong: 'Weight mismatch is conclusive proof of fraudulent return. Flipkart initially rejected.',
      howMuchLost: 3890,
    },
    aiConfidence: 92,
    filedDate: '2026-03-06',
    resolvedDate: '2026-03-28',
    description: 'Persisted through 1 rejection + 1 escalation. Approved on Day 22.',
  },
  {
    id: 'CD-2026-0871',
    platform: 'Shiprocket',
    platformColor: '#8B5CF6',
    platformIcon: '🚚',
    type: 'Missing COD',
    category: 'cod',
    amount: 4100,
    stage: 'under_review',
    recoveryProbability: 95,
    priorityRank: 'critical',
    aiExplanation: {
      whatWentWrong: '2 delivered orders confirmed via POD but COD not remitted',
      whyItsWrong: 'Proof of delivery exists, weight matches, tracking confirmed — evidence conclusive',
      howMuchLost: 4100,
    },
    aiConfidence: 99,
    filedDate: '2026-03-28',
    deadlineDays: 5,
    description: 'COD collection confirmed but payment not forwarded to merchant',
  },
  {
    id: 'RZ-2026-1122',
    platform: 'Paytm PG',
    platformColor: '#528FF0',
    platformIcon: '💳',
    type: 'GST Overcharge',
    category: 'fee',
    amount: 1890,
    stage: 'under_review',
    recoveryProbability: 72,
    priorityRank: 'medium',
    aiExplanation: {
      whatWentWrong: 'GST on payment gateway fee charged at 18%',
      whyItsWrong: 'Merchant is registered under composition scheme — should be 1%',
      howMuchLost: 1890,
    },
    aiConfidence: 88,
    filedDate: '2026-03-20',
    deadlineDays: 8,
    description: 'GST registration confirms composition scheme. Support ticket created with Paytm PG.',
  },
  {
    id: 'CF-2026-0445',
    platform: 'Paytm Wallet',
    platformColor: '#00D09C',
    platformIcon: '🏦',
    type: 'Settlement Mismatch',
    category: 'settlement',
    amount: 3200,
    stage: 'filed',
    recoveryProbability: 68,
    priorityRank: 'high',
    aiExplanation: {
      whatWentWrong: '3 March orders not reflected in bank after T+2 window',
      whyItsWrong: 'Bank statement cross-referenced — transactions missing from settlement batch PT-2026-03-23',
      howMuchLost: 3200,
    },
    aiConfidence: 76,
    filedDate: '2026-03-25',
    deadlineDays: 15,
    description: 'Settlement reconciliation gap for 3 transactions via Paytm',
  },
  {
    id: 'FL-2026-1055',
    platform: 'Flipkart',
    platformColor: '#F7E532',
    platformIcon: '🛒',
    type: 'Weight Dispute',
    category: 'shipping',
    amount: 2780,
    stage: 'recovered',
    recoveryProbability: 100,
    priorityRank: 'medium',
    aiExplanation: {
      whatWentWrong: 'Shipping charged for 2.5kg but actual weight is 800g',
      whyItsWrong: 'Warehouse weight log + product listing both show 800g. Overcharged across 8 shipments.',
      howMuchLost: 2780,
    },
    aiConfidence: 96,
    filedDate: '2026-03-10',
    resolvedDate: '2026-03-24',
    description: 'Weight evidence conclusive. Recovered shipping overcharge.',
  },
  {
    id: 'AM-2026-0998',
    platform: 'Amazon',
    platformColor: '#FF9900',
    platformIcon: '📦',
    type: 'FBA Fee Error',
    category: 'fee',
    amount: 6100,
    stage: 'recovered',
    recoveryProbability: 100,
    priorityRank: 'high',
    aiExplanation: {
      whatWentWrong: 'FBA fee at "Standard" size tier for 22 SKUs',
      whyItsWrong: 'Products qualify for "Small & Light" program — verified dimensions match criteria',
      howMuchLost: 6100,
    },
    aiConfidence: 91,
    filedDate: '2026-03-01',
    resolvedDate: '2026-03-18',
    description: 'All 22 SKUs reclassified. SAFE-T claim approved in 17 days.',
  },
  {
    id: 'SR-2026-0334',
    platform: 'Shiprocket',
    platformColor: '#8B5CF6',
    platformIcon: '🚚',
    type: 'COD Short Payment',
    category: 'cod',
    amount: 8420,
    stage: 'detected',
    recoveryProbability: 88,
    priorityRank: 'critical',
    aiExplanation: {
      whatWentWrong: '5 COD orders remitted at ₹200-400 less than collected amount',
      whyItsWrong: 'Delivery receipts show full COD collected. Short payment detected in reconciliation.',
      howMuchLost: 8420,
    },
    aiConfidence: 91,
    filedDate: '2026-03-30',
    deadlineDays: 2,
    description: 'Newly detected — AI recommends filing immediately due to deadline.',
  },
  {
    id: 'RZ-2026-1340',
    platform: 'Paytm PG',
    platformColor: '#528FF0',
    platformIcon: '💳',
    type: 'Refund Processing Fee',
    category: 'fee',
    amount: 1200,
    stage: 'approved',
    recoveryProbability: 95,
    priorityRank: 'low',
    aiExplanation: {
      whatWentWrong: 'Refund processing fee charged on merchant-initiated full refunds',
      whyItsWrong: 'Contract states refund processing is included in base rate for full refunds',
      howMuchLost: 1200,
    },
    aiConfidence: 85,
    filedDate: '2026-03-22',
    description: 'Approved by Paytm Payment Gateway. Awaiting credit to merchant account.',
  },
  {
    id: 'AM-2026-1201',
    platform: 'Amazon',
    platformColor: '#FF9900',
    platformIcon: '📦',
    type: 'Inbound Shipment Damage',
    category: 'refund',
    amount: 4800,
    stage: 'filed',
    recoveryProbability: 74,
    priorityRank: 'high',
    aiExplanation: {
      whatWentWrong: '3 units marked damaged during FBA inbound receiving',
      whyItsWrong: 'Outbound packaging photos show intact units. Damage occurred at Amazon warehouse.',
      howMuchLost: 4800,
    },
    aiConfidence: 78,
    filedDate: '2026-03-27',
    deadlineDays: 18,
    description: 'Photo evidence submitted. SAFE-T claim in progress.',
  },
];

// --- Revenue Intelligence Insights (keep to 3 max) ---
export const INSIGHTS: InsightCard[] = [
  {
    id: 'ins-1',
    icon: '📦',
    title: 'Biggest Loss Source',
    value: 'Amazon',
    subtitle: '₹21,480 in overcharges this month',
    trend: 'up',
    trendValue: '3 new issues this week',
    color: 'red',
  },
  {
    id: 'ins-2',
    icon: '💸',
    title: 'Top Leakage Type',
    value: 'Commissions',
    subtitle: '₹18,200 lost to wrong category charges',
    trend: 'neutral',
    trendValue: 'Repeating pattern',
    color: 'amber',
  },
  {
    id: 'ins-3',
    icon: '📉',
    title: 'Monthly Trend',
    value: '₹47,200 lost',
    subtitle: 'But 18% less than last month — AI is working',
    trend: 'down',
    trendValue: '18% less leakage',
    color: 'green',
  },
];

// --- Risk & Alert Engine ---
export const ALERTS: AlertItem[] = [
  {
    id: 'alert-1',
    severity: 'critical',
    title: 'You\'ll lose ₹8,420 if not filed in 2 days',
    description: 'Shiprocket COD short payment — AI has evidence ready, needs to file before Apr 2.',
    amount: 8420,
    deadlineDays: 2,
  },
  {
    id: 'alert-2',
    severity: 'warning',
    title: 'Amazon fees spiked 23% this week',
    description: '4 new products miscategorized into higher fee brackets. Already flagged.',
    amount: 3540,
  },
  {
    id: 'alert-3',
    severity: 'info',
    title: '₹1,200 approved but not credited yet',
    description: 'Paytm PG approved your refund 3 days ago. Following up automatically.',
    amount: 1200,
  },
];

// --- AI Assistant pre-built responses ---
export const AI_RESPONSES: Record<string, string> = {
  'where am i losing money':
    'Your biggest losses are from **Amazon commission overcharges** (₹21,480 this month). The pattern is consistent — SKUs are being miscategorized into higher-fee brackets. I\'ve already filed 3 claims and detected 2 more. Your second largest loss source is **Shiprocket COD short payments** (₹12,520). Ensures every transaction processed through Paytm is accurately reconciled.',

  'what should i prioritize':
    '🚨 **Priority #1:** The Shiprocket COD short payment (₹8,420) has a deadline in **2 days**. I recommend filing immediately — I have 91% confidence and all evidence is ready.\n\n📋 **Priority #2:** The Paytm Wallet settlement mismatch (₹3,200) should be escalated — it\'s been pending for 7 days.\n\n✅ **Priority #3:** The Paytm PG refund credit (₹1,200) is approved but not credited yet. A follow-up nudge would help.',

  'how much have you recovered':
    'I\'ve recovered **₹4,81,448** total across all platforms. Today alone, I recovered **₹9,130**. Your recovery success rate is **78%** (34 of 44 claims won). The biggest single recovery was ₹6,100 from Amazon for FBA fee misclassification.',

  'show me my claims':
    'You have **9 active claims** right now:\n\n• 🔴 **2 Critical** — ₹12,520 total (Shiprocket COD issues)\n• 🟡 **3 High priority** — ₹10,340 total\n• 🟢 **4 Medium/Low** — ₹10,090 total\n\nThe most urgent is **SR-2026-0334** (₹8,420) with only 2 days until deadline.',

  'what is settleguard':
    'SettleGuard is your **AI-powered revenue recovery agent**, designed to integrate with Paytm\'s merchant dashboard. I continuously scan your transactions across Paytm Payment Gateway, Amazon, Flipkart, Shiprocket, and more to find:\n\n• Commission overcharges\n• Missing COD payments\n• Settlement mismatches\n• Shipping weight disputes\n• Incorrect fees\n\nWhen I find an issue, I automatically file claims and follow up until the money is recovered. Works alongside Paytm payment and settlement systems.',

  'default':
    'I\'m monitoring 5 platforms including Paytm Payment Gateway, and have recovered ₹4,81,448 so far. You have 9 active claims worth ₹32,950. Ask me about your losses, priorities, or claim status — I\'m here to help Paytm merchants recover every rupee!',
};

// Suggested questions for the AI assistant
export const AI_SUGGESTIONS = [
  'Where am I losing money?',
  'What should I prioritize?',
  'How much have you recovered?',
];

// --- Activity Feed Events (human-readable, auto-generated from claims) ---
export function generateActivityEvents(claims: EnrichedClaim[]): ActivityEvent[] {
  const events: ActivityEvent[] = [];
  const now = new Date();

  // Generate events from claim data
  claims.forEach((claim) => {
    // Base event for current stage
    const stageMessages: Record<ClaimStage, string> = {
      detected: `${claim.type} detected — ₹${new Intl.NumberFormat('en-IN').format(claim.amount)} at risk`,
      filed: `${claim.type} claim filed — ₹${new Intl.NumberFormat('en-IN').format(claim.amount)} pending`,
      under_review: `${claim.type} under review by ${claim.platform}`,
      approved: `${claim.type} approved — ₹${new Intl.NumberFormat('en-IN').format(claim.amount)} incoming`,
      recovered: `${claim.type} ₹${new Intl.NumberFormat('en-IN').format(claim.amount)} → recovered ✓`,
    };

    events.push({
      id: `act-${claim.id}`,
      claimId: claim.id,
      platform: claim.platform,
      platformColor: claim.platformColor,
      platformIcon: claim.platformIcon,
      message: stageMessages[claim.stage],
      stage: claim.stage,
      amount: claim.amount,
      timestamp: new Date(now.getTime() - Math.random() * 86400000 * 3), // Random time within 3 days
      isNew: claim.stage === 'detected',
    });
  });

  // Sort by timestamp, newest first
  return events.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

// Pre-generated activity events
export const ACTIVITY_EVENTS = generateActivityEvents(CLAIMS);

// --- Stage progression simulation delays (ms) ---
export const STAGE_PROGRESSION_DELAYS: Record<ClaimStage, number> = {
  detected: 8000,     // Auto-file after 8s
  filed: 15000,       // Move to review after 15s
  under_review: 25000, // Move to approved after 25s
  approved: 12000,    // Move to recovered after 12s
  recovered: 0,       // Terminal state
};
