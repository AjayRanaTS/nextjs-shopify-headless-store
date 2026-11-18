'use client';

import Image from 'next/image';
import { useState } from 'react';

function getAltText(image, productTitle) {
  const altText = image.altText?.trim();
  return altText && !/(failed|başarısız)/i.test(altText) ? altText : productTitle;
}

export default function ProductGallery({ images, productTitle }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];

  if (!activeImage) {
    return (
      <div className="grid aspect-[4/5] place-items-center bg-stone px-8 text-center">
        <p className="max-w-sm font-serif text-5xl leading-[0.98] tracking-[-0.035em] text-forest sm:text-6xl">
          {productTitle}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="relative aspect-[4/5] overflow-hidden bg-stone">
        <Image
          src={activeImage.url}
          alt={getAltText(activeImage, productTitle)}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 58vw"
          className="object-cover"
        />
      </div>
      {images.length > 1 && (
        <div
          role="group"
          aria-label="Product images"
          className="mt-3 grid grid-cols-6 gap-2 sm:gap-3"
        >
          {images.map((image, index) => (
            <button
              key={image.url}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`View image ${index + 1} of ${images.length}`}
              aria-pressed={activeIndex === index}
              className={`relative aspect-square overflow-hidden border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest ${
                activeIndex === index ? 'border-forest' : 'border-transparent'
              }`}
            >
              <Image
                src={image.url}
                alt=""
                fill
                sizes="(max-width: 640px) 16vw, 120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
