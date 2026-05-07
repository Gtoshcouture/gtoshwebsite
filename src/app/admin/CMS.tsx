'use client';

import { useState } from 'react';
import { useAdminStore } from '@/lib/adminStore';

export default function CMS() {
  const { subscribers, deleteSubscriber, tagSubscriber, addSubscriber } = useAdminStore();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showCompose, setShowCompose] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [filter, setFilter] = useState('all');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [sent, setSent] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');

  const filtered = filter === 'all' ? subscribers : subscribers.filter(s => s.tags.includes(filter));
  const allSelected = filtered.length > 0 && filtered.every(s => selected.has(s.id));

  const toggleAll = () => {
    if (allSelected) setSelected(new Set());
    else setSelected(new Set(filtered.map(s => s.id)));
  };

  const toggle = (id: string) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };

  const handleSend = () => {
    if (subject && body && selected.size > 0) { setSent(true); setTimeout(() => setSent(false), 3000); setShowCompose(false); setSubject(''); setBody(''); }
  };

  const handleAdd = () => {
    if (newEmail) {
      addSubscriber({ id: `s-${Date.now()}`, email: newEmail, name: newName || undefined, source: 'Manual', joinedAt: new Date().toISOString().split('T')[0], tags: ['subscriber'] });
      setNewEmail(''); setNewName(''); setShowAdd(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl text-white font-medium">CMS — Email List</h1>
          <p className="text-[13px] text-white/40 mt-1">{subscribers.length} contacts</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowAdd(!showAdd)} className="bg-white/10 text-white rounded-lg px-4 py-2 text-[13px] hover:bg-white/15 transition-colors">+ Add</button>
          <button onClick={() => setShowCompose(!showCompose)} disabled={selected.size === 0}
            className={`rounded-lg px-4 py-2 text-[13px] font-medium transition-colors ${selected.size > 0 ? 'bg-white text-[#111] hover:bg-white/90' : 'bg-white/5 text-white/20 cursor-not-allowed'}`}>
            Send Email ({selected.size})
          </button>
        </div>
      </div>

      {sent && (
        <div className="bg-green-500/10 border border-green-500/20 rounded-xl px-5 py-3 mb-4 text-[13px] text-green-400">
          ✓ Email sent to {selected.size} recipients
        </div>
      )}

      {/* Add subscriber */}
      {showAdd && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
            <div>
              <p className="text-[12px] text-white/40 mb-2">Email</p>
              <input value={newEmail} onChange={e => setNewEmail(e.target.value)} placeholder="email@example.com" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-[13px] text-white focus:outline-none" />
            </div>
            <div>
              <p className="text-[12px] text-white/40 mb-2">Name (optional)</p>
              <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Full name" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-[13px] text-white focus:outline-none" />
            </div>
            <button onClick={handleAdd} className="bg-white text-[#111] rounded-lg py-2.5 text-[13px] font-medium">Add Contact</button>
          </div>
        </div>
      )}

      {/* Compose */}
      {showCompose && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-4">
          <p className="text-[13px] text-white mb-4">Compose Email to {selected.size} recipient{selected.size > 1 ? 's' : ''}</p>
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-[12px] text-white/40 mb-1">Subject</p>
              <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Subject line" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-[13px] text-white focus:outline-none" />
            </div>
            <div>
              <p className="text-[12px] text-white/40 mb-1">Body</p>
              <textarea value={body} onChange={e => setBody(e.target.value)} rows={6} placeholder="Write your message..." className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-[13px] text-white focus:outline-none resize-none" />
            </div>
            <div className="flex gap-2">
              <button onClick={handleSend} className="bg-white text-[#111] rounded-lg px-6 py-2.5 text-[13px] font-medium">Send</button>
              <button onClick={() => setShowCompose(false)} className="bg-white/5 text-white/40 rounded-lg px-6 py-2.5 text-[13px]">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        {['all', 'subscriber', 'customer', 'vip'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded text-[12px] capitalize ${filter === f ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/50'}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white/5 border border-white/5 rounded-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center px-5 py-3 border-b border-white/5 text-[12px] text-white/30">
          <input type="checkbox" checked={allSelected} onChange={toggleAll} className="mr-4 accent-white" />
          <span className="flex-1">Email</span>
          <span className="w-32 hidden md:block">Source</span>
          <span className="w-28 hidden md:block">Date</span>
          <span className="w-24">Tags</span>
          <span className="w-10"></span>
        </div>
        {filtered.map((s) => (
          <div key={s.id} className="flex items-center px-5 py-3 border-t border-white/5 hover:bg-white/[0.02]">
            <input type="checkbox" checked={selected.has(s.id)} onChange={() => toggle(s.id)} className="mr-4 accent-white" />
            <div className="flex-1 min-w-0">
              <p className="text-[13px] text-white truncate">{s.email}</p>
              {s.name && <p className="text-[12px] text-white/30">{s.name}</p>}
            </div>
            <span className="w-32 text-[12px] text-white/30 hidden md:block">{s.source}</span>
            <span className="w-28 text-[12px] text-white/30 hidden md:block">{s.joinedAt}</span>
            <div className="w-24 flex gap-1 flex-wrap">
              {s.tags.map(t => (
                <button key={t} onClick={() => tagSubscriber(s.id, t)} className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/50 hover:bg-white/15">{t}</button>
              ))}
            </div>
            <button onClick={() => deleteSubscriber(s.id)} className="w-10 text-center text-red-400/40 hover:text-red-400 text-sm">×</button>
          </div>
        ))}
      </div>
    </div>
  );
}
