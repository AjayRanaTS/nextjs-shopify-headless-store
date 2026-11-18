import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/shopify';

export default function ProductCard({ product, featured = false }) {
  const price = product.priceRange.minVariantPrice;
  const compareAt = product.compareAtPriceRange?.minVariantPrice;
  const imageAlt = product.featuredImage?.altText;
  const usefulImageAlt =
    imageAlt && !/(failed|başarısız)/i.test(imageAlt) ? imageAlt : product.title;
  const isOnSale =
    compareAt && Number(compareAt.amount) > Number(price.amount);

  return (
    <Link
      href={`/products/${product.handle}`}
      className="group block min-w-0 text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest"
      aria-label={`${product.title}, ${formatPrice(price)}`}
    >
      <div
        className={`relative overflow-hidden bg-stone ${
          featured ? 'aspect-[4/3] md:aspect-[5/4]' : 'aspect-[4/5]'
        }`}
      >
        {product.featuredImage ? (
          <Image
            src={product.featuredImage.url}
            alt={usefulImageAlt}
            fill
            sizes={
              featured
                ? '(max-width: 768px) 100vw, (max-width: 1280px) 66vw, 58vw'
                : '(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw'
            }
            className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
          />
        ) : (
          <div
            aria-hidden="true"
            className="grid h-full place-items-center px-5 text-center"
          >
            <p
              className={`max-w-[14ch] font-serif leading-[0.98] tracking-[-0.03em] text-forest ${
                featured ? 'text-4xl sm:text-5xl' : 'text-2xl sm:text-3xl'
              }`}
            >
              {product.title}
            </p>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          {featured && (
            <p className="mb-2 text-[10px] uppercase tracking-[0.16em] text-muted">
              First in the collection
            </p>
          )}
          <h3
            className={`font-serif leading-tight tracking-[-0.025em] ${
              featured ? 'text-3xl sm:text-4xl' : 'text-xl sm:text-2xl'
            }`}
          >
            {product.title}
          </h3>
        </div>
        <div className="shrink-0 pt-1 text-right text-sm">
          <p className={isOnSale ? 'font-medium text-clay' : 'text-ink'}>
            {formatPrice(price)}
          </p>
          {isOnSale && (
            <p className="mt-1 text-xs text-muted line-through">
              {formatPrice(compareAt)}
            </p>
          )}
        </div>
      </div>
      {isOnSale && (
        <p className="mt-2 text-[10px] uppercase tracking-[0.14em] text-clay">
          Sale
        </p>
      )}
    </Link>
  );
}
