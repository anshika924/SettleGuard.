import { DetailedClaim, Insight } from './types';

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

export interface DashboardStats {
  totalRecovered: number;
  totalRecoveredChange: number;
  activeClaims: number;
  activeClaimsChange: number;
  winRate: number;
  winRateChange: number;
  moneyAtRisk: number;
  moneyAtRiskChange: number;
  transactionsScanned: number;
  platformsConnected: number;
}

export interface RecoveryTimelineItem {
  id: string;
  date: string;
  amount: number;
  platform: string;
  platformColor: string;
  type: string;
}

export const DASHBOARD_STATS: DashboardStats = {
  totalRecovered: 481448,
  totalRecoveredChange: 12.4,
  activeClaims: 12,
  activeClaimsChange: -2,
  winRate: 73,
  winRateChange: 3.2,
  moneyAtRisk: 18750,
  moneyAtRiskChange: -8.5,
  transactionsScanned: 24892,
  platformsConnected: 5,
};

export const DETAILED_CLAIMS: DetailedClaim[] = [
  {
    id: 'ST-2026-4821',
    platform: 'Amazon',
    platformColor: '#FF9900',
    type: 'Commission Overcharge',
    amount: 5240,
    status: 'recovered',
    filedDate: '2026-03-25',
    resolvedDate: '2026-03-28',
    description: '14 SKUs miscategorized under "Electronics Accessories" (18%) instead of "Mobile Accessories" (9%)',
    aiConfidence: 94,
    recoveryProbability: 98,
    priority: 'high',
    reasoning: {
      whatWentWrong: 'Amazon applied the 18% generic electronics rate instead of the specific 9% mobile accessory tier.',
      whyItsWrong: 'Products have "Mobile" in title and category backend tags clearly map to the 9% fee schedule.',
      howMuchLost: 5240,
    }
  },
  {
    id: 'ST-2026-4760',
    platform: 'Razorpay',
    platformColor: '#528FF0',
    type: 'Duplicate Fee Deduction',
    amount: 1450,
    status: 'approved',
    filedDate: '2026-03-29',
    description: 'System identified 2 distinct platform fees charged for a single transaction ID ending in 9821.',
    aiConfidence: 89,
    recoveryProbability: 95,
    priority: 'medium',
    reasoning: {
      whatWentWrong: 'Gateway deducted the standard 2% processing fee twice for one order payment.',
      whyItsWrong: 'Transaction logs show only one successful API call from customer, but two internal gateway deductions.',
      howMuchLost: 1450,
    }
  },
  {
    id: 'FL-9982',
    platform: 'Flipkart',
    platformColor: '#F7E532',
    type: 'Return Fraud (Weight Dispute)',
    amount: 3890,
    status: 'review',
    filedDate: '2026-03-30',
    description: 'Customer returned wrong item (weight 380g vs original 1.2kg). Flipkart initially rejected the claim.',
    aiConfidence: 92,
    recoveryProbability: 75,
    priority: 'high',
    reasoning: {
      whatWentWrong: 'Return center accepted a product weighing 380g, while the shipped box was documented at 1.2kg.',
      whyItsWrong: 'Physical impossibility. The carrier scan at original dispatch explicitly verifies the 1.2kg weight.',
      howMuchLost: 3890,
    }
  },
  {
    id: 'CD-2026-0871',
    platform: 'Shiprocket',
    platformColor: '#8B5CF6',
    type: 'Missing COD Remittance',
    amount: 4100,
    status: 'filed',
    filedDate: '2026-04-01',
    description: '2 delivered orders confirmed via POD but COD amount not remitted to merchant account in T+3 window.',
    aiConfidence: 99,
    recoveryProbability: 99,
    priority: 'critical',
    reasoning: {
      whatWentWrong: 'Carrier acknowledged COD collection via e-POD on Mar 27, but funds have not hit your settlement ledger.',
      whyItsWrong: 'Violates standard T+3 settlement terms for collected cash on delivery orders.',
      howMuchLost: 4100,
    }
  },
  {
    id: 'AM-2026-0445',
    platform: 'Amazon',
    platformColor: '#FF9900',
    type: 'FBA Storage Overcharge',
    amount: 8200,
    status: 'detected',
    filedDate: '2026-04-01',
    description: 'Monthly FBA storage fees spiked by 24% despite average daily inventory remaining flat compared to last month.',
    aiConfidence: 85,
    recoveryProbability: 80,
    priority: 'medium',
    reasoning: {
      whatWentWrong: 'Amazon applied oversized "Long Term Storage" fees prematurely to a batch of regular inventory.',
      whyItsWrong: 'The inventory batch arrived only 45 days ago, well below the 180-day threshold for long-term penalties.',
      howMuchLost: 8200,
    }
  }
];

export const INSIGHTS: Insight[] = [
  {
    id: 'ins-1',
    title: 'Revenue Leakage Stopped',
    description: 'You recovered ₹14,240 this month from miscalculated commission tiers on Amazon.',
    type: 'recovery',
    impact: 14240
  },
  {
    id: 'ins-2',
    title: 'Highest Leakage Source',
    description: 'Most unresolved losses currently stem from FlipKart return fraud (Weight disputes).',
    type: 'loss',
  },
  {
    id: 'ins-3',
    title: 'Unusual Fee Spike',
    description: 'Detected a 12% jump in Cashfree settlement delays late last week. Raised 3 tickets automatically.',
    type: 'trend',
  },
  {
    id: 'ins-4',
    title: 'At Risk Deadlines',
    description: '₹4,100 in missing COD claims will expire in 2 days. SettleGuard prioritized this.',
    type: 'alert',
    impact: 4100
  }
];

export const PLATFORMS: PlatformConnection[] = [
  {
    id: 'amazon',
    name: 'Amazon Seller Central',
    icon: '📦',
    color: '#FF9900',
    bgColor: 'rgba(255,153,0,0.08)',
    status: 'connected',
    lastSync: '2 minutes ago',
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
    lastSync: '5 minutes ago',
    totalTransactions: 5621,
    issuesFound: 14,
    amountRecovered: 92300,
  },
  {
    id: 'razorpay',
    name: 'Razorpay',
    icon: '💳',
    color: '#528FF0',
    bgColor: 'rgba(82,143,240,0.08)',
    status: 'connected',
    lastSync: '1 minute ago',
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
    lastSync: 'Syncing now...',
    totalTransactions: 3200,
    issuesFound: 6,
    amountRecovered: 28100,
  },
  {
    id: 'cashfree',
    name: 'Cashfree Payments',
    icon: '🏦',
    color: '#00D09C',
    bgColor: 'rgba(0,208,156,0.08)',
    status: 'connected',
    lastSync: '12 minutes ago',
    totalTransactions: 4100,
    issuesFound: 3,
    amountRecovered: 12800,
  },
];
