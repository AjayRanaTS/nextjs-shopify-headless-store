export default function Loading() {
  return (
    <main
      aria-busy="true"
      aria-label="Loading the collection"
      className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:px-12"
    >
      <span className="sr-only">Loading the collection...</span>
      <section
        aria-hidden="true"
        className="grid grid-cols-1 gap-10 py-12 sm:py-16 md:grid-cols-12 lg:gap-12 lg:py-20"
      >
        <div className="md:col-span-5">
          <div className="h-3 w-40 motion-safe:animate-pulse bg-stone" />
          <div className="mt-8 h-28 max-w-md motion-safe:animate-pulse bg-stone" />
          <div className="mt-7 h-12 max-w-sm motion-safe:animate-pulse bg-stone" />
        </div>
        <div className="aspect-[4/3] motion-safe:animate-pulse bg-stone md:col-span-7 md:col-start-6" />
      </section>
      <section aria-hidden="true" className="border-t border-rule pt-5">
        <div className="h-10 w-56 animate-pulse bg-stone" />
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-7 lg:gap-y-14">
          {Array.from({ length: 8 }, (_, index) => (
            <div
              key={index}
              className={
                index === 0
                  ? 'col-span-2 md:col-span-8 lg:col-span-6'
                  : 'col-span-1 md:col-span-4 lg:col-span-3'
              }
            >
              <div
                className={`motion-safe:animate-pulse bg-stone ${
                  index === 0
                    ? 'aspect-[4/3] md:aspect-[5/4]'
                    : 'aspect-[4/5]'
                }`}
              />
              <div className="mt-4 h-6 motion-safe:animate-pulse bg-stone" />
              <div className="mt-2 h-4 w-20 motion-safe:animate-pulse bg-stone" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
