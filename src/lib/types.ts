// Types for the AI recovery agent
export type EventStatus = 'thinking' | 'scanning' | 'analyzing' | 'alert' | 'deciding' | 'acting' | 'recovered';
export type EventSource = 'razorpay' | 'amazon' | 'flipkart' | 'shiprocket' | 'cashfree' | 'payu' | 'bank';

export type ClaimStage = 'detected' | 'filed' | 'review' | 'approved' | 'recovered';

export interface AgentThought {
  text: string;
  type: 'observation' | 'reasoning' | 'decision' | 'action' | 'result';
  confidence?: number;
}

export interface AIRichReasoning {
  whatWentWrong: string;
  whyItsWrong: string;
  howMuchLost: number;
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

export interface DetailedClaim {
  id: string;
  platform: string;
  platformColor: string;
  type: string;
  amount: number;
  status: ClaimStage;
  filedDate: string;
  resolvedDate?: string;
  description: string;
  aiConfidence: number;
  recoveryProbability: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
  reasoning: AIRichReasoning;
}

export interface Insight {
  id: string;
  title: string;
  description: string;
  type: 'loss' | 'recovery' | 'alert' | 'trend';
  impact?: number;
}

export interface AgentStats {
  totalRecovered: number;
  claimsFiled: number;
  winRate: number;
  activeClaims: number;
}
