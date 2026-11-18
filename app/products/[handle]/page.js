import Link from 'next/link';
import { notFound } from 'next/navigation';
import { addToCart, buyNow } from '@/app/actions';
import ProductGallery from '@/app/components/ProductGallery';
import QuantityStepper from '@/app/components/QuantityStepper';
import SubmitButton from '@/app/components/SubmitButton';
import VariantPicker from '@/app/components/VariantPicker';
import { getProduct } from '@/lib/shopify';

function formatDescriptionHtml(html) {
  return html
    .replace(/<img\b[^>]*\/?>/gi, '')
    .replace(/[\p{Extended_Pictographic}\u{1F1E6}-\u{1F1FF}\uFE0F\u200D]/gu, '');
}

export async function generateMetadata({ params }) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) return {};

  return {
    title: product.seo?.title || product.title,
    description: product.seo?.description || product.description.slice(0, 150),
  };
}

export default async function ProductPage({ params }) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) notFound();

  const variants = product.variants.nodes;
  const anyAvailable = variants.some((variant) => variant.availableForSale);
  const images =
    product.images.nodes.length > 0
      ? product.images.nodes
      : product.featuredImage
        ? [product.featuredImage]
        : [];
  const descriptionHtml = formatDescriptionHtml(product.descriptionHtml);

  return (
    <main className="mx-auto max-w-7xl px-5 pb-20 pt-8 sm:px-8 sm:pb-24 sm:pt-10 lg:px-12">
      <Link
        href="/#collection"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted underline-offset-4 transition-colors hover:text-forest hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest"
      >
        <span aria-hidden="true">←</span> Back to the collection
      </Link>

      <div className="grid min-w-0 grid-cols-1 gap-9 lg:grid-cols-12 lg:gap-8">
        <div className="min-w-0 lg:col-span-7">
          <ProductGallery images={images} productTitle={product.title} />
        </div>

        <aside className="min-w-0 lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:self-start lg:sticky lg:top-28">
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-muted">
            The product
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-[0.98] tracking-[-0.035em] text-ink sm:text-5xl">
            {product.title}
          </h1>

          <p
            className={`mt-5 text-sm ${anyAvailable ? 'text-forest' : 'text-clay'}`}
            aria-live="polite"
          >
            {anyAvailable ? 'Available to order' : 'Currently unavailable'}
          </p>

          <form action={addToCart} className="mt-7 border-t border-rule pt-6">
            <VariantPicker variants={variants} />

            <div className="mt-6">
              <label
                htmlFor="quantity"
                className="mb-2 block text-[0.68rem] font-medium uppercase tracking-[0.15em] text-muted"
              >
                Quantity
              </label>
              <QuantityStepper />
            </div>

            <SubmitButton
              disabled={!anyAvailable}
              pendingText="Adding to cart..."
              className="mt-7 w-full border border-forest bg-forest px-5 py-3.5 text-sm font-medium text-paper transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest disabled:cursor-not-allowed"
            >
              {anyAvailable ? 'Add to cart' : 'Sold out'}
            </SubmitButton>
            <button
              type="submit"
              formAction={buyNow}
              disabled={!anyAvailable}
              className="mt-3 w-full px-5 py-3 text-sm text-ink underline underline-offset-4 transition-colors hover:text-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest disabled:cursor-not-allowed disabled:opacity-50"
            >
              Buy now
            </button>
            <p className="mt-3 text-xs leading-5 text-muted">
              Shipping and taxes are calculated at checkout.
            </p>
          </form>

        </aside>
      </div>
      <section className="product-description mt-10 border-t border-rule pt-6 lg:w-7/12">
        <h2 className="mb-4 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-muted">
          Details
        </h2>
        <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
      </section>
    </main>
  );
}
