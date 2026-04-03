'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Shield, Scan, FileCheck, BadgeCheck, ArrowRight, TrendingUp, ChevronDown, Zap, Brain, Lock, BarChart3 } from 'lucide-react';

// ============================================================
// Homepage — Premium dark fintech landing page
// Inspired by "Exactly Bar" reference: hero → features → benefits → CTA
// ============================================================

function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{ background: 'rgba(9,9,15,0.8)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(139,92,246,0.06)' }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(139,92,246,0.05))', border: '1px solid rgba(139,92,246,0.25)' }}
          >
            <Shield className="w-4 h-4 text-accent-purple" />
          </div>
          <span className="text-text-primary text-sm font-bold tracking-wider">SETTLE</span>
          <span className="text-accent-purple text-sm font-bold" style={{ fontFamily: 'var(--font-mono)' }}>GUARD</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-text-secondary text-sm hover:text-text-primary transition-colors no-underline">Features</a>
          <a href="#benefits" className="text-text-secondary text-sm hover:text-text-primary transition-colors no-underline">Benefits</a>
          <a href="#how-it-works" className="text-text-secondary text-sm hover:text-text-primary transition-colors no-underline">How It Works</a>
        </div>

        <Link
          href="/login"
          className="px-5 py-2 rounded-lg text-sm font-semibold no-underline transition-all duration-200"
          style={{
            background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(139,92,246,0.05))',
            border: '1px solid rgba(139,92,246,0.25)',
            color: '#a78bfa',
          }}
        >
          Launch App
        </Link>
      </div>
    </motion.nav>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* CSS-only geometric background — always crisp */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #09090f 0%, #0d0a14 40%, #09090f 100%)' }}>
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(139,92,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Large purple orb — top center */}
        <div
          className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, rgba(139,92,246,0.04) 35%, transparent 70%)' }}
        />

        {/* Secondary warm orb — right side */}
        <div
          className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 70%)' }}
        />

        {/* Accent line — bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.15), transparent)' }}
        />

        {/* Floating geometric shapes */}
        <div
          className="absolute top-[15%] left-[8%] w-[180px] h-[180px] rounded-full pointer-events-none"
          style={{ border: '1px solid rgba(139,92,246,0.04)' }}
        />
        <div
          className="absolute bottom-[20%] right-[12%] w-[120px] h-[120px] rounded-full pointer-events-none"
          style={{ border: '1px solid rgba(139,92,246,0.05)' }}
        />
        <div
          className="absolute top-[40%] right-[5%] w-[250px] h-[250px] pointer-events-none"
          style={{ border: '1px solid rgba(139,92,246,0.03)', borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Tag */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
            style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.15)' }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-accent-purple pulse-dot" />
            <span className="text-accent-purple-bright text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>
              AI-Powered Revenue Recovery
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] mb-6 tracking-tight">
            <span className="text-text-primary">Stop Losing</span>
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #a78bfa, #c4b5fd, #e0d5ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Revenue Silently
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
            Paytm merchants and digital businesses leak <span className="text-accent-amber font-semibold">1–3% of revenue</span> to wrong fees,
            overcharges, and missing refunds. SettleGuard AI finds it, files claims, and recovers your money — <span className="text-accent-purple-bright font-semibold">autonomously</span>.
          </p>

          {/* CTAs */}
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/login"
              className="group px-8 py-3.5 rounded-xl font-bold text-base no-underline flex items-center gap-2 transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                color: '#fff',
                boxShadow: '0 4px 20px rgba(139,92,246,0.25)',
              }}
            >
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#how-it-works"
              className="px-8 py-3.5 rounded-xl font-bold text-base no-underline flex items-center gap-2 transition-all duration-200"
              style={{
                background: 'transparent',
                border: '1px solid rgba(139,92,246,0.3)',
                color: '#a78bfa',
              }}
            >
              See How It Works
            </a>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-text-muted text-xs tracking-wider uppercase" style={{ fontFamily: 'var(--font-mono)' }}>Scroll</span>
          <ChevronDown className="w-4 h-4 text-text-muted animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: <Scan className="w-6 h-6" />,
      title: 'Smart Detection',
      description: 'AI scans every transaction across Paytm Payment Gateway, Amazon, Flipkart, and more to find overcharges, wrong fees, and missing refunds.',
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'Autonomous Claims',
      description: 'Once an issue is found, SettleGuard auto-files claims with the right platform — no manual work required from you.',
    },
    {
      icon: <FileCheck className="w-6 h-6" />,
      title: 'Claim Tracking',
      description: 'Track every claim through its lifecycle. From detection through filing, review, and approval — all in real-time.',
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'Trusted & Secure',
      description: 'Bank-grade encryption. Read-only access to your data. We verify every discrepancy before taking action.',
    },
  ];

  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent-purple text-xs font-bold uppercase tracking-[0.2em] mb-3 block" style={{ fontFamily: 'var(--font-mono)' }}>
            About Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            How We Protect Your Revenue
          </h2>
          <p className="text-text-secondary text-base max-w-xl mx-auto">
            An all-in-one AI agent that monitors, detects, and recovers lost revenue across Paytm and all your payment platforms.
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group p-6 rounded-2xl text-center transition-all duration-300"
              style={{
                background: 'rgba(17,17,25,0.8)',
                border: '1px solid rgba(139,92,246,0.08)',
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-5 transition-all duration-300 group-hover:scale-110"
                style={{
                  background: 'rgba(139,92,246,0.1)',
                  border: '1px solid rgba(139,92,246,0.2)',
                  color: '#a78bfa',
                }}
              >
                {feature.icon}
              </div>
              <h3 className="text-text-primary text-base font-bold mb-2">{feature.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed m-0">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Learn more button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold no-underline transition-all duration-200"
            style={{
              background: 'transparent',
              border: '1px solid rgba(139,92,246,0.25)',
              color: '#a78bfa',
            }}
          >
            Learn More
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  const benefits = [
    {
      keyword: 'Boost',
      keywordColor: '#22c55e',
      title: 'your\nearnings',
      description: 'Recover revenue you didn\'t even know was missing. Helps Paytm merchants ensure accurate settlements by catching every overcharge.',
      icon: <TrendingUp className="w-8 h-8" />,
    },
    {
      keyword: 'Reduce',
      keywordColor: '#8b5cf6',
      title: 'your\nexpenses',
      description: 'Eliminate the cost of manual reconciliation. Our AI handles the entire process — from detection to recovery.',
      icon: <BarChart3 className="w-8 h-8" />,
    },
    {
      keyword: 'Simplify',
      keywordColor: '#a78bfa',
      title: 'your\nsettlements',
      description: 'One dashboard to track all claims across Paytm and every connected platform. No more juggling between marketplace portals.',
      icon: <Zap className="w-8 h-8" />,
    },
  ];

  return (
    <section id="benefits" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-text-muted text-xs font-bold uppercase tracking-[0.2em] mb-3 block" style={{ fontFamily: 'var(--font-mono)' }}>
            Benefits
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
            Benefits for your business:
          </h2>
        </motion.div>

        {/* Benefit cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="group p-6 rounded-2xl transition-all duration-300 hover:translate-y-[-4px]"
              style={{
                background: 'rgba(17,17,25,0.8)',
                border: '1px solid rgba(139,92,246,0.08)',
              }}
            >
              <div className="mb-5">
                <h3 className="text-2xl font-black leading-tight m-0">
                  <span style={{ color: benefit.keywordColor }}>{benefit.keyword}</span>
                  <span className="text-text-primary"> {benefit.title.split('\n').map((line, i) => (
                    <span key={i}>{line}{i === 0 && <br />}</span>
                  ))}</span>
                </h3>
              </div>

              <p className="text-text-secondary text-sm leading-relaxed mb-6">{benefit.description}</p>

              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{
                  background: 'rgba(139,92,246,0.06)',
                  border: '1px solid rgba(139,92,246,0.12)',
                  color: '#a78bfa',
                }}
              >
                {benefit.icon}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Connecting line visual (decorative) */}
        <div className="hidden md:flex items-center justify-center mt-12 gap-0">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.2))' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(139,92,246,0.3)', border: '1px solid rgba(139,92,246,0.4)' }} />
          <div className="flex-1 h-px" style={{ background: 'rgba(139,92,246,0.2)' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(139,92,246,0.3)', border: '1px solid rgba(139,92,246,0.4)' }} />
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(139,92,246,0.2), transparent)' }} />
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      step: '01',
      title: 'Connect Your Accounts',
      description: 'Link your Paytm for Business, Amazon Seller, Flipkart, Shiprocket, and bank accounts. Read-only access — we never make transactions.',
      icon: <Shield className="w-5 h-5" />,
    },
    {
      step: '02',
      title: 'AI Scans Everything',
      description: 'Our AI agent analyzes every transaction, matching settlements against expected amounts to find discrepancies.',
      icon: <Scan className="w-5 h-5" />,
    },
    {
      step: '03',
      title: 'Claims Auto-Filed',
      description: 'When an overcharge or missing refund is found, SettleGuard automatically files the right claim with the right platform.',
      icon: <FileCheck className="w-5 h-5" />,
    },
    {
      step: '04',
      title: 'Money Recovered',
      description: 'Track claim progress in real-time. Money flows back to your account — hands-free. Average recovery within 5–12 days.',
      icon: <BadgeCheck className="w-5 h-5" />,
    },
  ];

  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent-purple text-xs font-bold uppercase tracking-[0.2em] mb-3 block" style={{ fontFamily: 'var(--font-mono)' }}>
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
            Your AI agent in 4 simple steps
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex gap-4 p-5 rounded-2xl transition-all duration-300 hover:translate-y-[-2px]"
              style={{
                background: 'rgba(17,17,25,0.6)',
                border: '1px solid rgba(139,92,246,0.08)',
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'rgba(139,92,246,0.1)',
                  border: '1px solid rgba(139,92,246,0.2)',
                  color: '#a78bfa',
                }}
              >
                {step.icon}
              </div>
              <div>
                <span className="text-accent-purple text-[10px] font-bold uppercase tracking-wider block mb-1" style={{ fontFamily: 'var(--font-mono)' }}>
                  Step {step.step}
                </span>
                <h3 className="text-text-primary text-base font-bold m-0 mb-1.5">{step.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed m-0">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center relative rounded-3xl py-16 px-8 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(139,92,246,0.06), rgba(124,58,237,0.03), rgba(17,17,25,0.95))',
            border: '1px solid rgba(139,92,246,0.12)',
          }}
        >
          {/* Top glow line */}
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.4), transparent)' }} />

          {/* Background glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)' }}
          />

          <div className="relative z-10">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)' }}
            >
              <Brain className="w-8 h-8 text-accent-purple" />
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-text-primary mb-4">
              Ready to recover your lost revenue?
            </h2>
            <p className="text-text-secondary text-base max-w-lg mx-auto mb-8">
              Deploy your AI settlement agent today. Designed to work within Paytm's merchant ecosystem — no setup fees, no manual work. SettleGuard pays for itself from the first recovery.
            </p>

            <Link
              href="/login"
              className="group inline-flex items-center gap-2 px-10 py-4 rounded-xl font-bold text-lg no-underline transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                color: '#fff',
                boxShadow: '0 4px 30px rgba(139,92,246,0.3)',
              }}
            >
              Start Yours
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <p className="text-text-muted text-xs mt-4" style={{ fontFamily: 'var(--font-mono)' }}>
              Free to start · No credit card required · Works with Paytm Payment Gateway
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-accent-purple" />
          <span className="text-text-primary text-sm font-bold tracking-wider">SETTLE</span>
          <span className="text-accent-purple text-sm font-bold" style={{ fontFamily: 'var(--font-mono)' }}>GUARD</span>
        </div>
        <p className="text-text-muted text-xs m-0" style={{ fontFamily: 'var(--font-mono)' }}>
          © 2026 SettleGuard AI · Autonomous Revenue Recovery for Paytm Merchants
        </p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="bg-bg-primary min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <BenefitsSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </div>
  );
}
