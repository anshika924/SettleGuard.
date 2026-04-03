'use client';

import { motion } from 'framer-motion';
import HeroStats from '@/components/HeroStats';
import ActivityFeed from '@/components/ActivityFeed';
import InsightsPanel from '@/components/InsightsPanel';
import AIAssistant from '@/components/AIAssistant';

export default function DashboardPage() {
  return (
    <div className="p-8 max-w-[1400px] mx-auto min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-text-primary text-2xl font-bold m-0 mb-1 font-mono tracking-tight uppercase">
          SettleGuard Command Center
        </h1>
        <p className="text-text-secondary text-sm m-0">
          Autonomous revenue recovery agent is active. Monitoring for leakage...
        </p>
      </motion.div>

      {/* 1. Hero Section */}
      <HeroStats />

      {/* Main Grid for bottom 3 sections */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 pb-20">
        
        {/* 2. Activity Feed (Takes up 2 columns) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="lg:col-span-2 h-[600px]"
        >
          <ActivityFeed />
        </motion.div>

        {/* 3. Insights Panel (Takes up 1 column) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="lg:col-span-1 h-[600px]"
        >
          <InsightsPanel />
        </motion.div>

        {/* 4. AI Assistant Panel (Takes up 1 column) */}
         <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="lg:col-span-1 h-[600px] flex flex-col"
        >
          <div className="flex-1 flex flex-col justify-end">
             <AIAssistant />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
