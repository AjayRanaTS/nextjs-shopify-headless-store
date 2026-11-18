'use client';

import { useState } from 'react';

export default function QuantityStepper() {
  const [quantity, setQuantity] = useState('1');

  function changeQuantity(amount) {
    setQuantity((current) => String(Math.max(1, (Number(current) || 0) + amount)));
  }

  return (
    <div className="inline-flex h-11 items-stretch border border-rule">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => changeQuantity(-1)}
        className="w-11 text-lg text-ink transition-colors hover:bg-stone focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-forest"
      >
        −
      </button>
      <input
        id="quantity"
        name="quantity"
        type="number"
        inputMode="numeric"
        aria-label="Quantity"
        min={1}
        step={1}
        required
        value={quantity}
        onChange={(event) => setQuantity(event.target.value)}
        className="w-12 border-x border-rule bg-transparent text-center text-sm text-ink outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-forest/20"
      />
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => changeQuantity(1)}
        className="w-11 text-lg text-ink transition-colors hover:bg-stone focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-forest"
      >
        +
      </button>
    </div>
  );
}
