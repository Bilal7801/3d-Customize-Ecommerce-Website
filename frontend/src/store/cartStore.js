import { proxy } from 'valtio';

const cartStore = proxy({
  items: [],

  addToCart(product) {
    const existing = cartStore.items.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cartStore.items.push({ ...product, quantity: 1 });
    }
  },

  updateQuantity(id, type) {
    const item = cartStore.items.find(p => p.id === id);
    if (!item) return;
    if (type === 'inc') item.quantity += 1;
    if (type === 'dec' && item.quantity > 1) item.quantity -= 1;
  },

  removeFromCart(id) {
    cartStore.items = cartStore.items.filter(p => p.id !== id);
  },

  clearCart() {
    cartStore.items = [];
  }
});

export default cartStore;
