'use client';

import HeroSection from '@/components/HeroSection';
import ActivityFeed from '@/components/ActivityFeed';
import InsightsPanel from '@/components/InsightsPanel';
import AIAssistant from '@/components/AIAssistant';
import { FINANCIAL_SUMMARY, CLAIMS, INSIGHTS, ALERTS } from '@/lib/dashboard-data';

// ============================================================
// Dashboard Page — Clean, focused product experience
// Hero → Activity Feed + Insights → AI Assistant (floating)
// ============================================================

export default function DashboardPage() {
  return (
    <div className="dashboard-page">
      {/* 1. HERO — Total recovered, daily gain, key stats */}
      <HeroSection summary={FINANCIAL_SUMMARY} />

      {/* 2. MAIN CONTENT — Activity Feed (left) + Insights (right) */}
      <div className="dashboard-main">
        <div className="dashboard-feed-col">
          <ActivityFeed claims={CLAIMS} />
        </div>
        <div className="dashboard-insights-col">
          <InsightsPanel insights={INSIGHTS} alerts={ALERTS} />
        </div>
      </div>

      {/* 3. AI ASSISTANT — Floating chat panel */}
      <AIAssistant />
    </div>
  );
}
