'use client';

import { useState } from 'react';

function formatVariantPrice(price) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: price.currencyCode,
  }).format(Number(price.amount));
}

export default function VariantPicker({ variants }) {
  const initialVariant =
    variants.find((variant) => variant.availableForSale) ?? variants[0];
  const [selectedId, setSelectedId] = useState(initialVariant?.id ?? '');
  const selectedVariant = variants.find((variant) => variant.id === selectedId);
  const compareAtPrice = Number(selectedVariant?.compareAtPrice?.amount);
  const price = Number(selectedVariant?.price.amount);
  const onSale =
    Number.isFinite(compareAtPrice) && Number.isFinite(price) && compareAtPrice > price;

  return (
    <div>
      <div className="mb-6">
        <p className="text-[0.68rem] font-medium uppercase tracking-[0.15em] text-muted">
          Price
        </p>
        <p className="mt-2 flex flex-wrap items-baseline gap-x-3">
          {onSale && (
            <del className="text-sm text-muted">
              {formatVariantPrice(selectedVariant.compareAtPrice)}
            </del>
          )}
          <span className={onSale ? 'text-clay' : 'text-ink'}>
            {selectedVariant ? formatVariantPrice(selectedVariant.price) : 'Unavailable'}
          </span>
        </p>
      </div>

      <label
        htmlFor="variantId"
        className="mb-2 block text-[0.68rem] font-medium uppercase tracking-[0.15em] text-muted"
      >
        Choose an option
      </label>
      <select
        id="variantId"
        name="variantId"
        value={selectedId}
        onChange={(event) => setSelectedId(event.target.value)}
        disabled={variants.length === 0}
        className="w-full border border-rule bg-paper px-4 py-3 text-sm text-ink outline-none transition-colors focus-visible:border-forest focus-visible:ring-2 focus-visible:ring-forest/20 disabled:opacity-60"
      >
        {variants.map((variant) => (
          <option
            key={variant.id}
            value={variant.id}
            disabled={!variant.availableForSale}
          >
            {variant.title}
            {variant.availableForSale ? '' : ' — Sold out'}
          </option>
        ))}
      </select>
    </div>
  );
}
