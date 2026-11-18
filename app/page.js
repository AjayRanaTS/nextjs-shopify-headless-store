import Image from 'next/image';
import Link from 'next/link';
import ProductCard from '@/app/components/ProductCard';
import { formatPrice, getProducts } from '@/lib/shopify';

export default async function Home() {
  const products = await getProducts(12);
  const featuredProduct = products[0];

  return (
    <main>
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-16 md:grid-cols-12 md:items-center lg:gap-12 lg:px-12 lg:pb-24 lg:pt-20">
        <div className="md:col-span-5">
          <p className="mb-7 text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
            Morrow <span className="px-2 text-rule">/</span> Things for every day
          </p>
          <h1
            aria-label="Good things for the everyday."
            className="max-w-2xl font-serif text-6xl leading-[0.94] tracking-[-0.045em] text-ink sm:text-7xl lg:text-[5.5rem]"
          >
            Good things
            <br />
            for the <em className="font-normal text-forest">everyday.</em>
          </h1>
          <p className="mt-7 max-w-sm text-base leading-7 text-muted">
            Useful, well-made, and a pleasure to live with. A little more
            everyday, chosen one thing at a time.
          </p>
          <Link
            href="#collection"
            className="mt-8 inline-flex items-center gap-4 border-b border-forest pb-2 text-sm font-medium text-forest transition-colors hover:border-clay hover:text-clay focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest"
          >
            Browse the collection
            <span aria-hidden="true">01</span>
          </Link>
        </div>

        <div className="md:col-span-7 md:col-start-6">
          {featuredProduct?.featuredImage ? (
            <Link
              href={`/products/${featuredProduct.handle}`}
              className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest"
              aria-label={`View ${featuredProduct.title}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-stone sm:aspect-[5/4]">
                <Image
                  src={featuredProduct.featuredImage.url}
                  alt={featuredProduct.featuredImage.altText || featuredProduct.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 58vw, 55vw"
                  className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                />
              </div>
              <div className="mt-3 flex items-baseline justify-between gap-4 border-t border-rule pt-3 text-sm">
                <span className="text-muted">A closer look</span>
                <span className="font-serif text-xl text-ink">
                  {featuredProduct.title}
                </span>
                <span className="shrink-0 text-muted">
                  {formatPrice(featuredProduct.priceRange.minVariantPrice)}
                </span>
              </div>
            </Link>
          ) : (
            <div className="flex min-h-72 items-center border-l border-rule pl-7 sm:pl-10 md:min-h-96">
              <p className="max-w-lg font-serif text-5xl leading-[0.98] tracking-[-0.035em] text-forest sm:text-6xl lg:text-7xl">
                Good things, picked <em className="font-normal">with care.</em>
              </p>
            </div>
          )}
        </div>
      </section>

      <section
        id="collection"
        className="mx-auto max-w-7xl scroll-mt-24 px-5 py-14 sm:px-8 sm:py-20 lg:px-12"
      >
        <div className="mb-8 grid grid-cols-1 gap-4 border-t border-forest pt-4 sm:mb-10 sm:grid-cols-12 sm:items-end">
          <p className="text-[11px] uppercase tracking-[0.17em] text-muted sm:col-span-3">
            01 <span className="px-1 text-rule">—</span> Shop
          </p>
          <h2 className="font-serif text-4xl leading-none tracking-[-0.035em] text-ink sm:col-span-6 sm:text-5xl">
            The collection
          </h2>
          <p className="max-w-xs text-sm leading-6 text-muted sm:col-span-3 sm:justify-self-end">
            A considered assortment for home, work, and everywhere between.
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-7 lg:gap-y-14">
            {products.map((product, index) => (
              <div
                key={product.handle}
                className={
                  index === 0
                    ? 'col-span-2 min-w-0 md:col-span-8 lg:col-span-6'
                    : 'col-span-1 min-w-0 md:col-span-4 lg:col-span-3'
                }
              >
                <ProductCard product={product} featured={index === 0} />
              </div>
            ))}
          </div>
        ) : (
          <p className="border-y border-rule py-10 text-sm text-muted">
            We’re making room for the first good thing. Please check back soon.
          </p>
        )}
      </section>

      <section
        id="about"
        className="mx-auto max-w-7xl scroll-mt-24 px-5 pb-20 pt-10 sm:px-8 sm:pb-28 sm:pt-16 lg:px-12"
      >
        <div className="grid grid-cols-1 gap-8 border-t border-forest pt-5 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4">
            <p className="text-[11px] uppercase tracking-[0.17em] text-muted">
              02 <span className="px-1 text-rule">—</span> Our point of view
            </p>
            <h2 className="mt-5 max-w-sm font-serif text-4xl leading-[1.02] tracking-[-0.035em] text-ink sm:text-5xl">
              The little things add up.
            </h2>
          </div>
          <div className="grid gap-0 md:col-span-7 md:col-start-6 md:grid-cols-3 md:gap-6">
            <article className="border-t border-rule py-4 md:pt-5">
              <p className="text-[11px] uppercase tracking-[0.15em] text-muted">01</p>
              <h3 className="mt-8 font-serif text-2xl text-ink">Useful, first.</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                It should earn its place in your day.
              </p>
            </article>
            <article className="border-t border-rule py-4 md:pt-5">
              <p className="text-[11px] uppercase tracking-[0.15em] text-muted">02</p>
              <h3 className="mt-8 font-serif text-2xl text-ink">Made with care.</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                Good materials. Details worth noticing.
              </p>
            </article>
            <article className="border-t border-rule py-4 md:pt-5">
              <p className="text-[11px] uppercase tracking-[0.15em] text-muted">03</p>
              <h3 className="mt-8 font-serif text-2xl text-ink">A bit of joy.</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                Practical can still feel personal.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
