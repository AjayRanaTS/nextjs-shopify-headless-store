'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import {
  createCheckout,
  getCart,
  createCart,
  addCartLines,
  updateCartLines,
  removeCartLines,
} from '@/lib/shopify';

const CART_COOKIE = 'cartId';

async function getCartId() {
  const cookieStore = await cookies();
  return cookieStore.get(CART_COOKIE)?.value;
}

async function saveCartId(id) {
  const cookieStore = await cookies();
  cookieStore.set(CART_COOKIE, id, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 14, // 14 din
  });
}

// Buy now (pehle wala, waise hi)
export async function buyNow(formData) {
  const checkoutUrl = await createCheckout(formData.get('variantId'));
  redirect(checkoutUrl);
}

// Add to cart
export async function addToCart(formData) {
  const lines = [{
    merchandiseId: formData.get('variantId'),
    quantity: Number(formData.get('quantity') ?? 1),
  }];

  const cartId = await getCartId();
  const existingCart = cartId ? await getCart(cartId) : null;

  if (existingCart) {
    await addCartLines(existingCart.id, lines);
  } else {
    const newCart = await createCart(lines);
    await saveCartId(newCart.id);
  }

  revalidatePath('/', 'layout');
  redirect('/cart');
}

// + / − buttons
export async function updateQuantity(formData) {
  const cartId = await getCartId();
  if (!cartId) return;

  const lineId = formData.get('lineId');
  const quantity = Number(formData.get('quantity'));

  if (quantity <= 0) {
    await removeCartLines(cartId, [lineId]);
  } else {
    await updateCartLines(cartId, [{ id: lineId, quantity }]);
  }
  revalidatePath('/', 'layout');
}

// Remove button
export async function removeItem(formData) {
  const cartId = await getCartId();
  if (!cartId) return;
  await removeCartLines(cartId, [formData.get('lineId')]);
  revalidatePath('/', 'layout');
}