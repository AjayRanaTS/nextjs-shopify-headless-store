export default function LoadingProduct() {
  return (
    <main
      aria-busy="true"
      aria-label="Loading product"
      className="mx-auto max-w-7xl px-5 pb-20 pt-8 sm:px-8 sm:pb-24 sm:pt-10 lg:px-12"
    >
      <span className="sr-only">Loading product details...</span>
      <div
        aria-hidden="true"
        className="grid grid-cols-1 gap-9 lg:grid-cols-12 lg:gap-8"
      >
        <div className="aspect-[4/5] motion-safe:animate-pulse bg-stone lg:col-span-7" />
        <div className="lg:col-span-4 lg:col-start-9">
          <div className="h-3 w-24 motion-safe:animate-pulse bg-stone" />
          <div className="mt-5 h-24 motion-safe:animate-pulse bg-stone" />
          <div className="mt-5 h-5 w-28 motion-safe:animate-pulse bg-stone" />
          <div className="mt-8 h-12 motion-safe:animate-pulse bg-stone" />
          <div className="mt-6 h-11 w-28 motion-safe:animate-pulse bg-stone" />
          <div className="mt-7 h-12 motion-safe:animate-pulse bg-stone" />
          <div className="mt-8 border-t border-rule pt-6">
            <div className="h-4 w-20 motion-safe:animate-pulse bg-stone" />
            <div className="mt-4 h-24 motion-safe:animate-pulse bg-stone" />
          </div>
        </div>
      </div>
    </main>
  );
}
