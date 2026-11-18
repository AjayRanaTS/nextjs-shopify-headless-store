import Image from 'next/image';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { removeItem, updateQuantity } from '@/app/actions';
import SubmitButton from '@/app/components/SubmitButton';
import { formatPrice, getCart } from '@/lib/shopify';

export const metadata = { title: 'Your cart' };

function getImageAlt(image, productTitle) {
  const altText = image?.altText?.trim();
  return altText && !/(failed|başarısız)/i.test(altText) ? altText : productTitle;
}

export default async function CartPage() {
  const cartId = (await cookies()).get('cartId')?.value;
  const cart = cartId ? await getCart(cartId) : null;
  const lines = cart?.lines.nodes ?? [];

  if (lines.length === 0) {
    return (
      <main className="mx-auto min-h-[55vh] max-w-7xl px-5 pb-20 pt-12 sm:px-8 sm:pb-24 sm:pt-16 lg:px-12">
        <p className="border-t border-forest pt-4 text-[11px] uppercase tracking-[0.17em] text-muted">
          01 <span className="px-1 text-rule">—</span> Your cart
        </p>
        <div className="mt-12 grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <h1 className="max-w-xl font-serif text-5xl leading-[0.98] tracking-[-0.035em] text-ink sm:text-6xl">
              Nothing here just yet.
            </h1>
            <p className="mt-5 text-sm leading-6 text-muted">
              There are good things waiting to be found.
            </p>
            <Link
              href="/#collection"
              className="mt-7 inline-flex border-b border-forest pb-2 text-sm text-forest underline-offset-4 transition-colors hover:border-clay hover:text-clay focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest"
            >
              Shop the collection
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-5 pb-20 pt-12 sm:px-8 sm:pb-24 sm:pt-16 lg:px-12">
      <p className="border-t border-forest pt-4 text-[11px] uppercase tracking-[0.17em] text-muted">
        01 <span className="px-1 text-rule">—</span> Your cart
      </p>
      <div className="mb-9 mt-6 flex items-baseline justify-between gap-4">
        <h1 className="font-serif text-5xl leading-none tracking-[-0.035em] text-ink sm:text-6xl">
          Your cart
        </h1>
        <p className="text-sm text-muted">{cart.totalQuantity} items</p>
      </div>

      <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
        <ul className="divide-y divide-rule border-y border-rule lg:col-span-8">
          {lines.map((line) => {
            const variant = line.merchandise;

            return (
              <li
                key={line.id}
                className="grid grid-cols-[5rem_minmax(0,1fr)] gap-x-4 py-5 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-x-6 sm:py-6 lg:grid-cols-[7rem_minmax(0,1fr)_auto]"
              >
                <Link
                  href={`/products/${variant.product.handle}`}
                  aria-label={`View ${variant.product.title}`}
                  className="relative row-span-2 aspect-[4/5] w-20 overflow-hidden bg-stone focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest sm:w-28 lg:row-span-1"
                >
                  {variant.image ? (
                    <Image
                      src={variant.image.url}
                      alt={getImageAlt(variant.image, variant.product.title)}
                      fill
                      sizes="(max-width: 640px) 80px, 112px"
                      className="object-cover"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="grid h-full place-items-center px-2 text-center font-serif text-lg leading-tight text-forest"
                    >
                      {variant.product.title}
                    </span>
                  )}
                </Link>

                <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-start sm:justify-between lg:contents">
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/products/${variant.product.handle}`}
                      className="font-serif text-xl leading-tight text-ink underline-offset-4 transition-colors hover:text-forest hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest sm:text-2xl"
                    >
                      {variant.product.title}
                    </Link>
                    {variant.title !== 'Default Title' && (
                      <p className="mt-1 text-sm text-muted">{variant.title}</p>
                    )}

                    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                      <div className="inline-flex items-stretch border border-rule">
                        <form action={updateQuantity}>
                          <input type="hidden" name="lineId" value={line.id} />
                          <input
                            type="hidden"
                            name="quantity"
                            value={line.quantity - 1}
                          />
                          <SubmitButton
                            aria-label="Decrease quantity"
                            disabled={line.quantity <= 1}
                            className="grid h-9 w-9 place-items-center text-base text-ink transition-colors hover:bg-stone focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-forest"
                          >
                            −
                          </SubmitButton>
                        </form>
                        <span className="grid min-w-9 place-items-center border-x border-rule px-2 text-sm text-ink">
                          {line.quantity}
                        </span>
                        <form action={updateQuantity}>
                          <input type="hidden" name="lineId" value={line.id} />
                          <input
                            type="hidden"
                            name="quantity"
                            value={line.quantity + 1}
                          />
                          <SubmitButton
                            aria-label="Increase quantity"
                            className="grid h-9 w-9 place-items-center text-base text-ink transition-colors hover:bg-stone focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-forest"
                          >
                            +
                          </SubmitButton>
                        </form>
                      </div>
                      <form action={removeItem}>
                        <input type="hidden" name="lineId" value={line.id} />
                        <SubmitButton
                          className="py-2 text-xs text-muted underline underline-offset-2 transition-colors hover:text-clay focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
                          pendingText="Removing..."
                        >
                          Remove
                        </SubmitButton>
                      </form>
                    </div>
                  </div>

                  <p className="text-sm text-ink sm:pt-1 lg:col-start-3 lg:text-right">
                    {formatPrice(line.cost.totalAmount)}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>

        <aside className="border-t border-forest pt-5 lg:sticky lg:top-28 lg:col-span-3 lg:col-start-10 lg:self-start">
          <h2 className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-muted">
            Order summary
          </h2>
          <div className="mt-6 flex justify-between border-t border-rule pt-5 text-sm">
            <span className="text-muted">Subtotal</span>
            <span className="text-ink">{formatPrice(cart.cost.subtotalAmount)}</span>
          </div>
          <p className="mt-3 text-xs leading-5 text-muted">
            Shipping and taxes are calculated at checkout.
          </p>
          <a
            href={cart.checkoutUrl}
            className="mt-6 flex w-full items-center justify-center border border-forest bg-forest px-5 py-3.5 text-sm font-medium text-paper transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
          >
            Checkout
          </a>
          <Link
            href="/#collection"
            className="mt-4 inline-block text-sm text-muted underline underline-offset-4 transition-colors hover:text-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
          >
            Keep exploring
          </Link>
        </aside>
      </div>
    </main>
  );
}
