'use client';

import { useState } from 'react';
import { useAdminStore, PaymentLink } from '@/lib/adminStore';

export default function GettingPaid() {
  const { orders, payouts, paymentLinks, addPaymentLink, deletePaymentLink } = useAdminStore();
  const [showCreate, setShowCreate] = useState(false);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  const totalEarned = orders.filter(o => o.paymentStatus === 'paid' && o.status !== 'cancelled').reduce((s, o) => s + o.total, 0);
  const pendingPayout = payouts.filter(p => p.status === 'pending').reduce((s, p) => s + p.amount, 0);

  const createLink = () => {
    if (!title || !amount) return;
    const link: PaymentLink = {
      id: `pl-${Date.now()}`, title, amount: parseFloat(amount), currency: 'USD',
      url: `https://pay.gtosh.com/${Date.now().toString(36)}`, status: 'active', createdAt: new Date().toISOString(),
    };
    addPaymentLink(link);
    setTitle(''); setAmount(''); setShowCreate(false);
  };

  return (
    <div>
      <h1 className="text-2xl text-white font-medium mb-8">Getting Paid</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
        <Stat label="Total Earned" value={`$${totalEarned.toLocaleString()}`} sub={`${orders.filter(o => o.paymentStatus === 'paid').length} payments`} />
        <Stat label="Pending Payout" value={`$${pendingPayout.toLocaleString()}`} sub="Next payout cycle" />
        <Stat label="Payment Links" value={paymentLinks.length} sub={`${paymentLinks.filter(l => l.status === 'active').length} active`} />
      </div>

      {/* Payment Links */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[13px] text-white/50 uppercase tracking-wider">Payment Links</h2>
        <button onClick={() => setShowCreate(!showCreate)} className="bg-white text-[#111] rounded-lg px-4 py-2 text-[13px] font-medium hover:bg-white/90 transition-colors">
          + Create Link
        </button>
      </div>

      {showCreate && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
            <div>
              <p className="text-[12px] text-white/40 mb-2">Title</p>
              <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Custom order for Amara"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-[13px] text-white focus:outline-none" />
            </div>
            <div>
              <p className="text-[12px] text-white/40 mb-2">Amount ($)</p>
              <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-[13px] text-white focus:outline-none" />
            </div>
            <button onClick={createLink} className="bg-white text-[#111] rounded-lg py-2.5 text-[13px] font-medium">Generate Link</button>
          </div>
        </div>
      )}

      <div className="bg-white/5 border border-white/5 rounded-xl overflow-hidden mb-8">
        {paymentLinks.length === 0 ? (
          <p className="px-5 py-8 text-center text-[13px] text-white/30">No payment links yet. Create one to send to customers for custom orders.</p>
        ) : paymentLinks.map((l, i) => (
          <div key={l.id} className={`flex items-center justify-between px-5 py-4 ${i > 0 ? 'border-t border-white/5' : ''}`}>
            <div>
              <p className="text-[13px] text-white">{l.title}</p>
              <p className="text-[12px] text-white/30 mt-0.5">{l.url}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[13px] text-white">${l.amount}</span>
              <span className={`text-[11px] px-2 py-0.5 rounded ${l.status === 'active' ? 'bg-green-500/15 text-green-400' : l.status === 'paid' ? 'bg-blue-500/15 text-blue-400' : 'bg-white/10 text-white/40'}`}>{l.status}</span>
              <button onClick={() => navigator.clipboard.writeText(l.url)} className="text-[12px] text-white/30 hover:text-white/60">Copy</button>
              <button onClick={() => deletePaymentLink(l.id)} className="text-[12px] text-red-400/50 hover:text-red-400">×</button>
            </div>
          </div>
        ))}
      </div>

      {/* Payouts */}
      <h2 className="text-[13px] text-white/50 uppercase tracking-wider mb-4">Payouts</h2>
      <div className="bg-white/5 border border-white/5 rounded-xl overflow-hidden">
        {payouts.map((p, i) => (
          <div key={p.id} className={`flex items-center justify-between px-5 py-4 ${i > 0 ? 'border-t border-white/5' : ''}`}>
            <div>
              <p className="text-[13px] text-white">${p.amount.toLocaleString()}</p>
              <p className="text-[12px] text-white/30">{p.destination}</p>
            </div>
            <div className="text-right">
              <p className="text-[12px] text-white/40">{new Date(p.date).toLocaleDateString()}</p>
              <span className={`text-[11px] ${p.status === 'completed' ? 'text-green-400' : p.status === 'pending' ? 'text-yellow-400' : 'text-red-400'}`}>{p.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string | number; sub: string }) {
  return (
    <div className="bg-white/5 border border-white/5 rounded-xl p-5">
      <p className="text-[12px] text-white/40 mb-1">{label}</p>
      <p className="text-2xl text-white font-medium">{value}</p>
      <p className="text-[12px] text-white/30 mt-1">{sub}</p>
    </div>
  );
}
