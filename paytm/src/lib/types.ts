// ============================================================
// Core type system for SettleGuard AI — Product-level types
// ============================================================

// --- Event types for the live agent view (home page) ---
export type EventStatus = 'thinking' | 'scanning' | 'analyzing' | 'alert' | 'deciding' | 'acting' | 'recovered';
export type EventSource = 'razorpay' | 'amazon' | 'flipkart' | 'shiprocket' | 'cashfree' | 'payu' | 'bank';

export interface AgentThought {
  text: string;
  type: 'observation' | 'reasoning' | 'decision' | 'action' | 'result';
  confidence?: number;
}

export interface RecoveryEvent {
  id: string;
  timestamp: Date;
  status: EventStatus;
  source: EventSource;
  title: string;
  thoughts: AgentThought[];
  recoveryAmount?: number;
  claimId?: string;
}

export interface AgentStats {
  totalRecovered: number;
  claimsFiled: number;
  winRate: number;
  activeClaims: number;
}

// --- Claim lifecycle stages ---
export type ClaimStage = 'detected' | 'filed' | 'under_review' | 'approved' | 'recovered';

// Human-readable labels for each stage
export const STAGE_LABELS: Record<ClaimStage, string> = {
  detected: 'Detected',
  filed: 'Filed',
  under_review: 'Under Review',
  approved: 'Approved',
  recovered: 'Recovered',
};

// Ordered list for stage progression
export const STAGE_ORDER: ClaimStage[] = ['detected', 'filed', 'under_review', 'approved', 'recovered'];

// --- AI explanation for each claim ---
export interface AIExplanation {
  whatWentWrong: string;   // e.g., "Commission charged at 17% instead of 12%"
  whyItsWrong: string;    // e.g., "Product has ethnic patterns → should classify as Ethnic Wear"
  howMuchLost: number;     // Amount in ₹
}

// --- Enriched claim for the dashboard ---
export interface EnrichedClaim {
  id: string;
  platform: string;
  platformColor: string;
  platformIcon: string;
  type: string;
  category: 'commission' | 'shipping' | 'refund' | 'settlement' | 'fee' | 'cod';
  amount: number;
  stage: ClaimStage;
  recoveryProbability: number;  // 0-100
  priorityRank: 'critical' | 'high' | 'medium' | 'low';
  aiExplanation: AIExplanation;
  aiConfidence: number;
  filedDate: string;
  resolvedDate?: string;
  deadlineDays?: number;  // Days until deadline
  description: string;
}

// --- Revenue intelligence insights ---
export interface InsightCard {
  id: string;
  icon: string;
  title: string;
  value: string;
  subtitle: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color: 'green' | 'amber' | 'red' | 'blue';
}

// --- Risk alerts ---
export interface AlertItem {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  amount?: number;
  deadlineDays?: number;
}

// --- AI Assistant chat ---
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

// --- Financial summary ---
export interface FinancialSummary {
  totalRecovered: number;
  totalAtRisk: number;
  recoverySuccessRate: number;
  claimsWon: number;
  claimsLost: number;
  claimsActive: number;
  recoveredToday: number;
  monthlyLoss: number;
}

// --- Activity feed event (human-readable) ---
export interface ActivityEvent {
  id: string;
  claimId: string;
  platform: string;
  platformColor: string;
  platformIcon: string;
  message: string;          // "Amazon overcharge ₹5,240 → recovered"
  stage: ClaimStage;
  amount: number;
  timestamp: Date;
  isNew?: boolean;
}
