'use client';

import { useState, useRef } from 'react';
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
        <button onClick={() => setShowAdd(true)}
          className="bg-white text-[#1a1a1a] rounded-lg px-4 py-2 text-[13px] font-medium hover:bg-white/90 transition-colors">
          + Add Product
        </button>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto hide-scrollbar">
        {(['all', 'clothing', 'bags'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`flex-shrink-0 px-4 py-2 rounded-lg text-[13px] transition-all ${filter === f ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/70'}`}>
            {f === 'all' ? `All (${products.length})` : `${f.charAt(0).toUpperCase() + f.slice(1)} (${products.filter(p => p.category === f).length})`}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        {filtered.map(p => (
          <div key={p.id}>
            {editingId === p.id ? (
              <ProductEditor product={p}
                onSave={(updates) => { updateProduct(p.id, updates); setEditingId(null); }}
                onCancel={() => setEditingId(null)} />
            ) : (
              <div className="bg-white/5 border border-white/5 rounded-xl px-3 py-3 md:px-5 md:py-4 flex items-center gap-3">
                <div className="relative w-11 h-13 md:w-12 md:h-14 rounded-lg overflow-hidden bg-white/10 flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.images[0]} alt="" className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-white truncate">{p.name}</p>
                  <p className="text-[11px] text-white/30 capitalize">{p.category}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[13px] text-white">${p.price}</p>
                  <p className={`text-[11px] ${!p.inStock ? 'text-red-400' : p.quantity && p.quantity <= 4 ? 'text-yellow-400' : 'text-white/30'}`}>
                    {!p.inStock ? 'Out' : `${p.quantity ?? '—'} left`}
                  </p>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <button onClick={() => setEditingId(p.id)} className="px-2.5 py-1.5 rounded-lg text-[11px] text-white/50 bg-white/5 hover:bg-white/10">Edit</button>
                  <button onClick={() => duplicateProduct(p.id)} className="px-2.5 py-1.5 rounded-lg text-[11px] text-white/50 bg-white/5 hover:bg-white/10 hidden md:block">Dupe</button>
                  {confirmDelete === p.id ? (
                    <div className="flex gap-1">
                      <button onClick={() => { deleteProduct(p.id); setConfirmDelete(null); }} className="px-2.5 py-1.5 rounded-lg text-[11px] text-red-400 bg-red-500/10">Yes</button>
                      <button onClick={() => setConfirmDelete(null)} className="px-2.5 py-1.5 rounded-lg text-[11px] text-white/40">No</button>
                    </div>
                  ) : (
                    <button onClick={() => setConfirmDelete(p.id)} className="px-2 py-1.5 rounded-lg text-[11px] text-red-400/60 bg-white/5 hover:bg-red-500/10">×</button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {showAdd && <AddProductModal onSave={(product) => { addProduct(product); setShowAdd(false); }} onClose={() => setShowAdd(false)} />}
    </div>
  );
}

/* ─── Product Editor (inline) ─── */

function ProductEditor({ product, onSave, onCancel }: { product: Product; onSave: (u: Partial<Product>) => void; onCancel: () => void }) {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(String(product.price));
  const [quantity, setQuantity] = useState(String(product.quantity ?? 0));
  const [inStock, setInStock] = useState(product.inStock);
  const [description, setDescription] = useState(product.description);
  const [images, setImages] = useState([...product.images]);
  const [colors, setColors] = useState(product.colors.join(', '));
  const [sizes, setSizes] = useState(product.sizes?.join(', ') || '');
  const [variantPrices, setVariantPrices] = useState(product.variantPrices || []);
  const [isNew, setIsNew] = useState(product.isNew || false);
  const [isBestSeller, setIsBestSeller] = useState(product.isBestSeller || false);
  const [isLimitedDrop, setIsLimitedDrop] = useState(product.isLimitedDrop || false);
  const [saved, setSaved] = useState(false);

  const save = () => {
    const colorList = colors.split(',').map(c => c.trim()).filter(Boolean);
    const sizeList = sizes ? sizes.split(',').map(s => s.trim()).filter(Boolean) : undefined;
    onSave({
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      price: parseFloat(price) || 0,
      quantity: parseInt(quantity) || 0,
      inStock,
      description,
      images: images.filter(Boolean),
      colors: colorList,
      sizes: sizeList,
      variantPrices: variantPrices.length > 0 ? variantPrices : undefined,
      isNew, isBestSeller, isLimitedDrop,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  // Build variant options from colors and sizes
  const colorList = colors.split(',').map(c => c.trim()).filter(Boolean);
  const sizeList = sizes ? sizes.split(',').map(s => s.trim()).filter(Boolean) : [];

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 md:p-6">
      <div className="flex flex-col gap-4">
        <Field label="Name" value={name} onChange={setName} />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Base Price ($)" type="number" value={price} onChange={setPrice} />
          <Field label="Stock" type="number" value={quantity} onChange={setQuantity} />
        </div>
        <Field label="Description" value={description} onChange={setDescription} textarea />
        <Field label="Colors (comma-separated)" value={colors} onChange={setColors} />
        <Field label="Sizes (comma-separated)" value={sizes} onChange={setSizes} />

        {/* Variant Pricing */}
        {(colorList.length > 0 || sizeList.length > 0) && (
          <VariantPricing
            colors={colorList}
            sizes={sizeList}
            basePrice={parseFloat(price) || 0}
            variantPrices={variantPrices}
            onChange={setVariantPrices}
          />
        )}

        <ImageUpload images={images} onChange={setImages} />

        <div className="flex flex-wrap gap-3">
          <Checkbox label="In Stock" checked={inStock} onChange={setInStock} />
          <Checkbox label="New" checked={isNew} onChange={setIsNew} />
          <Checkbox label="Best Seller" checked={isBestSeller} onChange={setIsBestSeller} />
          <Checkbox label="Limited Drop" checked={isLimitedDrop} onChange={setIsLimitedDrop} />
        </div>
      </div>
      <div className="flex gap-2 mt-5">
        <button onClick={save} className="bg-white text-[#1a1a1a] rounded-lg px-5 py-2.5 text-[13px] font-medium hover:bg-white/90 transition-colors">
          {saved ? '✓ Saved' : 'Save'}
        </button>
        <button onClick={onCancel} className="rounded-lg px-5 py-2.5 text-[13px] text-white/40 bg-white/5 hover:bg-white/10 transition-colors">Done</button>
      </div>
    </div>
  );
}

/* ─── Add Product Modal ─── */

function AddProductModal({ onSave, onClose }: { onSave: (p: Product) => void; onClose: () => void }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<'clothing' | 'bags'>('clothing');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('10');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [colors, setColors] = useState('');
  const [sizes, setSizes] = useState('');
  const [variantPrices, setVariantPrices] = useState<{ variant: string; price: number }[]>([]);

  const colorList = colors.split(',').map(c => c.trim()).filter(Boolean);
  const sizeList = sizes ? sizes.split(',').map(s => s.trim()).filter(Boolean) : [];

  const handleSave = () => {
    if (!name || !price) return;
    onSave({
      id: `p${Date.now()}`,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      name, category,
      price: parseFloat(price) || 0,
      images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=85'],
      description,
      details: [],
      colors: colorList.length > 0 ? colorList : ['Cream'],
      sizes: sizeList.length > 0 ? sizeList : undefined,
      variantPrices: variantPrices.length > 0 ? variantPrices : undefined,
      inStock: true,
      quantity: parseInt(quantity) || 10,
      isNew: true,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-end md:items-center justify-center" onClick={onClose}>
      <div className="bg-[#1a1a1a] rounded-t-2xl md:rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-5 border border-white/10"
        onClick={e => e.stopPropagation()}>
        <h2 className="text-lg text-white font-medium mb-5">New Product</h2>
        <div className="flex flex-col gap-4">
          <Field label="Product Name" value={name} onChange={setName} />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-[12px] text-white/40 mb-2">Category</p>
              <select value={category} onChange={e => setCategory(e.target.value as 'clothing' | 'bags')}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-[16px] md:text-[13px] text-white focus:outline-none">
                <option value="clothing" className="bg-[#1a1a1a] text-white">Clothing</option>
                <option value="bags" className="bg-[#1a1a1a] text-white">Bags</option>
              </select>
            </div>
            <Field label="Base Price ($)" type="number" value={price} onChange={setPrice} />
          </div>
          <Field label="Stock Quantity" type="number" value={quantity} onChange={setQuantity} />
          <Field label="Description" value={description} onChange={setDescription} textarea />
          <Field label="Colors (comma-separated)" value={colors} onChange={setColors} />
          <Field label="Sizes (comma-separated)" value={sizes} onChange={setSizes} />

          {(colorList.length > 0 || sizeList.length > 0) && (
            <VariantPricing colors={colorList} sizes={sizeList} basePrice={parseFloat(price) || 0}
              variantPrices={variantPrices} onChange={setVariantPrices} />
          )}

          <ImageUpload images={images} onChange={setImages} />
        </div>
        <div className="flex gap-2 mt-5">
          <button onClick={handleSave} className="bg-white text-[#1a1a1a] rounded-lg px-5 py-2.5 text-[13px] font-medium">Add Product</button>
          <button onClick={onClose} className="rounded-lg px-5 py-2.5 text-[13px] text-white/40 bg-white/5">Cancel</button>
        </div>
      </div>
    </div>
  );
}

/* ─── Variant Pricing ─── */

function VariantPricing({ colors, sizes, basePrice, variantPrices, onChange }: {
  colors: string[]; sizes: string[]; basePrice: number;
  variantPrices: { variant: string; price: number }[];
  onChange: (vp: { variant: string; price: number }[]) => void;
}) {
  const [showVariants, setShowVariants] = useState(variantPrices.length > 0);

  // Generate all variant combos
  const variants: string[] = [];
  if (sizes.length > 0 && colors.length > 0) {
    colors.forEach(c => sizes.forEach(s => variants.push(`${c} / ${s}`)));
  } else if (colors.length > 0) {
    variants.push(...colors);
  } else {
    variants.push(...sizes);
  }

  const getPrice = (v: string) => variantPrices.find(vp => vp.variant === v)?.price ?? basePrice;

  const setPrice = (variant: string, price: number) => {
    const existing = variantPrices.filter(vp => vp.variant !== variant);
    if (price !== basePrice) {
      onChange([...existing, { variant, price }]);
    } else {
      onChange(existing);
    }
  };

  if (!showVariants) {
    return (
      <button onClick={() => setShowVariants(true)} type="button"
        className="text-[12px] text-white/40 hover:text-white/60 text-left">
        + Set different prices per variant
      </button>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-[12px] text-white/40">Variant Pricing</p>
        <button onClick={() => { setShowVariants(false); onChange([]); }} className="text-[11px] text-white/30 hover:text-white/50">Clear all</button>
      </div>
      <div className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
        {variants.map((v, i) => (
          <div key={v} className={`flex items-center justify-between px-3 py-2 ${i > 0 ? 'border-t border-white/5' : ''}`}>
            <span className="text-[12px] text-white/60">{v}</span>
            <div className="flex items-center gap-1">
              <span className="text-[12px] text-white/30">$</span>
              <input
                type="number"
                value={getPrice(v)}
                onChange={e => setPrice(v, parseFloat(e.target.value) || 0)}
                className="w-20 bg-transparent text-right text-[13px] text-white focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                style={{ fontSize: '16px' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Image Upload with reorder ─── */

function ImageUpload({ images, onChange }: { images: string[]; onChange: (imgs: string[]) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    let loaded = 0;
    const newImages: string[] = [];

    fileArray.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          newImages.push(reader.result);
        }
        loaded++;
        if (loaded === fileArray.length) {
          // All files loaded — batch update
          onChange([...images, ...newImages]);
        }
      };
      reader.readAsDataURL(file);
    });

    if (fileRef.current) fileRef.current.value = '';
  };

  const moveImage = (from: number, to: number) => {
    if (to < 0 || to >= images.length) return;
    const next = [...images];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onChange(next);
  };

  const setAsMain = (index: number) => {
    if (index === 0) return;
    moveImage(index, 0);
  };

  const removeImage = (index: number) => {
    onChange(images.filter((_, j) => j !== index));
  };

  return (
    <div>
      <p className="text-[12px] text-white/40 mb-2">Images {images.length > 0 && <span className="text-white/25">· tap to set as main</span>}</p>

      {images.length > 0 && (
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 mb-2">
          {images.map((img, i) => (
            <div key={`${i}-${img.substring(0, 20)}`} className="relative flex-shrink-0">
              <button onClick={() => setAsMain(i)} type="button"
                className={`w-[72px] h-[72px] rounded-lg overflow-hidden border-2 transition-colors ${i === 0 ? 'border-white/40' : 'border-transparent hover:border-white/20'}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
              {i === 0 && (
                <span className="absolute -top-1 left-1 text-[9px] bg-white text-black px-1 rounded font-medium">Main</span>
              )}
              <button onClick={() => removeImage(i)} type="button"
                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full text-[10px] flex items-center justify-center">×</button>
              {images.length > 1 && (
                <div className="absolute bottom-0.5 left-0.5 right-0.5 flex justify-center gap-0.5">
                  {i > 0 && (
                    <button onClick={(e) => { e.stopPropagation(); moveImage(i, i - 1); }} type="button"
                      className="w-5 h-5 bg-black/70 text-white/80 rounded text-[10px] flex items-center justify-center">←</button>
                  )}
                  {i < images.length - 1 && (
                    <button onClick={(e) => { e.stopPropagation(); moveImage(i, i + 1); }} type="button"
                      className="w-5 h-5 bg-black/70 text-white/80 rounded text-[10px] flex items-center justify-center">→</button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <button onClick={() => fileRef.current?.click()} type="button"
        className="bg-white/10 text-white/70 rounded-lg px-4 py-2.5 text-[13px] hover:bg-white/15 transition-colors w-full md:w-auto">
        + Upload Images
      </button>
      <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleFiles} className="hidden" />
    </div>
  );
}

/* ─── Shared UI Components ─── */

function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-2 text-[13px] text-white/60">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="accent-white" /> {label}
    </label>
  );
}

function Field({ label, value, onChange, type = 'text', textarea }: {
  label: string; value: string | number; onChange: (v: string) => void; type?: string; textarea?: boolean;
}) {
  return (
    <div>
      <p className="text-[12px] text-white/40 mb-1.5">{label}</p>
      {textarea ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} rows={3}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-[16px] md:text-[13px] text-white focus:outline-none resize-none"
          style={{ fontSize: '16px' }} />
      ) : (
        <input type={type} value={value} onChange={e => onChange(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-[16px] md:text-[13px] text-white focus:outline-none"
          style={{ fontSize: '16px' }} />
      )}
    </div>
  );
}
