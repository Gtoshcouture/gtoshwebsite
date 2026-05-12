import { supabase } from './supabase';
import { Product } from './products';

// ─── Products ───

export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase.from('products').select('data');
  if (error) { console.error('fetchProducts error:', error); return []; }
  return (data || []).map((row) => row.data as Product);
}

export async function upsertProduct(product: Product) {
  const { error } = await supabase.from('products').upsert({
    id: product.id,
    data: product,
    updated_at: new Date().toISOString(),
  });
  if (error) console.error('upsertProduct error:', error);
}

export async function deleteProductFromDB(id: string) {
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) console.error('deleteProduct error:', error);
}

export async function upsertAllProducts(products: Product[]) {
  const rows = products.map((p) => ({
    id: p.id,
    data: p,
    updated_at: new Date().toISOString(),
  }));
  const { error } = await supabase.from('products').upsert(rows);
  if (error) console.error('upsertAllProducts error:', error);
}

// ─── Orders ───

export async function fetchOrders(): Promise<unknown[]> {
  const { data, error } = await supabase.from('orders').select('data');
  if (error) { console.error('fetchOrders error:', error); return []; }
  return (data || []).map((row) => row.data);
}

export async function upsertOrder(order: { id: string; [key: string]: unknown }) {
  const { error } = await supabase.from('orders').upsert({
    id: order.id,
    data: order,
    updated_at: new Date().toISOString(),
  });
  if (error) console.error('upsertOrder error:', error);
}

export async function upsertAllOrders(orders: { id: string }[]) {
  const rows = orders.map((o) => ({
    id: o.id,
    data: o,
    updated_at: new Date().toISOString(),
  }));
  const { error } = await supabase.from('orders').upsert(rows);
  if (error) console.error('upsertAllOrders error:', error);
}

// ─── Admin Config (key-value) ───

export async function fetchConfig(key: string): Promise<unknown | null> {
  const { data, error } = await supabase.from('admin_config').select('data').eq('key', key).single();
  if (error) { if (error.code !== 'PGRST116') console.error(`fetchConfig(${key}) error:`, error); return null; }
  return data?.data ?? null;
}

export async function upsertConfig(key: string, value: unknown) {
  const { error } = await supabase.from('admin_config').upsert({
    key,
    data: value,
    updated_at: new Date().toISOString(),
  });
  if (error) console.error(`upsertConfig(${key}) error:`, error);
}

// ─── Bulk seed (first-time setup) ───

export async function seedIfEmpty(defaults: {
  products: Product[];
  orders: unknown[];
  settings: unknown;
  shippingProfiles: unknown;
  subscribers: unknown;
  reviews: unknown;
  media: unknown;
  paymentLinks: unknown;
  payouts: unknown;
}) {
  const { count } = await supabase.from('products').select('id', { count: 'exact', head: true });

  if (count === 0 || count === null) {
    console.log('Supabase empty — seeding default data...');
    await upsertAllProducts(defaults.products);
    await upsertAllOrders(defaults.orders as { id: string }[]);
    await upsertConfig('settings', defaults.settings);
    await upsertConfig('shippingProfiles', defaults.shippingProfiles);
    await upsertConfig('subscribers', defaults.subscribers);
    await upsertConfig('reviews', defaults.reviews);
    await upsertConfig('media', defaults.media);
    await upsertConfig('paymentLinks', defaults.paymentLinks);
    await upsertConfig('payouts', defaults.payouts);
    console.log('Seeding complete.');
    return true;
  }
  return false;
}
