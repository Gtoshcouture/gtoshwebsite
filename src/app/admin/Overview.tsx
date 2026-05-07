'use client';

import { useAdminStore } from '@/lib/adminStore';

export default function Overview() {
  const { products, orders } = useAdminStore();

  const totalRevenue = orders.filter(o => o.status !== 'cancelled').reduce((s, o) => s + o.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'pending');
  const processingOrders = orders.filter(o => o.status === 'processing');
  const lowStock = products.filter(p => p.quantity !== undefined && p.quantity <= 4 && p.inStock);
  const outOfStock = products.filter(p => !p.inStock);
  const totalProducts = products.length;

  return (
    <div>
      <h1 className="text-2xl text-white font-medium mb-8">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { label: 'Revenue', value: `$${totalRevenue.toLocaleString()}`, sub: `${orders.length} orders` },
          { label: 'Pending', value: pendingOrders.length, sub: 'Need attention', alert: pendingOrders.length > 0 },
          { label: 'Low Stock', value: lowStock.length, sub: `${outOfStock.length} sold out`, alert: lowStock.length > 0 },
          { label: 'Products', value: totalProducts, sub: 'In catalog' },
        ].map(({ label, value, sub, alert }) => (
          <div key={label} className={`rounded-xl p-5 ${alert ? 'bg-red-500/10 border border-red-500/20' : 'bg-white/5 border border-white/5'}`}>
            <p className="text-[12px] text-white/40 mb-1">{label}</p>
            <p className={`text-2xl font-medium ${alert ? 'text-red-400' : 'text-white'}`}>{value}</p>
            <p className="text-[12px] text-white/30 mt-1">{sub}</p>
          </div>
        ))}
      </div>

      {/* Action items */}
      {(pendingOrders.length > 0 || processingOrders.length > 0 || lowStock.length > 0) && (
        <div className="mb-8">
          <h2 className="text-[13px] text-white/50 uppercase tracking-wider mb-4">Needs Attention</h2>
          <div className="flex flex-col gap-2">
            {pendingOrders.map(o => (
              <div key={o.id} className="flex items-center justify-between bg-yellow-500/10 border border-yellow-500/15 rounded-lg px-4 py-3">
                <div>
                  <p className="text-[13px] text-white">{o.customer} — {o.id}</p>
                  <p className="text-[12px] text-white/40">{o.items.map(i => i.name).join(', ')}</p>
                </div>
                <div className="text-right">
                  <p className="text-[13px] text-white">${o.total}</p>
                  <p className="text-[11px] text-yellow-400">Pending</p>
                </div>
              </div>
            ))}
            {processingOrders.map(o => (
              <div key={o.id} className="flex items-center justify-between bg-blue-500/10 border border-blue-500/15 rounded-lg px-4 py-3">
                <div>
                  <p className="text-[13px] text-white">{o.customer} — {o.id}</p>
                  <p className="text-[12px] text-white/40">Ready to ship</p>
                </div>
                <div className="text-right">
                  <p className="text-[13px] text-white">${o.total}</p>
                  <p className="text-[11px] text-blue-400">Processing</p>
                </div>
              </div>
            ))}
            {lowStock.map(p => (
              <div key={p.id} className="flex items-center justify-between bg-red-500/10 border border-red-500/15 rounded-lg px-4 py-3">
                <p className="text-[13px] text-white">{p.name}</p>
                <p className="text-[11px] text-red-400">Only {p.quantity} left</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent orders */}
      <h2 className="text-[13px] text-white/50 uppercase tracking-wider mb-4">Recent Orders</h2>
      <div className="bg-white/5 border border-white/5 rounded-xl overflow-hidden">
        {orders.slice(0, 8).map((o, i) => (
          <div key={o.id} className={`flex items-center justify-between px-5 py-4 ${i > 0 ? 'border-t border-white/5' : ''}`}>
            <div className="flex items-center gap-4">
              <StatusDot status={o.status} />
              <div>
                <p className="text-[13px] text-white">{o.customer}</p>
                <p className="text-[12px] text-white/30">{o.id} · {new Date(o.date).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[13px] text-white">${o.total}</p>
              <p className="text-[11px] text-white/40 capitalize">{o.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusDot({ status }: { status: string }) {
  const colors: Record<string, string> = {
    pending: 'bg-yellow-400',
    processing: 'bg-blue-400',
    shipped: 'bg-green-400',
    delivered: 'bg-green-600',
    cancelled: 'bg-red-400',
  };
  return <span className={`w-2 h-2 rounded-full ${colors[status] || 'bg-white/20'}`} />;
}
