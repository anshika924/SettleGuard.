'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Shield,
  Mail,
  Lock,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  Building2,
  CheckCircle2,
} from 'lucide-react';

// ============================================================
// Auth Page — Login / Signup with premium dark fintech UI
// ============================================================

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form fields
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Extract name from email (e.g., anshika@gmail.com -> Anshika)
    let extractedName = 'Merchant';
    if (email && email.includes('@')) {
      const emailPrefix = email.split('@')[0];
      // Capitalize first letter
      extractedName = emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1);
    }
    
    // In signup mode, prefer the actual name if provided
    if (mode === 'signup' && name) {
      extractedName = name;
    }
    
    localStorage.setItem('merchantName', extractedName);

    // Simulate auth delay, then redirect to dashboard
    setTimeout(() => {
      router.push('/dashboard');
    }, 1200);
  };

  const [showGoogleModal, setShowGoogleModal] = useState(false);
  
  const mockGoogleAccounts = [
    { name: 'Anshika', email: 'anshika@gmail.com', avatar: 'A' },
    { name: 'SettleGuard Admin', email: 'admin@settleguard.com', avatar: 'S' },
  ];

  const handleSocialLogin = (provider: string) => {
    if (provider === 'Google') {
      setShowGoogleModal(true);
      return;
    }
    
    setIsLoading(true);
    // Mock Apple login
    localStorage.setItem('merchantName', `${provider} User`);
    setTimeout(() => {
      router.push('/dashboard');
    }, 1200);
  };

  const handleGoogleAccountSelect = (accountName: string) => {
    setShowGoogleModal(false);
    setIsLoading(true);
    localStorage.setItem('merchantName', accountName);
    setTimeout(() => {
      router.push('/dashboard');
    }, 1200);
  };

  const trustPoints = [
    'Built for Paytm for Business merchants',
    'Read-only access — we never make transactions',
    'Bank-grade 256-bit encryption',
    'Autonomous AI claim filing & tracking',
  ];

  return (
    <div className="auth-page">
      {/* Background effects */}
      <div className="auth-bg">
        <div className="auth-bg-grid" />
        <div className="auth-bg-orb auth-bg-orb-1" />
        <div className="auth-bg-orb auth-bg-orb-2" />
        <div className="auth-bg-orb auth-bg-orb-3" />
      </div>

      {/* Nav — minimal */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="auth-nav"
      >
        <Link href="/" className="auth-logo-link">
          <div className="auth-logo-icon">
            <Shield className="w-4 h-4 text-accent-purple" />
          </div>
          <span className="text-text-primary text-sm font-bold tracking-wider">SETTLE</span>
          <span className="text-accent-purple text-sm font-bold" style={{ fontFamily: 'var(--font-mono)' }}>GUARD</span>
        </Link>
      </motion.nav>

      {/* Main content */}
      <div className="auth-container">
        {/* Left — Trust panel (desktop only) */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="auth-trust-panel"
        >
          <div className="auth-trust-inner">
            <div className="auth-trust-badge">
              <Shield className="w-8 h-8 text-accent-purple" />
            </div>

            <h2 className="auth-trust-title">
              Your revenue,
              <br />
              <span style={{
                background: 'linear-gradient(135deg, #a78bfa, #c4b5fd)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                protected.
              </span>
            </h2>

            <p className="auth-trust-desc">
              SettleGuard AI plugs into your Paytm Payment Gateway and connected platforms to detect settlement errors, auto-file claims, and recover your money.
            </p>

            <div className="auth-trust-points">
              {trustPoints.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  className="auth-trust-point"
                >
                  <CheckCircle2 className="w-4 h-4 text-accent-green flex-shrink-0" />
                  <span>{point}</span>
                </motion.div>
              ))}
            </div>

            {/* Decorative stat */}
            <div className="auth-trust-stat">
              <div className="auth-trust-stat-value">Paytm × SettleGuard</div>
              <div className="auth-trust-stat-label">AI-powered settlement recovery for the Paytm merchant ecosystem</div>
            </div>
          </div>
        </motion.div>

        {/* Right — Auth form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="auth-form-panel"
        >
          <div className="auth-form-card">
            {/* Mode tabs */}
            <div className="auth-tabs">
              <button
                onClick={() => setMode('login')}
                className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
              >
                Sign In
              </button>
              <button
                onClick={() => setMode('signup')}
                className={`auth-tab ${mode === 'signup' ? 'active' : ''}`}
              >
                Create Account
              </button>
              <div
                className="auth-tab-indicator"
                style={{ transform: mode === 'login' ? 'translateX(0)' : 'translateX(100%)' }}
              />
            </div>

            {/* Form */}
            <AnimatePresence mode="wait">
              <motion.form
                key={mode}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                onSubmit={handleSubmit}
                className="auth-form"
              >
                {mode === 'signup' && (
                  <>
                    {/* Name */}
                    <div className="auth-field">
                      <label className="auth-label">Full Name</label>
                      <div className="auth-input-wrap">
                        <User className="auth-input-icon" />
                        <input
                          type="text"
                          placeholder="Your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="auth-input"
                          required
                        />
                      </div>
                    </div>

                    {/* Business Name */}
                    <div className="auth-field">
                      <label className="auth-label">Business Name</label>
                      <div className="auth-input-wrap">
                        <Building2 className="auth-input-icon" />
                        <input
                          type="text"
                          placeholder="Your store or company"
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          className="auth-input"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Email */}
                <div className="auth-field">
                  <label className="auth-label">Email Address</label>
                  <div className="auth-input-wrap">
                    <Mail className="auth-input-icon" />
                    <input
                      type="email"
                      placeholder="you@business.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="auth-input"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="auth-field">
                  <div className="auth-label-row">
                    <label className="auth-label">Password</label>
                    {mode === 'login' && (
                      <button type="button" className="auth-forgot">Forgot?</button>
                    )}
                  </div>
                  <div className="auth-input-wrap">
                    <Lock className="auth-input-icon" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder={mode === 'signup' ? 'Min 8 characters' : '••••••••'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="auth-input"
                      required
                      minLength={mode === 'signup' ? 8 : undefined}
                    />
                    <button
                      type="button"
                      className="auth-eye-btn"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className={`auth-submit ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="auth-spinner" />
                  ) : (
                    <>
                      {mode === 'login' ? 'Sign In to Dashboard' : 'Create Your Account'}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Divider */}
                <div className="auth-divider">
                  <div className="auth-divider-line" />
                  <span className="auth-divider-text">or continue with</span>
                  <div className="auth-divider-line" />
                </div>

                {/* Social buttons */}
                <div className="auth-social-row">
                  <button type="button" className="auth-social-btn" onClick={() => handleSocialLogin('Google')}>
                    <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                    Google
                  </button>
                  <button type="button" className="auth-social-btn" onClick={() => handleSocialLogin('Apple')}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                    Apple
                  </button>
                </div>

                {/* Toggle mode text */}
                <p className="auth-toggle-text">
                  {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
                  <button
                    type="button"
                    className="auth-toggle-btn"
                    onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                  >
                    {mode === 'login' ? 'Create one' : 'Sign in'}
                  </button>
                </p>
              </motion.form>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Mock Google Account Selector Modal */}
      <AnimatePresence>
        {showGoogleModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-[8px] shadow-2xl w-[450px] overflow-hidden flex flex-col p-10"
            >
              {/* Google Brand Header */}
              <div className="flex flex-col items-center mb-8">
                <svg width="48" height="48" viewBox="0 0 24 24" className="mb-4">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <h3 className="text-[#202124] text-2xl font-normal mb-2 tracking-tight">Sign in</h3>
                <p className="text-[#202124] text-base text-center">to continue to SettleGuard</p>
              </div>

              {/* Email Input Form */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  const target = e.target as HTMLFormElement;
                  const emailInput = target.elements.namedItem('googleEmail') as HTMLInputElement;
                  let extName = 'Google User';
                  if (emailInput.value && emailInput.value.includes('@')) {
                    const prefix = emailInput.value.split('@')[0];
                    extName = prefix.charAt(0).toUpperCase() + prefix.slice(1);
                  }
                  handleGoogleAccountSelect(extName);
                }} 
                className="flex flex-col w-full"
              >
                <div className="mb-10 relative">
                  <input 
                    type="email" 
                    name="googleEmail"
                    required
                    placeholder="Email or phone"
                    className="w-full px-4 pt-4 pb-3 border border-[#dadce0] rounded text-base text-[#202124] focus:outline-none focus:border-[#1a73e8] focus:border-2"
                  />
                  <a href="#" className="text-[#1a73e8] text-sm font-medium mt-2 inline-block hover:underline">Forgot email?</a>
                </div>

                <div className="text-[#5f6368] text-sm mb-12">
                  Not your computer? Use Guest mode to sign in privately. <a href="#" className="text-[#1a73e8] font-medium hover:underline">Learn more</a>
                </div>

                <div className="flex justify-between items-center mt-auto">
                  <button type="button" onClick={() => setShowGoogleModal(false)} className="text-[#1a73e8] text-sm font-medium hover:bg-[#f3f8ff] px-4 py-2 rounded transition-colors">
                    Create account
                  </button>
                  <button type="submit" className="bg-[#1a73e8] hover:bg-[#1557b0] text-white text-sm font-medium px-6 py-2.5 rounded transition-colors">
                    Next
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
