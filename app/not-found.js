import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto min-h-[55vh] max-w-7xl px-5 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-20 lg:px-12">
      <p className="border-t border-forest pt-4 text-[11px] uppercase tracking-[0.17em] text-muted">
        404 <span className="px-1 text-rule">—</span> Not found
      </p>
      <div className="mt-12 max-w-2xl">
        <h1 className="font-serif text-5xl leading-[0.98] tracking-[-0.035em] text-ink sm:text-6xl">
          We couldn’t find that page.
        </h1>
        <p className="mt-5 text-sm leading-6 text-muted">
          It may have moved on. The collection is still here.
        </p>
        <Link
          href="/#collection"
          className="mt-7 inline-flex border-b border-forest pb-2 text-sm text-forest underline-offset-4 transition-colors hover:border-clay hover:text-clay focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest"
        >
          Browse the collection
        </Link>
      </div>
    </main>
  );
}
