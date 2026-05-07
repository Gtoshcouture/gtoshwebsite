'use client';

import { useState } from 'react';
import { useAdminStore } from '@/lib/adminStore';

export default function Reviews() {
  const { reviews, toggleReviewPublished, deleteReview } = useAdminStore();
  const [filter, setFilter] = useState<'all' | 'published' | 'unpublished'>('all');
  const [confirm, setConfirm] = useState<string | null>(null);

  const filtered = filter === 'all' ? reviews : filter === 'published' ? reviews.filter(r => r.published) : reviews.filter(r => !r.published);
  const avg = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : '0';

  return (
    <div>
      <h1 className="text-2xl text-white font-medium mb-2">Reviews</h1>
      <p className="text-[13px] text-white/40 mb-8">{reviews.length} reviews · {avg} average rating · {reviews.filter(r => r.published).length} published</p>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {(['all', 'published', 'unpublished'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-[13px] capitalize ${filter === f ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/60'}`}>
            {f} ({f === 'all' ? reviews.length : f === 'published' ? reviews.filter(r => r.published).length : reviews.filter(r => !r.published).length})
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {filtered.map(r => (
          <div key={r.id} className={`bg-white/5 border rounded-xl p-5 ${r.published ? 'border-white/5' : 'border-yellow-500/20'}`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(s => (
                      <span key={s} className={`text-sm ${s <= r.rating ? 'text-yellow-400' : 'text-white/10'}`}>★</span>
                    ))}
                  </div>
                  <span className="text-[13px] text-white">{r.author}</span>
                  {r.verified && <span className="text-[10px] bg-green-500/15 text-green-400 px-1.5 py-0.5 rounded">Verified</span>}
                </div>
                <p className="text-[12px] text-white/30">{r.productName} · {r.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => toggleReviewPublished(r.id)}
                  className={`px-3 py-1.5 rounded-lg text-[12px] transition-colors ${r.published ? 'bg-green-500/15 text-green-400 hover:bg-green-500/25' : 'bg-yellow-500/15 text-yellow-400 hover:bg-yellow-500/25'}`}>
                  {r.published ? 'Published' : 'Unpublished'}
                </button>
                {confirm === r.id ? (
                  <div className="flex gap-1">
                    <button onClick={() => { deleteReview(r.id); setConfirm(null); }} className="px-2 py-1.5 rounded-lg text-[12px] bg-red-500/15 text-red-400">Delete</button>
                    <button onClick={() => setConfirm(null)} className="px-2 py-1.5 rounded-lg text-[12px] text-white/30">No</button>
                  </div>
                ) : (
                  <button onClick={() => setConfirm(r.id)} className="px-2 py-1.5 rounded-lg text-[12px] text-red-400/40 hover:text-red-400">×</button>
                )}
              </div>
            </div>
            <p className="text-[13px] text-white/70 leading-relaxed">{r.text}</p>
            <p className="text-[11px] text-white/20 mt-2">{r.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
