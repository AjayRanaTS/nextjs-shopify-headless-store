'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef(null);

  function openMenu() {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    setIsOpen(true);
  }

  function closeMenu() {
    const dialog = dialogRef.current;
    if (dialog?.open) dialog.close();
    setIsOpen(false);
  }

  return (
    <>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        onClick={openMenu}
        className="text-sm text-ink underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest md:hidden"
      >
        Menu
      </button>
      <dialog
        id="mobile-menu"
        ref={dialogRef}
        aria-label="Site menu"
        onCancel={(event) => {
          event.preventDefault();
          closeMenu();
        }}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none border-0 bg-paper p-0 text-ink backdrop:bg-paper"
      >
        <div className="flex h-full flex-col px-6 pb-8 pt-5">
          <div className="flex items-center justify-between border-b border-rule pb-5">
            <Link
              href="/"
              onClick={closeMenu}
              className="font-serif text-3xl leading-none tracking-[-0.04em] text-forest focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest"
            >
              morrow<span className="text-clay">.</span>
            </Link>
            <button
              type="button"
              onClick={closeMenu}
              className="text-sm text-ink underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest"
            >
              Close
            </button>
          </div>
          <nav
            aria-label="Mobile navigation"
            className="flex flex-1 flex-col justify-center"
          >
            <Link
              href="/#collection"
              onClick={closeMenu}
              className="flex items-baseline gap-5 border-b border-rule py-5 font-serif text-5xl tracking-[-0.04em] text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
            >
              <span className="font-sans text-xs tracking-[0.12em] text-muted">01</span>
              Shop
            </Link>
            <Link
              href="/#about"
              onClick={closeMenu}
              className="flex items-baseline gap-5 border-b border-rule py-5 font-serif text-5xl tracking-[-0.04em] text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
            >
              <span className="font-sans text-xs tracking-[0.12em] text-muted">02</span>
              About
            </Link>
            <Link
              href="/cart"
              onClick={closeMenu}
              className="flex items-baseline gap-5 border-b border-rule py-5 font-serif text-5xl tracking-[-0.04em] text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
            >
              <span className="font-sans text-xs tracking-[0.12em] text-muted">03</span>
              Cart
            </Link>
          </nav>
          <p className="border-t border-rule pt-5 text-xs uppercase tracking-[0.14em] text-muted">
            Good things, picked with care.
          </p>
        </div>
      </dialog>
    </>
  );
}
