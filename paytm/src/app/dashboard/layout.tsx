'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Shield, LayoutDashboard, Activity, Plug } from 'lucide-react';
import { PLATFORMS } from '@/lib/dashboard-data';
import ConnectPlatformsModal from '@/components/ConnectPlatformsModal';

// ============================================================
// Dashboard Layout — Clean sidebar with proper platform names
// ============================================================

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [connectModalOpen, setConnectModalOpen] = useState(false);
  const [merchantName, setMerchantName] = useState('Merchant');
  const [merchantInitials, setMerchantInitials] = useState('ME');

  useEffect(() => {
    // If the user's name is saved in localStorage, use it or fallback to 'Merchant'
    const storedName = localStorage.getItem('merchantName') || 'Merchant';
    setMerchantName(storedName);
    setMerchantInitials(storedName.substring(0, 2).toUpperCase());
  }, []);

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/dashboard/agent', label: 'Live Agent', icon: Activity },
  ];

  return (
    <div className="fixed inset-0 bg-bg-primary flex">
      {/* Sidebar */}
      <aside className="w-[220px] flex-shrink-0 border-r border-border bg-bg-secondary/50 flex flex-col">
        {/* Logo */}
        <div className="px-4 py-4 border-b border-border">
          <Link href="/" className="flex items-center gap-2 no-underline">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(139,92,246,0.05))', border: '1px solid rgba(139,92,246,0.25)' }}>
              <Shield className="w-4 h-4 text-accent-purple" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-text-primary text-sm font-bold tracking-wide">SETTLE</span>
              <span className="text-accent-purple text-xs font-bold" style={{ fontFamily: 'var(--font-mono)' }}>GUARD</span>
            </div>
          </Link>
        </div>

        {/* Agent status */}
        <div className="px-4 py-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: 'rgba(34,197,94,0.04)', border: '1px solid rgba(34,197,94,0.12)' }}>
            <div className="w-2 h-2 rounded-full bg-accent-green pulse-dot" />
            <span className="text-accent-green text-[10px] font-bold uppercase tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>Agent Active</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-1">
          {navItems.map(item => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 no-underline transition-all duration-200"
                style={{
                  background: isActive ? 'rgba(139,92,246,0.06)' : 'transparent',
                  color: isActive ? '#8b5cf6' : '#8b919e',
                  border: isActive ? '1px solid rgba(139,92,246,0.12)' : '1px solid transparent',
                }}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}

          {/* Connected platforms — with proper names */}
          <div className="mt-6 px-2">
            <p className="text-text-muted text-[9px] font-semibold uppercase tracking-wider mb-3" style={{ fontFamily: 'var(--font-mono)' }}>Connected Platforms</p>
            <div className="flex flex-col gap-1.5">
              {PLATFORMS.map(p => (
                <div
                  key={p.id}
                  className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg transition-all duration-200"
                  style={{ background: 'rgba(255,255,255,0.01)' }}
                >
                  <span className="text-sm">{p.icon}</span>
                  <span className="text-text-secondary text-xs font-medium flex-1 truncate">{p.name}</span>
                  <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                    p.status === 'connected' ? 'bg-accent-green' : p.status === 'syncing' ? 'bg-accent-amber pulse-dot' : 'bg-accent-red'
                  }`} />
                </div>
              ))}
            </div>

            {/* Connect Platforms trigger — ADD-ON */}
            <button
              onClick={() => setConnectModalOpen(true)}
              className="cp-trigger-btn mt-3"
            >
              <div className="cp-trigger-icon" />
              <Plug className="w-3.5 h-3.5" />
              Connect Platforms
            </button>
          </div>
        </nav>

        {/* Bottom — merchant */}
        <div className="px-4 py-3 border-t border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: 'rgba(139,92,246,0.15)', color: '#8B5CF6', border: '1px solid rgba(139,92,246,0.2)' }}>
              {merchantInitials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-text-primary text-xs font-medium truncate m-0">{merchantName}&apos;s Store</p>
              <p className="text-text-muted text-[9px] m-0" style={{ fontFamily: 'var(--font-mono)' }}>Paytm Business</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>

      {/* Connect Platforms Modal — ADD-ON */}
      <ConnectPlatformsModal
        isOpen={connectModalOpen}
        onClose={() => setConnectModalOpen(false)}
      />
    </div>
  );
}
