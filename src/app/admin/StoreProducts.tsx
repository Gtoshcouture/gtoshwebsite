'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useAdminStore } from '@/lib/adminStore';
import { Product } from '@/lib/products';

export default function Products() {
  const { products, updateProduct, deleteProduct, duplicateProduct, addProduct } = useAdminStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [filter, setFilter] = useState<'all' | 'clothing' | 'bags'>('all');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl text-white font-medium">Products</h1>
        <button
          onClick={() => setShowAdd(true)}
          className="bg-white text-[#1a1a1a] rounded-lg px-5 py-2.5 text-[13px] font-medium hover:bg-white/90 transition-colors"
        >
          + Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {(['all', 'clothing', 'bags'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-[13px] transition-all ${
              filter === f ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/70'
            }`}
          >
            {f === 'all' ? `All (${products.length})` : `${f.charAt(0).toUpperCase() + f.slice(1)} (${products.filter(p => p.category === f).length})`}
          </button>
        ))}
      </div>

      {/* Product list */}
      <div className="flex flex-col gap-2">
        {filtered.map(p => (
          <div key={p.id}>
            {editingId === p.id ? (
              <ProductEditor
                product={p}
                onSave={(updates) => { updateProduct(p.id, updates); setEditingId(null); }}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <div className="bg-white/5 border border-white/5 rounded-xl px-5 py-4 flex items-center gap-4">
                <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-white/10 flex-shrink-0">
                  <Image src={p.images[0]} alt="" fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-white truncate">{p.name}</p>
                  <p className="text-[12px] text-white/30 capitalize">{p.category}</p>
                </div>
                <div className="text-right mr-4">
                  <p className="text-[13px] text-white">${p.price}</p>
                  <p className={`text-[11px] ${
                    !p.inStock ? 'text-red-400' : p.quantity && p.quantity <= 4 ? 'text-yellow-400' : 'text-white/30'
                  }`}>
                    {!p.inStock ? 'Sold out' : `${p.quantity ?? '—'} in stock`}
                  </p>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => setEditingId(p.id)} className="px-3 py-1.5 rounded-lg text-[12px] text-white/50 bg-white/5 hover:bg-white/10 transition-colors">Edit</button>
                  <button onClick={() => duplicateProduct(p.id)} className="px-3 py-1.5 rounded-lg text-[12px] text-white/50 bg-white/5 hover:bg-white/10 transition-colors">Dupe</button>
                  {confirmDelete === p.id ? (
                    <div className="flex gap-1">
                      <button onClick={() => { deleteProduct(p.id); setConfirmDelete(null); }} className="px-3 py-1.5 rounded-lg text-[12px] text-red-400 bg-red-500/10">Yes</button>
                      <button onClick={() => setConfirmDelete(null)} className="px-3 py-1.5 rounded-lg text-[12px] text-white/40">No</button>
                    </div>
                  ) : (
                    <button onClick={() => setConfirmDelete(p.id)} className="px-3 py-1.5 rounded-lg text-[12px] text-red-400/60 bg-white/5 hover:bg-red-500/10 transition-colors">×</button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add product modal */}
      {showAdd && (
        <AddProductModal
          onSave={(product) => { addProduct(product); setShowAdd(false); }}
          onClose={() => setShowAdd(false)}
        />
      )}
    </div>
  );
}

function ProductEditor({ product, onSave, onCancel }: { product: Product; onSave: (u: Partial<Product>) => void; onCancel: () => void }) {
  const [data, setData] = useState({
    name: product.name,
    price: product.price,
    quantity: product.quantity ?? 0,
    inStock: product.inStock,
    description: product.description,
    images: [...product.images],
    colors: product.colors.join(', '),
    sizes: product.sizes?.join(', ') || '',
    isNew: product.isNew || false,
    isBestSeller: product.isBestSeller || false,
    isLimitedDrop: product.isLimitedDrop || false,
  });

  const save = () => {
    onSave({
      name: data.name,
      slug: data.name.toLowerCase().replace(/\s+/g, '-'),
      price: data.price,
      quantity: data.quantity,
      inStock: data.inStock,
      description: data.description,
      images: data.images.filter(Boolean),
      colors: data.colors.split(',').map(c => c.trim()).filter(Boolean),
      sizes: data.sizes ? data.sizes.split(',').map(s => s.trim()).filter(Boolean) : undefined,
      isNew: data.isNew,
      isBestSeller: data.isBestSeller,
      isLimitedDrop: data.isLimitedDrop,
    });
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Name" value={data.name} onChange={(v) => setData({ ...data, name: v })} />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Price ($)" type="number" value={data.price} onChange={(v) => setData({ ...data, price: +v })} />
          <Field label="Stock" type="number" value={data.quantity} onChange={(v) => setData({ ...data, quantity: +v })} />
        </div>
        <Field label="Description" value={data.description} onChange={(v) => setData({ ...data, description: v })} textarea />
        <div className="flex flex-col gap-3">
          <Field label="Colors (comma-separated)" value={data.colors} onChange={(v) => setData({ ...data, colors: v })} />
          <Field label="Sizes (comma-separated)" value={data.sizes} onChange={(v) => setData({ ...data, sizes: v })} />
        </div>
        <div className="md:col-span-2">
          <p className="text-[12px] text-white/40 mb-2">Images (URLs)</p>
          {data.images.map((img, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                value={img}
                onChange={(e) => { const imgs = [...data.images]; imgs[i] = e.target.value; setData({ ...data, images: imgs }); }}
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[13px] text-white focus:outline-none"
                placeholder="Image URL"
              />
              <button onClick={() => setData({ ...data, images: data.images.filter((_, j) => j !== i) })} className="text-red-400/60 text-sm px-2">×</button>
            </div>
          ))}
          <button onClick={() => setData({ ...data, images: [...data.images, ''] })} className="text-[12px] text-white/40 hover:text-white/60">+ Add image</button>
        </div>
        <div className="md:col-span-2 flex flex-wrap gap-4">
          <label className="flex items-center gap-2 text-[13px] text-white/60">
            <input type="checkbox" checked={data.inStock} onChange={(e) => setData({ ...data, inStock: e.target.checked })} className="accent-white" /> In Stock
          </label>
          <label className="flex items-center gap-2 text-[13px] text-white/60">
            <input type="checkbox" checked={data.isNew} onChange={(e) => setData({ ...data, isNew: e.target.checked })} className="accent-white" /> New
          </label>
          <label className="flex items-center gap-2 text-[13px] text-white/60">
            <input type="checkbox" checked={data.isBestSeller} onChange={(e) => setData({ ...data, isBestSeller: e.target.checked })} className="accent-white" /> Best Seller
          </label>
          <label className="flex items-center gap-2 text-[13px] text-white/60">
            <input type="checkbox" checked={data.isLimitedDrop} onChange={(e) => setData({ ...data, isLimitedDrop: e.target.checked })} className="accent-white" /> Limited Drop
          </label>
        </div>
      </div>
      <div className="flex gap-2 mt-6">
        <button onClick={save} className="bg-white text-[#1a1a1a] rounded-lg px-6 py-2.5 text-[13px] font-medium hover:bg-white/90 transition-colors">Save</button>
        <button onClick={onCancel} className="rounded-lg px-6 py-2.5 text-[13px] text-white/40 bg-white/5 hover:bg-white/10 transition-colors">Cancel</button>
      </div>
    </div>
  );
}

function AddProductModal({ onSave, onClose }: { onSave: (p: Product) => void; onClose: () => void }) {
  const [data, setData] = useState({
    name: '', category: 'clothing' as 'clothing' | 'bags', price: 0, quantity: 10,
    description: '', image: '', colors: '', sizes: '',
  });

  const handleSave = () => {
    if (!data.name || !data.price) return;
    onSave({
      id: `p${Date.now()}`,
      slug: data.name.toLowerCase().replace(/\s+/g, '-'),
      name: data.name,
      category: data.category,
      price: data.price,
      images: data.image ? [data.image] : ['https://images.unsplash.com/photo-1584917865442-de89be371e76?w=800&q=85'],
      description: data.description,
      details: [],
      colors: data.colors ? data.colors.split(',').map(c => c.trim()) : ['Cream'],
      sizes: data.sizes ? data.sizes.split(',').map(s => s.trim()) : undefined,
      inStock: true,
      quantity: data.quantity,
      isNew: true,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-[#1a1a1a] rounded-2xl w-full max-w-lg p-6 border border-white/10" onClick={e => e.stopPropagation()}>
        <h2 className="text-lg text-white font-medium mb-6">New Product</h2>
        <div className="flex flex-col gap-4">
          <Field label="Product Name" value={data.name} onChange={v => setData({ ...data, name: v })} />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-[12px] text-white/40 mb-2">Category</p>
              <select
                value={data.category}
                onChange={e => setData({ ...data, category: e.target.value as 'clothing' | 'bags' })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-[13px] text-white focus:outline-none appearance-none"
              >
                <option value="clothing">Clothing</option>
                <option value="bags">Bags</option>
              </select>
            </div>
            <Field label="Price ($)" type="number" value={data.price} onChange={v => setData({ ...data, price: +v })} />
          </div>
          <Field label="Stock Quantity" type="number" value={data.quantity} onChange={v => setData({ ...data, quantity: +v })} />
          <Field label="Description" value={data.description} onChange={v => setData({ ...data, description: v })} textarea />
          <Field label="Image URL" value={data.image} onChange={v => setData({ ...data, image: v })} />
          <Field label="Colors (comma-separated)" value={data.colors} onChange={v => setData({ ...data, colors: v })} />
          <Field label="Sizes (comma-separated)" value={data.sizes} onChange={v => setData({ ...data, sizes: v })} />
        </div>
        <div className="flex gap-2 mt-6">
          <button onClick={handleSave} className="bg-white text-[#1a1a1a] rounded-lg px-6 py-2.5 text-[13px] font-medium">Add Product</button>
          <button onClick={onClose} className="rounded-lg px-6 py-2.5 text-[13px] text-white/40 bg-white/5">Cancel</button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = 'text', textarea }: {
  label: string; value: string | number; onChange: (v: string) => void; type?: string; textarea?: boolean;
}) {
  return (
    <div>
      <p className="text-[12px] text-white/40 mb-2">{label}</p>
      {textarea ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          rows={3}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-[13px] text-white focus:outline-none resize-none"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-[13px] text-white focus:outline-none"
        />
      )}
    </div>
  );
}
