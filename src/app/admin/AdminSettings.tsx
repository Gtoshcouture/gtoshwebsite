'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { useAdminStore } from '@/lib/adminStore';

type SettingsTab = 'media' | 'shipping' | 'payments' | 'taxes';

export default function AdminSettings() {
  const [tab, setTab] = useState<SettingsTab>('payments');

  return (
    <div>
      <h1 className="text-2xl text-white font-medium mb-6">Settings</h1>
      <div className="flex gap-1 mb-6 flex-wrap">
        {(['payments', 'shipping', 'taxes', 'media'] as SettingsTab[]).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-[13px] capitalize transition-all ${tab === t ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/60'}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'payments' && <PaymentsSettings />}
      {tab === 'shipping' && <ShippingSettings />}
      {tab === 'taxes' && <TaxSettings />}
      {tab === 'media' && <MediaManager />}
    </div>
  );
}

function PaymentsSettings() {
  const { settings, updatePaymentSettings } = useAdminStore();
  const p = settings.payments;

  return (
    <div className="flex flex-col gap-4 max-w-2xl">
      <h2 className="text-[13px] text-white/50 uppercase tracking-wider mb-2">Accept Payments</h2>

      {/* Stripe */}
      <div className={`border rounded-xl p-5 ${p.stripeEnabled ? 'border-green-500/20 bg-green-500/5' : 'border-white/5 bg-white/5'}`}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[13px] text-white font-medium">Stripe</p>
            <p className="text-[12px] text-white/40">Credit/debit cards</p>
          </div>
          <Toggle checked={p.stripeEnabled} onChange={(v) => updatePaymentSettings({ stripeEnabled: v })} />
        </div>
        {p.stripeEnabled && (
          <div>
            <p className="text-[12px] text-white/40 mb-1">Secret Key</p>
            <input type="password" value={p.stripeKey} onChange={e => updatePaymentSettings({ stripeKey: e.target.value })}
              placeholder="sk_live_..." className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-[13px] text-white focus:outline-none" />
          </div>
        )}
      </div>

      {/* Apple Pay */}
      <div className={`border rounded-xl p-5 ${p.applePayEnabled ? 'border-green-500/20 bg-green-500/5' : 'border-white/5 bg-white/5'}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[13px] text-white font-medium">Apple Pay</p>
            <p className="text-[12px] text-white/40">Requires Stripe to be enabled</p>
          </div>
          <Toggle checked={p.applePayEnabled} onChange={(v) => updatePaymentSettings({ applePayEnabled: v })} />
        </div>
      </div>

      {/* PayPal */}
      <div className={`border rounded-xl p-5 ${p.paypalEnabled ? 'border-green-500/20 bg-green-500/5' : 'border-white/5 bg-white/5'}`}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[13px] text-white font-medium">PayPal</p>
            <p className="text-[12px] text-white/40">PayPal checkout</p>
          </div>
          <Toggle checked={p.paypalEnabled} onChange={(v) => updatePaymentSettings({ paypalEnabled: v })} />
        </div>
        {p.paypalEnabled && (
          <div>
            <p className="text-[12px] text-white/40 mb-1">PayPal Email</p>
            <input value={p.paypalEmail} onChange={e => updatePaymentSettings({ paypalEmail: e.target.value })}
              placeholder="your@paypal.com" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-[13px] text-white focus:outline-none" />
          </div>
        )}
      </div>

      {/* Afterpay */}
      <div className={`border rounded-xl p-5 ${p.afterpayEnabled ? 'border-green-500/20 bg-green-500/5' : 'border-white/5 bg-white/5'}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[13px] text-white font-medium">Afterpay / Clearpay</p>
            <p className="text-[12px] text-white/40">Buy now, pay later</p>
          </div>
          <Toggle checked={p.afterpayEnabled} onChange={(v) => updatePaymentSettings({ afterpayEnabled: v })} />
        </div>
      </div>
    </div>
  );
}

function ShippingSettings() {
  const { shippingProfiles, addShippingProfile, updateShippingProfile, deleteShippingProfile } = useAdminStore();
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState('');
  const [rate, setRate] = useState('');
  const [days, setDays] = useState('');

  const handleAdd = () => {
    if (name) {
      addShippingProfile({ id: `sh-${Date.now()}`, name, type: parseFloat(rate) === 0 ? 'free' : 'flat', rate: parseFloat(rate) || 0, estimatedDays: days || '3-5 days', appliesTo: ['all'] });
      setName(''); setRate(''); setDays(''); setShowAdd(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[13px] text-white/50 uppercase tracking-wider">Shipping Profiles</h2>
        <button onClick={() => setShowAdd(!showAdd)} className="bg-white text-[#111] rounded-lg px-4 py-2 text-[13px] font-medium">+ Add Profile</button>
      </div>

      {showAdd && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
            <div><p className="text-[12px] text-white/40 mb-1">Name</p><input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. International" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-[13px] text-white focus:outline-none" /></div>
            <div><p className="text-[12px] text-white/40 mb-1">Rate ($)</p><input value={rate} onChange={e => setRate(e.target.value)} placeholder="0 for free" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-[13px] text-white focus:outline-none" /></div>
            <div><p className="text-[12px] text-white/40 mb-1">Estimated Days</p><input value={days} onChange={e => setDays(e.target.value)} placeholder="3-5 business days" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-[13px] text-white focus:outline-none" /></div>
          </div>
          <button onClick={handleAdd} className="mt-3 bg-white text-[#111] rounded-lg px-5 py-2 text-[13px] font-medium">Add</button>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {shippingProfiles.map(s => (
          <div key={s.id} className="bg-white/5 border border-white/5 rounded-xl p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[13px] text-white font-medium">{s.name}</p>
                <p className="text-[12px] text-white/40">{s.type === 'free' ? 'Free shipping' : `$${s.rate}`} · {s.estimatedDays}</p>
                {s.freeAbove && <p className="text-[11px] text-green-400/70 mt-1">Free above ${s.freeAbove}</p>}
                <p className="text-[11px] text-white/25 mt-1">Applies to: {s.appliesTo.join(', ')}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => updateShippingProfile(s.id, { rate: s.rate === 0 ? 15 : 0, type: s.rate === 0 ? 'flat' : 'free' })}
                  className="text-[12px] text-white/30 bg-white/5 rounded-lg px-3 py-1.5 hover:bg-white/10">Toggle Rate</button>
                <button onClick={() => deleteShippingProfile(s.id)} className="text-[12px] text-red-400/40 hover:text-red-400">×</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TaxSettings() {
  const { settings, updateTaxSettings } = useAdminStore();
  const t = settings.tax;

  return (
    <div className="max-w-2xl flex flex-col gap-5">
      <h2 className="text-[13px] text-white/50 uppercase tracking-wider">Tax Configuration</h2>

      <div className={`border rounded-xl p-5 ${t.enabled ? 'border-green-500/20 bg-green-500/5' : 'border-white/5 bg-white/5'}`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[13px] text-white font-medium">Collect Tax</p>
            <p className="text-[12px] text-white/40">Automatically calculate tax on orders</p>
          </div>
          <Toggle checked={t.enabled} onChange={(v) => updateTaxSettings({ enabled: v })} />
        </div>

        {t.enabled && (
          <div className="flex flex-col gap-4 border-t border-white/5 pt-4">
            <div>
              <p className="text-[12px] text-white/40 mb-1">Tax Rate (%)</p>
              <input type="number" value={t.rate} onChange={e => updateTaxSettings({ rate: parseFloat(e.target.value) || 0 })}
                className="w-32 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-[13px] text-white focus:outline-none" />
            </div>
            <label className="flex items-center gap-3 text-[13px] text-white/60">
              <input type="checkbox" checked={t.includedInPrice} onChange={e => updateTaxSettings({ includedInPrice: e.target.checked })} className="accent-white" />
              Tax included in displayed price
            </label>
            <div>
              <p className="text-[12px] text-white/40 mb-2">Taxable Categories</p>
              <div className="flex gap-2">
                {['clothing', 'bags'].map(cat => (
                  <button key={cat} onClick={() => {
                    const cats = t.taxableCategories.includes(cat) ? t.taxableCategories.filter(c => c !== cat) : [...t.taxableCategories, cat];
                    updateTaxSettings({ taxableCategories: cats });
                  }} className={`px-3 py-1.5 rounded-lg text-[12px] capitalize ${t.taxableCategories.includes(cat) ? 'bg-white/10 text-white' : 'bg-white/5 text-white/30'}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MediaManager() {
  const { media, addMedia, deleteMedia } = useAdminStore();
  const [showAdd, setShowAdd] = useState(false);
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    if (url && name) {
      addMedia({ id: `m-${Date.now()}`, url, name, type: url.match(/\.(mp4|webm|mov)/i) ? 'video' : 'image', uploadedAt: new Date().toISOString().split('T')[0] });
      setUrl(''); setName(''); setShowAdd(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          addMedia({
            id: `m-${Date.now()}`,
            url: reader.result,
            name: file.name,
            type: file.type.startsWith('video/') ? 'video' : 'image',
            uploadedAt: new Date().toISOString().split('T')[0],
            size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          });
        }
      };
      reader.readAsDataURL(file);
    });
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[13px] text-white/50 uppercase tracking-wider">Media Manager</h2>
        <div className="flex gap-2">
          <button onClick={() => fileRef.current?.click()} className="bg-white/10 text-white rounded-lg px-4 py-2 text-[13px] hover:bg-white/15 transition-colors">Upload File</button>
          <button onClick={() => setShowAdd(!showAdd)} className="bg-white text-[#111] rounded-lg px-4 py-2 text-[13px] font-medium">+ Add by URL</button>
          <input ref={fileRef} type="file" accept="image/*,video/*" multiple onChange={handleFileUpload} className="hidden" />
        </div>
      </div>

      {showAdd && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-end">
            <div><p className="text-[12px] text-white/40 mb-1">URL</p><input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://..." className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-[13px] text-white focus:outline-none" /></div>
            <div><p className="text-[12px] text-white/40 mb-1">File Name</p><input value={name} onChange={e => setName(e.target.value)} placeholder="product-photo.jpg" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-[13px] text-white focus:outline-none" /></div>
          </div>
          <button onClick={handleAdd} className="mt-3 bg-white text-[#111] rounded-lg px-5 py-2 text-[13px] font-medium">Add</button>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {media.map(m => (
          <div key={m.id} className="group relative bg-white/5 border border-white/5 rounded-xl overflow-hidden">
            <div className="relative aspect-square">
              {m.url.startsWith('data:') ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={m.url} alt={m.name} className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <Image src={m.url} alt={m.name} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
              )}
              <button onClick={() => deleteMedia(m.id)} className="absolute top-2 right-2 w-6 h-6 bg-black/60 text-white/60 rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">×</button>
            </div>
            <div className="p-3">
              <p className="text-[12px] text-white/60 truncate">{m.name}</p>
              <p className="text-[11px] text-white/25">{m.uploadedAt}{m.size ? ` · ${m.size}` : ''}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!checked)} className={`w-10 h-5 rounded-full transition-colors relative ${checked ? 'bg-green-500' : 'bg-white/15'}`}>
      <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${checked ? 'left-[22px]' : 'left-0.5'}`} />
    </button>
  );
}
