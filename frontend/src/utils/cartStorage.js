/* ------------------------------------------------------------------
   Fit‑Forge local‑cart helper
   ------------------------------------------------------------------
   • Stores items in localStorage (JSON)
   • Each item schema is { id, title, price, qty, imageFront?, imageBack?, … }
   • Uses KEY = 'fitforge_cart'
   • Optional nanoid helper for generating unique IDs
------------------------------------------------------------------- */

import { nanoid } from 'nanoid';

const KEY = 'fitforge_cart';

/* ---------- low‑level ---------- */
const read = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
};

const write = (cart) => localStorage.setItem(KEY, JSON.stringify(cart));

/* ---------- public api ---------- */
export const getCart = () => read();

export const saveCart = (cart) => write(cart);

/**
 * addToCart(item)
 * - If item.id is missing, we generate one with nanoid.
 * - Returns the updated cart array.
 */
export const addToCart = (item) => {
  const cart = read();
  cart.push({ id: item.id || nanoid(), ...item });
  write(cart);
  return cart;
};

/**
 * updateQty(id, qty)
 * - qty is clamped to minimum 1
 * - Returns updated cart array
 */
export const updateQty = (id, qty) => {
  const newQty = Math.max(1, qty);
  const cart = read().map((it) =>
    it.id === id ? { ...it, qty: newQty } : it
  );
  write(cart);
  return cart;
};

/**
 * removeItem(id)
 * - Removes a cart entry by its id.
 * - Returns updated cart array
 */
export const removeItem = (id) => {
  const cart = read().filter((it) => it.id !== id);
  write(cart);
  return cart;
};
