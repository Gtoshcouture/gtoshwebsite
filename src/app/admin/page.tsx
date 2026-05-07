'use client';

import { useState } from 'react';
import { useAdminStore } from '@/lib/adminStore';
import Overview from './Overview';
import GettingPaid from './GettingPaid';
import Sales from './Sales';
import StoreProducts from './StoreProducts';
import CMS from './CMS';
import Reviews from './Reviews';
import AdminSettings from './AdminSettings';

type Tab = 'overview' | 'getting-paid' | 'sales' | 'products' | 'cms' | 'reviews' | 'settings';

const navItems: { key: Tab; label: string }[] = [
  { key: 'overview', label: 'Dashboard' },
  { key: 'getting-paid', label: 'Getting Paid' },
  { key: 'sales', label: 'Sales' },
  { key: 'products', label: 'Store Products' },
  { key: 'cms', label: 'CMS' },
  { key: 'reviews', label: 'Reviews' },
  { key: 'settings', label: 'Settings' },
];

export default function AdminPage() {
  const { isLoggedIn, login, logout } = useAdminStore();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#111] flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-10">
            <h1 className="font-['Playfair_Display',serif] italic text-3xl text-white mb-2">gtosh.</h1>
            <p className="text-[13px] text-white/40">Admin Portal</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); if (!login(password)) setError(true); }} className="flex flex-col gap-5">
            <input type="password" value={password} onChange={(e) => { setPassword(e.target.value); setError(false); }}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3.5 text-[13px] text-white placeholder-white/30 focus:outline-none focus:border-white/30" placeholder="Password" />
            {error && <p className="text-[13px] text-red-400">Incorrect password</p>}
            <button type="submit" className="bg-white text-[#111] rounded-lg py-3.5 text-[13px] font-medium hover:bg-white/90 transition-colors">Sign In</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111] flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-60 bg-[#161616] border-r border-white/5 min-h-screen fixed left-0 top-0">
        <div className="px-5 py-5 border-b border-white/5 flex items-center gap-2">
          <span className="font-['Playfair_Display',serif] italic text-xl text-white">gtosh.</span>
          <span className="text-[11px] text-white/25 mt-1">admin</span>
        </div>
        <nav className="flex-1 px-3 py-3 flex flex-col gap-0.5 overflow-y-auto">
          {navItems.map(({ key, label }) => (
            <button key={key} onClick={() => setActiveTab(key)}
              className={`text-left px-3 py-2.5 rounded-lg text-[13px] transition-all ${activeTab === key ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/70 hover:bg-white/5'}`}>
              {label}
            </button>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-white/5">
          <a href="/" className="block px-3 py-2 text-[13px] text-white/30 hover:text-white/50 transition-colors mb-1">← Back to site</a>
          <button onClick={logout} className="w-full text-left px-3 py-2 text-[13px] text-white/30 hover:text-white/50 transition-colors">Sign Out</button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-[#161616] border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-3">
          <span className="font-['Playfair_Display',serif] italic text-lg text-white">gtosh.</span>
          <button onClick={logout} className="text-[12px] text-white/30">Sign Out</button>
        </div>
        <div className="flex overflow-x-auto hide-scrollbar px-2 pb-2 gap-1">
          {navItems.map(({ key, label }) => (
            <button key={key} onClick={() => setActiveTab(key)}
              className={`flex-shrink-0 px-3 py-2 rounded-lg text-[12px] whitespace-nowrap transition-all ${activeTab === key ? 'bg-white/10 text-white' : 'text-white/30'}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Main */}
      <main className="flex-1 md:ml-60 pt-[84px] md:pt-0 min-h-screen">
        <div className="p-5 md:p-8 max-w-[1100px]">
          {activeTab === 'overview' && <Overview />}
          {activeTab === 'getting-paid' && <GettingPaid />}
          {activeTab === 'sales' && <Sales />}
          {activeTab === 'products' && <StoreProducts />}
          {activeTab === 'cms' && <CMS />}
          {activeTab === 'reviews' && <Reviews />}
          {activeTab === 'settings' && <AdminSettings />}
        </div>
      </main>
    </div>
  );
}
