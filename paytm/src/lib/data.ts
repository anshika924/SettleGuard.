import { RecoveryEvent, AgentStats } from './types';

// ============================================================
// The agent tells ONE story: Scan → Think → Find → Act → Recover
// No information overload. One clear narrative.
// ============================================================

export const INITIAL_STATS: AgentStats = {
  totalRecovered: 472318,
  claimsFiled: 847,
  winRate: 73,
  activeClaims: 12,
};

// LIVE EVENTS — the agent's thinking process shown step by step
// Each event shows the AI REASONING, not just actions
export const LIVE_EVENTS: RecoveryEvent[] = [
  // ===== ACT 1: THE SCAN (show the AI ingesting data) =====
  {
    id: 'ev-1',
    timestamp: new Date(),
    status: 'scanning',
    source: 'amazon',
    title: 'Ingesting Amazon weekly settlement — 312 orders, ₹4,87,200',
    thoughts: [
      { text: 'Pulling settlement report via Amazon SP-API...', type: 'observation' },
      { text: 'Cross-referencing 312 orders against seller fee schedule', type: 'observation' },
    ],
  },

  // ===== ACT 2: AI FINDS SOMETHING (show it THINKING) =====
  {
    id: 'ev-2',
    timestamp: new Date(),
    status: 'analyzing',
    source: 'amazon',
    title: 'Anomaly detected in commission rates — analyzing...',
    thoughts: [
      { text: 'SKU "Premium Silk Kurta" is being charged 17% commission under "Apparel" category', type: 'observation' },
      { text: 'But this product has embroidery + ethnic design patterns → should classify as "Ethnic Wear" (12%)', type: 'reasoning', confidence: 94 },
      { text: 'Similar reclassification claims have 81% approval rate based on 2,847 historical cases', type: 'reasoning', confidence: 81 },
    ],
  },

  // ===== ACT 3: AI MAKES A DECISION =====
  {
    id: 'ev-3',
    timestamp: new Date(),
    status: 'deciding',
    source: 'amazon',
    title: 'AI Decision — Should I file a claim?',
    thoughts: [
      { text: 'Overcharge amount: ₹2,340 across 12 orders', type: 'observation' },
      { text: 'Confidence that category is wrong: 94%', type: 'reasoning', confidence: 94 },
      { text: 'Historical win rate for this claim type: 81%', type: 'reasoning', confidence: 81 },
      { text: 'Expected recovery value: ₹2,340 × 81% = ₹1,895', type: 'reasoning' },
      { text: 'DECISION: File claim. High confidence + high expected value.', type: 'decision' },
    ],
  },

  // ===== ACT 4: AI ACTS AUTONOMOUSLY =====
  {
    id: 'ev-4',
    timestamp: new Date(),
    status: 'acting',
    source: 'amazon',
    title: 'Filing SAFE-T claim automatically...',
    claimId: 'ST-2026-4821',
    thoughts: [
      { text: 'Generating evidence package: category mapping proof + fee comparison across 12 orders', type: 'action' },
      { text: 'Composing claim narrative optimized for Amazon review team (using high-approval template)', type: 'action' },
      { text: 'SAFE-T claim #ST-2026-4821 submitted via SP-API', type: 'action' },
      { text: 'Auto-follow-up scheduled: Day 7 → Day 14 → escalation at Day 30', type: 'action' },
    ],
    recoveryAmount: 2340,
  },

  // ===== ACT 5: SECOND ISSUE — COD problem (faster this time) =====
  {
    id: 'ev-5',
    timestamp: new Date(),
    status: 'scanning',
    source: 'shiprocket',
    title: 'Scanning Shiprocket COD remittances — 47 deliveries',
    thoughts: [
      { text: 'Cross-matching delivery confirmations against remittance records', type: 'observation' },
    ],
  },
  {
    id: 'ev-6',
    timestamp: new Date(),
    status: 'acting',
    source: 'shiprocket',
    title: 'Missing COD found → Dispute filed instantly',
    thoughts: [
      { text: '2 delivered orders (₹4,100) confirmed delivered but not remitted', type: 'observation' },
      { text: 'POD exists, weight scan matches, tracking confirmed — evidence is conclusive', type: 'reasoning', confidence: 99 },
      { text: 'DECISION: Confidence 99% — filing immediately, no human review needed', type: 'decision' },
      { text: 'COD dispute #CD-2026-0871 raised via Shiprocket API with all evidence attached', type: 'action' },
    ],
    recoveryAmount: 4100,
  },

  // ===== ACT 6: THE BIG WOW — A PAST CLAIM JUST GOT APPROVED =====
  {
    id: 'ev-7',
    timestamp: new Date(),
    status: 'recovered',
    source: 'flipkart',
    title: '₹3,890 RECOVERED — Flipkart return fraud claim approved',
    thoughts: [
      { text: 'SPF Claim #FL-9982 has been APPROVED — ₹3,890 credited to seller account', type: 'result' },
      { text: 'This claim was rejected once on Day 7. I re-filed with weight-mismatch evidence on Day 8.', type: 'reasoning' },
      { text: 'Then escalated to Flipkart Grievance Officer on Day 15. Approved on Day 22.', type: 'reasoning' },
      { text: 'I persisted through 1 rejection + 1 escalation. The merchant never had to do anything.', type: 'result' },
    ],
    recoveryAmount: 3890,
  },

  // ===== ACT 7: SECOND RECOVERY — even bigger =====
  {
    id: 'ev-8',
    timestamp: new Date(),
    status: 'recovered',
    source: 'amazon',
    title: '₹5,240 RECOVERED — Amazon commission correction approved',
    thoughts: [
      { text: 'SAFE-T Claim #ST-2026-4760 APPROVED — ₹5,240 credited', type: 'result' },
      { text: '14 SKUs were miscategorized under "Electronics Accessories" (18%) instead of "Mobile Accessories" (9%)', type: 'observation' },
      { text: 'I identified the pattern, compiled evidence across all 14 SKUs, and filed 12 days ago', type: 'reasoning' },
      { text: 'Approved on first pass — no escalation needed. My accuracy on these claims: 81%', type: 'result' },
    ],
    recoveryAmount: 5240,
  },
];

// Tighter timing — the whole story unfolds in ~50 seconds
export const EVENT_SCHEDULE: number[] = [
  2000,   // ev-1: Scanning Amazon (2s)
  6000,   // ev-2: Anomaly detected — AI thinking (6s)
  12000,  // ev-3: AI Decision — should I file? (12s) ← FIRST WOW: AI reasoning
  17000,  // ev-4: Auto-claim filed (17s) ← SECOND WOW: autonomous action
  23000,  // ev-5: Scanning Shiprocket (23s)
  27000,  // ev-6: COD dispute filed instantly (27s) ← shows speed
  34000,  // ev-7: Flipkart RECOVERED ₹3,890 (34s) ← BIG WOW
  42000,  // ev-8: Amazon RECOVERED ₹5,240 (42s) ← BIGGEST WOW
];

// Source styling
export const SOURCE_CONFIG: Record<string, { label: string; color: string; bgColor: string }> = {
  razorpay:  { label: 'Paytm PG',   color: '#528FF0',  bgColor: 'rgba(82,143,240,0.12)' },
  amazon:    { label: 'Amazon',    color: '#FF9900',  bgColor: 'rgba(255,153,0,0.12)' },
  flipkart:  { label: 'Flipkart',  color: '#F7E532',  bgColor: 'rgba(247,229,50,0.12)' },
  shiprocket:{ label: 'Shiprocket', color: '#8B5CF6', bgColor: 'rgba(139,92,246,0.12)' },
  cashfree:  { label: 'Paytm Wallet', color: '#00D09C', bgColor: 'rgba(0,208,156,0.12)' },
  payu:      { label: 'Paytm UPI', color: '#4CAF50',  bgColor: 'rgba(76,175,80,0.12)' },
  bank:      { label: 'Bank',      color: '#78909C',  bgColor: 'rgba(120,144,156,0.12)' },
};
