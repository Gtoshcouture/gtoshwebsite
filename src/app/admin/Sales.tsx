'use client';

import { useState } from 'react';
import { useAdminStore, Order } from '@/lib/adminStore';

type SubTab = 'orders' | 'payments' | 'payouts';

export default function Sales() {
  const [subTab, setSubTab] = useState<SubTab>('orders');
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const { orders, payouts } = useAdminStore();

  return (
    <div>
      <h1 className="text-2xl text-white font-medium mb-6">Sales</h1>

      {/* Sub-tabs */}
      <div className="flex gap-1 mb-6">
        {(['orders', 'payments', 'payouts'] as SubTab[]).map(t => (
          <button key={t} onClick={() => { setSubTab(t); setSelectedOrder(null); }}
            className={`px-4 py-2 rounded-lg text-[13px] capitalize transition-all ${subTab === t ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/60'}`}>
            {t} {t === 'orders' ? `(${orders.length})` : ''}
          </button>
        ))}
      </div>

      {subTab === 'orders' && !selectedOrder && (
        <OrdersList orders={orders} onSelect={setSelectedOrder} />
      )}
      {subTab === 'orders' && selectedOrder && (
        <OrderDetail orderId={selectedOrder} onBack={() => setSelectedOrder(null)} />
      )}
      {subTab === 'payments' && <PaymentsList />}
      {subTab === 'payouts' && <PayoutsList payouts={payouts} />}
    </div>
  );
}

function OrdersList({ orders, onSelect }: { orders: Order[]; onSelect: (id: string) => void }) {
  const [filter, setFilter] = useState<string>('all');
  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  return (
    <div>
      <div className="flex gap-2 mb-4 flex-wrap">
        {['all', 'pending', 'processing', 'fulfilled', 'shipped', 'delivered', 'cancelled'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded text-[12px] capitalize ${filter === f ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/50'}`}>
            {f} ({f === 'all' ? orders.length : orders.filter(o => o.status === f).length})
          </button>
        ))}
      </div>
      <div className="bg-white/5 border border-white/5 rounded-xl overflow-hidden">
        {filtered.map((o, i) => (
          <button key={o.id} onClick={() => onSelect(o.id)} className={`w-full text-left flex items-center justify-between px-5 py-4 hover:bg-white/5 transition-colors ${i > 0 ? 'border-t border-white/5' : ''}`}>
            <div className="flex items-center gap-3">
              <StatusDot status={o.status} />
              <div>
                <p className="text-[13px] text-white">{o.customer}</p>
                <p className="text-[12px] text-white/30">{o.id} · {new Date(o.date).toLocaleDateString()} · {o.items.length} item{o.items.length > 1 ? 's' : ''}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[13px] text-white">${o.total.toFixed(2)}</p>
              <p className="text-[11px] text-white/40 capitalize">{o.status}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function OrderDetail({ orderId, onBack }: { orderId: string; onBack: () => void }) {
  const { orders, fulfillOrder, shipOrder, cancelOrder, refundOrder, updateOrder, addOrderHistory } = useAdminStore();
  const order = orders.find(o => o.id === orderId);
  const [showShip, setShowShip] = useState(false);
  const [tracking, setTracking] = useState('');
  const [carrier, setCarrier] = useState('UPS');
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [showEdit, setShowEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState<string | null>(null);

  if (!order) return null;

  const handleShip = () => {
    if (tracking) { shipOrder(order.id, tracking, carrier); setShowShip(false); setTracking(''); }
  };

  const handleSendMessage = () => {
    if (message) { addOrderHistory(order.id, `Message sent to customer: "${message}"`); setMessage(''); setShowMessage(false); }
  };

  return (
    <div>
      <button onClick={onBack} className="text-[13px] text-white/40 hover:text-white/60 mb-6 flex items-center gap-1">← Back to orders</button>

      <div className="grid grid-cols-1 md:grid-cols-[1fr,320px] gap-6">
        {/* Main */}
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="bg-white/5 border border-white/5 rounded-xl p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl text-white font-medium">{order.id}</h2>
                <p className="text-[13px] text-white/40">{new Date(order.date).toLocaleString()}</p>
              </div>
              <StatusBadge status={order.status} />
            </div>
            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              {(order.status === 'pending' || order.status === 'processing') && (
                <ActionBtn label="Mark Fulfilled" onClick={() => fulfillOrder(order.id)} />
              )}
              {(order.status === 'fulfilled' || order.status === 'processing') && (
                <ActionBtn label="Ship & Send Tracking" onClick={() => setShowShip(!showShip)} />
              )}
              <ActionBtn label="Message Customer" onClick={() => setShowMessage(!showMessage)} secondary />
              <ActionBtn label="Edit Order" onClick={() => setShowEdit(!showEdit)} secondary />
              <ActionBtn label="Print Shipping Label" onClick={() => { addOrderHistory(order.id, 'Shipping label printed'); }} secondary />
              {order.status !== 'cancelled' && order.status !== 'refunded' && (
                <>
                  {showConfirm === 'cancel' ? (
                    <div className="flex gap-1">
                      <ActionBtn label="Confirm Cancel" onClick={() => { cancelOrder(order.id); setShowConfirm(null); }} danger />
                      <ActionBtn label="No" onClick={() => setShowConfirm(null)} secondary />
                    </div>
                  ) : (
                    <ActionBtn label="Cancel Order" onClick={() => setShowConfirm('cancel')} danger />
                  )}
                  {showConfirm === 'refund' ? (
                    <div className="flex gap-1">
                      <ActionBtn label="Confirm Refund" onClick={() => { refundOrder(order.id); setShowConfirm(null); }} danger />
                      <ActionBtn label="No" onClick={() => setShowConfirm(null)} secondary />
                    </div>
                  ) : (
                    <ActionBtn label="Issue Refund" onClick={() => setShowConfirm('refund')} danger />
                  )}
                </>
              )}
            </div>
          </div>

          {/* Ship form */}
          {showShip && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <p className="text-[13px] text-white mb-3">Ship Order</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
                <div>
                  <p className="text-[12px] text-white/40 mb-1">Carrier</p>
                  <select value={carrier} onChange={e => setCarrier(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-[13px] text-white focus:outline-none appearance-none">
                    {['UPS', 'FedEx', 'USPS', 'DHL'].map(c => <option key={c} value={c} className="bg-[#1a1a1a] text-white">{c}</option>)}
                  </select>
                </div>
                <div>
                  <p className="text-[12px] text-white/40 mb-1">Tracking Number</p>
                  <input value={tracking} onChange={e => setTracking(e.target.value)} placeholder="Enter tracking #" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-[13px] text-white focus:outline-none" />
                </div>
                <button onClick={handleShip} className="bg-green-500/20 text-green-400 rounded-lg py-2.5 text-[13px] hover:bg-green-500/30 transition-colors">Ship & Notify Customer</button>
              </div>
            </div>
          )}

          {/* Message form */}
          {showMessage && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <p className="text-[13px] text-white mb-3">Message to {order.customer} ({order.email})</p>
              <textarea value={message} onChange={e => setMessage(e.target.value)} rows={3} placeholder="Type your message..." className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-[13px] text-white focus:outline-none resize-none mb-3" />
              <button onClick={handleSendMessage} className="bg-white text-[#111] rounded-lg px-5 py-2 text-[13px] font-medium">Send Email</button>
            </div>
          )}

          {/* Edit form */}
          {showEdit && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <p className="text-[13px] text-white mb-3">Edit Order</p>
              <div className="flex flex-col gap-3">
                <div>
                  <p className="text-[12px] text-white/40 mb-1">Notes</p>
                  <textarea defaultValue={order.notes || ''} onChange={e => updateOrder(order.id, { notes: e.target.value })} rows={2} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-[13px] text-white focus:outline-none resize-none" />
                </div>
                <div>
                  <p className="text-[12px] text-white/40 mb-1">Shipping Address</p>
                  <input defaultValue={order.address} onChange={e => updateOrder(order.id, { address: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-[13px] text-white focus:outline-none" />
                </div>
              </div>
              <button onClick={() => setShowEdit(false)} className="mt-3 bg-white text-[#111] rounded-lg px-5 py-2 text-[13px] font-medium">Done</button>
            </div>
          )}

          {/* Items */}
          <div className="bg-white/5 border border-white/5 rounded-xl p-5">
            <p className="text-[13px] text-white/50 mb-3">Items</p>
            {order.items.map((item, i) => (
              <div key={i} className={`flex justify-between py-3 ${i > 0 ? 'border-t border-white/5' : ''}`}>
                <div>
                  <p className="text-[13px] text-white">{item.name}</p>
                  <p className="text-[12px] text-white/30">{item.color}{item.size ? ` / ${item.size}` : ''} × {item.qty}</p>
                </div>
                <p className="text-[13px] text-white">${(item.price * item.qty).toFixed(2)}</p>
              </div>
            ))}
            <div className="border-t border-white/10 pt-3 mt-2 flex flex-col gap-1">
              <div className="flex justify-between text-[13px] text-white/40"><span>Subtotal</span><span>${order.subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-[13px] text-white/40"><span>Shipping</span><span>{order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}</span></div>
              <div className="flex justify-between text-[13px] text-white/40"><span>Tax</span><span>${order.tax.toFixed(2)}</span></div>
              <div className="flex justify-between text-[13px] text-white font-medium mt-1"><span>Total</span><span>${order.total.toFixed(2)}</span></div>
            </div>
          </div>

          {/* History */}
          <div className="bg-white/5 border border-white/5 rounded-xl p-5">
            <p className="text-[13px] text-white/50 mb-3">Activity</p>
            <div className="flex flex-col gap-3">
              {order.history.slice().reverse().map((h, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20 mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-[13px] text-white/70">{h.action}</p>
                    <p className="text-[11px] text-white/25">{new Date(h.date).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-4">
          <div className="bg-white/5 border border-white/5 rounded-xl p-5">
            <p className="text-[13px] text-white/50 mb-3">Customer</p>
            <p className="text-[13px] text-white">{order.customer}</p>
            <p className="text-[12px] text-white/40 mt-1">{order.email}</p>
            {order.phone && <p className="text-[12px] text-white/40">{order.phone}</p>}
          </div>
          <div className="bg-white/5 border border-white/5 rounded-xl p-5">
            <p className="text-[13px] text-white/50 mb-3">Shipping Address</p>
            <p className="text-[13px] text-white/70">{order.address}</p>
            {order.trackingNumber && (
              <div className="mt-3 pt-3 border-t border-white/5">
                <p className="text-[12px] text-white/40">Tracking</p>
                <p className="text-[13px] text-white mt-1">{order.carrier} — {order.trackingNumber}</p>
              </div>
            )}
          </div>
          <div className="bg-white/5 border border-white/5 rounded-xl p-5">
            <p className="text-[13px] text-white/50 mb-3">Payment</p>
            <p className="text-[13px] text-white/70">{order.paymentMethod}</p>
            <p className={`text-[12px] mt-1 ${order.paymentStatus === 'paid' ? 'text-green-400' : order.paymentStatus === 'refunded' ? 'text-red-400' : 'text-yellow-400'}`}>{order.paymentStatus}</p>
          </div>
          {order.notes && (
            <div className="bg-white/5 border border-white/5 rounded-xl p-5">
              <p className="text-[13px] text-white/50 mb-2">Notes</p>
              <p className="text-[13px] text-white/60">{order.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PaymentsList() {
  const { orders } = useAdminStore();
  const payments = orders.filter(o => o.paymentStatus === 'paid' || o.paymentStatus === 'refunded');
  return (
    <div className="bg-white/5 border border-white/5 rounded-xl overflow-hidden">
      {payments.map((o, i) => (
        <div key={o.id} className={`flex items-center justify-between px-5 py-4 ${i > 0 ? 'border-t border-white/5' : ''}`}>
          <div>
            <p className="text-[13px] text-white">{o.customer}</p>
            <p className="text-[12px] text-white/30">{o.paymentMethod} · {new Date(o.date).toLocaleDateString()}</p>
          </div>
          <div className="text-right">
            <p className="text-[13px] text-white">${o.total.toFixed(2)}</p>
            <p className={`text-[11px] ${o.paymentStatus === 'paid' ? 'text-green-400' : 'text-red-400'}`}>{o.paymentStatus}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function PayoutsList({ payouts }: { payouts: { id: string; date: string; amount: number; status: string; destination: string }[] }) {
  return (
    <div className="bg-white/5 border border-white/5 rounded-xl overflow-hidden">
      {payouts.map((p, i) => (
        <div key={p.id} className={`flex items-center justify-between px-5 py-4 ${i > 0 ? 'border-t border-white/5' : ''}`}>
          <div>
            <p className="text-[13px] text-white">${p.amount.toLocaleString()}</p>
            <p className="text-[12px] text-white/30">{p.destination}</p>
          </div>
          <div className="text-right">
            <p className="text-[12px] text-white/40">{new Date(p.date).toLocaleDateString()}</p>
            <p className={`text-[11px] ${p.status === 'completed' ? 'text-green-400' : 'text-yellow-400'}`}>{p.status}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function ActionBtn({ label, onClick, secondary, danger }: { label: string; onClick: () => void; secondary?: boolean; danger?: boolean }) {
  return (
    <button onClick={onClick} className={`px-3 py-2 rounded-lg text-[12px] transition-colors ${
      danger ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20' :
      secondary ? 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70' :
      'bg-white text-[#111] hover:bg-white/90 font-medium'
    }`}>{label}</button>
  );
}

function StatusBadge({ status }: { status: string }) {
  const c: Record<string, string> = { pending: 'bg-yellow-500/15 text-yellow-400', processing: 'bg-blue-500/15 text-blue-400', fulfilled: 'bg-purple-500/15 text-purple-400', shipped: 'bg-green-500/15 text-green-400', delivered: 'bg-green-600/20 text-green-500', cancelled: 'bg-red-500/15 text-red-400', refunded: 'bg-orange-500/15 text-orange-400' };
  return <span className={`text-[11px] px-2.5 py-1 rounded capitalize ${c[status] || 'bg-white/10 text-white/40'}`}>{status}</span>;
}

function StatusDot({ status }: { status: string }) {
  const c: Record<string, string> = { pending: 'bg-yellow-400', processing: 'bg-blue-400', fulfilled: 'bg-purple-400', shipped: 'bg-green-400', delivered: 'bg-green-600', cancelled: 'bg-red-400', refunded: 'bg-orange-400' };
  return <span className={`w-2 h-2 rounded-full flex-shrink-0 ${c[status] || 'bg-white/20'}`} />;
}
