import Link from 'next/link';
import { cookies } from 'next/headers';
import { getCart } from '@/lib/shopify';
import MobileMenu from '@/app/components/MobileMenu';

export default async function Header() {
  const cartId = (await cookies()).get('cartId')?.value;
  const cart = cartId ? await getCart(cartId) : null;
  const cartCount = cart?.totalQuantity ?? 0;

  return (
    <header className="sticky top-0 z-30 border-b border-rule bg-paper">
      <div className="mx-auto grid h-[72px] max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-5 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="justify-self-start font-serif text-[1.8rem] leading-none tracking-[-0.04em] text-forest focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest"
          aria-label="Morrow home"
        >
          morrow<span className="text-clay">.</span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-8 text-sm text-ink md:flex"
        >
          <Link
            href="/#collection"
            className="underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest"
          >
            Shop
          </Link>
          <Link
            href="/#about"
            className="underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest"
          >
            About
          </Link>
        </nav>

        <div className="flex items-center justify-self-end gap-5">
          <MobileMenu />
          <Link
            href="/cart"
            className="border-l border-rule pl-5 text-sm text-ink underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest"
            aria-label={`Cart, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
          >
            Cart ({cartCount})
          </Link>
        </div>
      </div>
    </header>
  );
}
