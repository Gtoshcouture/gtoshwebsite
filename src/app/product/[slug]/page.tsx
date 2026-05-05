import { notFound } from 'next/navigation';
import { getProductBySlug, products, getRelatedProducts } from '@/lib/products';
import ProductDetail from '@/components/ProductDetail';
import ProductCard from '@/components/ProductCard';

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  return { title: product ? `${product.name} — GTOSH` : 'Not Found' };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);

  return (
    <div className="bg-[#F7F3EC] pt-16 md:pt-20">
      <ProductDetail product={product} />

      {/* Styled With */}
      {related.length > 0 && (
        <section className="py-20 md:py-28 px-6 md:px-16 max-w-[1400px] mx-auto">
          <div className="mb-12">
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#9B7B68] mb-3">Complete the Look</p>
            <h2 className="font-['Cormorant_Garamond',serif] text-3xl md:text-4xl text-[#3E2A1E]">Styled With</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
