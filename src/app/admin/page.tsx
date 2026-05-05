'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useAdminStore, Order } from '@/lib/adminStore';
import { Product } from '@/lib/products';

type Tab = 'overview' | 'products' | 'orders';

export default function AdminPage() {
  const { isLoggedIn, login, logout } = useAdminStore();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#F7F3EC] flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-10">
            <h1 className="font-['Playfair_Display',serif] text-4xl text-[#3E2A1E] mb-2">GTOSH</h1>
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#9B7B68]">Studio Dashboard</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); if (!login(password)) setError(true); }} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] tracking-[0.2em] uppercase text-[#9B7B68]">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(false); }}
                className="bg-transparent border-b border-[#6B4C3B]/30 py-3 text-sm text-[#3E2A1E] focus:outline-none focus:border-[#6B4C3B] transition-colors"
                placeholder="Enter admin password"
              />
              {error && <p className="text-xs text-[#7A2020]">Incorrect password</p>}
            </div>
            <button type="submit" className="bg-[#3E2A1E] text-[#F7F3EC] py-4 text-[11px] tracking-[0.3em] uppercase hover:bg-[#6B4C3B] transition-colors">
              Enter
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <AdminDashboard onLogout={logout} />;
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>('overview');
  const { products, orders } = useAdminStore();

  const lowStock = products.filter((p) => p.quantity !== undefined && p.quantity <= 4);
  const pendingOrders = orders.filter((o) => o.status === 'pending' || o.status === 'processing');

  return (
    <div className="min-h-screen bg-[#F7F3EC]">
      {/* Top bar */}
      <div className="bg-[#3E2A1E] px-6 md:px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <span className="font-['Playfair_Display',serif] text-xl tracking-[0.3em] text-[#F7F3EC]">GTOSH</span>
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#9B7B68]">Studio</span>
        </div>
        <button onClick={onLogout} className="text-[11px] tracking-[0.2em] uppercase text-[#9B7B68] hover:text-[#F7F3EC] transition-colors">
          Sign Out
        </button>
      </div>

      {/* Nav tabs */}
      <div className="bg-[#F7F3EC] border-b border-[#6B4C3B]/10 px-6 md:px-10">
        <div className="flex gap-8">
          {(['overview', 'products', 'orders'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`py-4 text-[11px] tracking-[0.2em] uppercase border-b-2 transition-all ${
                tab === t ? 'border-[#3E2A1E] text-[#3E2A1E]' : 'border-transparent text-[#9B7B68] hover:text-[#6B4C3B]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-10">
        {tab === 'overview' && <OverviewTab lowStock={lowStock} pendingOrders={pendingOrders} orders={orders} />}
        {tab === 'products' && <ProductsTab />}
        {tab === 'orders' && <OrdersTab />}
      </div>
    </div>
  );
}

function OverviewTab({ lowStock, pendingOrders, orders }: { lowStock: Product[]; pendingOrders: Order[]; orders: Order[] }) {
  const total = orders.reduce((s, o) => s + o.total, 0);
  return (
    <div className="flex flex-col gap-10">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Orders', value: orders.length },
          { label: 'Pending', value: pendingOrders.length, alert: pendingOrders.length > 0 },
          { label: 'Low Stock', value: lowStock.length, alert: lowStock.length > 0 },
          { label: 'Revenue', value: `$${total.toLocaleString()}` },
        ].map(({ label, value, alert }) => (
          <div key={label} className={`border p-6 ${alert ? 'border-[#7A2020]/30 bg-[#7A2020]/5' : 'border-[#6B4C3B]/10 bg-white'}`}>
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#9B7B68] mb-2">{label}</p>
            <p className={`font-['Playfair_Display',serif] text-3xl ${alert ? 'text-[#7A2020]' : 'text-[#3E2A1E]'}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Low stock alerts */}
      {lowStock.length > 0 && (
        <div>
          <h2 className="font-['Playfair_Display',serif] text-xl text-[#3E2A1E] mb-5">⚠ Low Stock</h2>
          <div className="flex flex-col gap-3">
            {lowStock.map((p) => (
              <div key={p.id} className="flex items-center justify-between border border-[#7A2020]/20 bg-[#7A2020]/5 px-5 py-4">
                <span className="text-sm text-[#3E2A1E]">{p.name}</span>
                <span className="text-xs text-[#7A2020] font-medium">{p.quantity} left</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent orders */}
      <div>
        <h2 className="font-['Playfair_Display',serif] text-xl text-[#3E2A1E] mb-5">Recent Orders</h2>
        <div className="flex flex-col gap-3">
          {orders.slice(0, 5).map((o) => (
            <div key={o.id} className="flex items-center justify-between border border-[#6B4C3B]/10 bg-white px-5 py-4">
              <div>
                <p className="text-sm text-[#3E2A1E]">{o.customer}</p>
                <p className="text-[11px] text-[#9B7B68]">{o.id} · {o.date}</p>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-sm text-[#3E2A1E]">${o.total}</span>
                <StatusBadge status={o.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductsTab() {
  const { products, updateProduct } = useAdminStore();
  const [editing, setEditing] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Product>>({});

  const startEdit = (p: Product) => {
    setEditing(p.id);
    setEditData({ price: p.price, quantity: p.quantity, inStock: p.inStock });
  };

  const saveEdit = (id: string) => {
    updateProduct(id, editData);
    setEditing(null);
  };

  return (
    <div>
      <h2 className="font-['Playfair_Display',serif] text-2xl text-[#3E2A1E] mb-8">Products</h2>
      <div className="flex flex-col gap-4">
        {products.map((p) => (
          <div key={p.id} className="border border-[#6B4C3B]/10 bg-white">
            <div className="flex items-center gap-5 p-5">
              <div className="relative w-14 h-16 flex-shrink-0 bg-[#EDE8E0] overflow-hidden">
                <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-['Playfair_Display',serif] text-[#3E2A1E] text-lg">{p.name}</p>
                <p className="text-[11px] uppercase tracking-wide text-[#9B7B68]">{p.category}</p>
              </div>

              {editing === p.id ? (
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] uppercase tracking-widest text-[#9B7B68]">Price</label>
                    <input
                      type="number"
                      value={editData.price}
                      onChange={(e) => setEditData({ ...editData, price: +e.target.value })}
                      className="w-24 border border-[#6B4C3B]/20 px-2 py-1.5 text-sm text-[#3E2A1E] focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] uppercase tracking-widest text-[#9B7B68]">Stock</label>
                    <input
                      type="number"
                      value={editData.quantity}
                      onChange={(e) => setEditData({ ...editData, quantity: +e.target.value })}
                      className="w-20 border border-[#6B4C3B]/20 px-2 py-1.5 text-sm text-[#3E2A1E] focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] uppercase tracking-widest text-[#9B7B68]">Status</label>
                    <select
                      value={editData.inStock ? 'in' : 'out'}
                      onChange={(e) => setEditData({ ...editData, inStock: e.target.value === 'in' })}
                      className="border border-[#6B4C3B]/20 px-2 py-1.5 text-sm text-[#3E2A1E] focus:outline-none bg-white"
                    >
                      <option value="in">In Stock</option>
                      <option value="out">Sold Out</option>
                    </select>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button onClick={() => saveEdit(p.id)} className="bg-[#3E2A1E] text-[#F7F3EC] px-4 py-2 text-[10px] tracking-widest uppercase hover:bg-[#6B4C3B] transition-colors">Save</button>
                    <button onClick={() => setEditing(null)} className="border border-[#6B4C3B]/20 text-[#9B7B68] px-4 py-2 text-[10px] tracking-widest uppercase">Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm text-[#3E2A1E]">${p.price}</p>
                    <p className={`text-[11px] ${p.quantity && p.quantity <= 4 ? 'text-[#7A2020]' : 'text-[#9B7B68]'}`}>
                      {p.inStock ? `${p.quantity ?? '—'} in stock` : 'Sold Out'}
                    </p>
                  </div>
                  <button onClick={() => startEdit(p)} className="text-[10px] tracking-[0.2em] uppercase text-[#6B4C3B] border border-[#6B4C3B]/30 px-4 py-2 hover:bg-[#6B4C3B] hover:text-[#F7F3EC] transition-colors">
                    Edit
                  </button>
                </div>
              )}
            </div>

            {/* Image URL editor */}
            {editing === p.id && (
              <div className="border-t border-[#6B4C3B]/10 px-5 py-4 bg-[#F7F3EC]/50">
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#9B7B68] mb-3">Product Images (URLs)</p>
                <div className="flex flex-col gap-2">
                  {p.images.map((img, i) => (
                    <input
                      key={i}
                      type="text"
                      defaultValue={img}
                      placeholder={`Image ${i + 1} URL`}
                      className="w-full border border-[#6B4C3B]/20 px-3 py-2 text-xs text-[#3E2A1E] focus:outline-none bg-white"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function OrdersTab() {
  const { orders, updateOrderStatus } = useAdminStore();
  const [selected, setSelected] = useState<string | null>(null);
  const [tracking, setTracking] = useState('');

  const order = orders.find((o) => o.id === selected);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr,380px] gap-8">
      {/* Orders list */}
      <div>
        <h2 className="font-['Playfair_Display',serif] text-2xl text-[#3E2A1E] mb-6">Orders</h2>
        <div className="flex flex-col gap-3">
          {orders.map((o) => (
            <button
              key={o.id}
              onClick={() => { setSelected(o.id); setTracking(o.trackingNumber || ''); }}
              className={`text-left border p-5 transition-all ${
                selected === o.id ? 'border-[#3E2A1E] bg-[#3E2A1E]/5' : 'border-[#6B4C3B]/10 bg-white hover:border-[#6B4C3B]/30'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-[#3E2A1E] font-medium">{o.customer}</p>
                  <p className="text-[11px] text-[#9B7B68] mt-0.5">{o.id} · {o.date}</p>
                  <p className="text-[11px] text-[#9B7B68] mt-1">{o.items.map(i => i.name).join(', ')}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-sm text-[#3E2A1E]">${o.total}</span>
                  <StatusBadge status={o.status} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Order detail */}
      {order && (
        <div className="border border-[#6B4C3B]/10 bg-white p-6 h-fit sticky top-24">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="font-['Playfair_Display',serif] text-xl text-[#3E2A1E]">{order.customer}</h3>
              <p className="text-[11px] text-[#9B7B68]">{order.email}</p>
            </div>
            <StatusBadge status={order.status} />
          </div>

          <div className="flex flex-col gap-2 mb-6">
            <p className="text-[10px] uppercase tracking-widest text-[#9B7B68]">Items</p>
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between text-sm text-[#3E2A1E]">
                <span>{item.name} × {item.qty}</span>
                <span>${item.price}</span>
              </div>
            ))}
            <div className="flex justify-between text-sm text-[#3E2A1E] border-t border-[#6B4C3B]/10 pt-2 mt-1 font-medium">
              <span>Total</span><span>${order.total}</span>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-[10px] uppercase tracking-widest text-[#9B7B68] mb-1">Ship to</p>
            <p className="text-sm text-[#3E2A1E]">{order.address}</p>
          </div>

          {/* Status update */}
          <div className="flex flex-col gap-3">
            <p className="text-[10px] uppercase tracking-widest text-[#9B7B68]">Update Status</p>
            <div className="grid grid-cols-2 gap-2">
              {(['pending', 'processing', 'shipped', 'delivered'] as Order['status'][]).map((s) => (
                <button
                  key={s}
                  onClick={() => updateOrderStatus(order.id, s)}
                  className={`py-2.5 text-[10px] tracking-widest uppercase transition-all ${
                    order.status === s
                      ? 'bg-[#3E2A1E] text-[#F7F3EC]'
                      : 'border border-[#6B4C3B]/20 text-[#9B7B68] hover:border-[#6B4C3B]/50'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Tracking */}
            <div className="mt-2">
              <label className="text-[10px] uppercase tracking-widest text-[#9B7B68]">Tracking Number</label>
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={tracking}
                  onChange={(e) => setTracking(e.target.value)}
                  placeholder="e.g. UPS1234567890"
                  className="flex-1 border border-[#6B4C3B]/20 px-3 py-2 text-sm text-[#3E2A1E] focus:outline-none"
                />
                <button
                  onClick={() => {
                    updateOrderStatus(order.id, 'shipped', tracking);
                  }}
                  className="bg-[#3A4E3A] text-[#F7F3EC] px-4 py-2 text-[10px] tracking-widest uppercase hover:bg-[#4A6A4A] transition-colors whitespace-nowrap"
                >
                  Mark Shipped
                </button>
              </div>
              {order.trackingNumber && (
                <p className="text-[11px] text-[#3A4E3A] mt-2">✓ Tracking: {order.trackingNumber}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: Order['status'] }) {
  const styles = {
    pending: 'bg-[#9B7B68]/15 text-[#6B4C3B]',
    processing: 'bg-[#3E2A1E]/10 text-[#3E2A1E]',
    shipped: 'bg-[#3A4E3A]/15 text-[#3A4E3A]',
    delivered: 'bg-[#3A4E3A]/25 text-[#3A4E3A]',
  };
  return (
    <span className={`text-[9px] tracking-[0.2em] uppercase px-2.5 py-1 ${styles[status]}`}>
      {status}
    </span>
  );
}
