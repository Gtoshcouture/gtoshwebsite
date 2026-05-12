import { getProductBySlug, products } from '@/lib/products';
import DynamicProductDetail from '@/components/DynamicProductDetail';

export const dynamicParams = true;

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  return { title: product ? `${product.name} — GTOSH` : 'Product — GTOSH' };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <DynamicProductDetail slug={slug} />;
}
