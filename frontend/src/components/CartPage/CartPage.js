import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import Featured from '../../components/HomePage/Featured';
import bannerImg from '../../assets/images/cartpic.jpg';
import api from '../../axios';
import { getCart } from '../../utils/cartStorage'; // only used initially

const CartPage = () => {
  const [apiCart, setApiCart] = useState([]);
  const [snapCart, setSnapCart] = useState([]);
  const navigate = useNavigate();
  const base = "http://localhost:8000/";

  /* ------------------ Fetch Backend Cart (Products) ------------------ */
  const fetchApiCart = async () => {
    try {
      const res = await api.get('/cart');
      setApiCart(res.data);
    } catch (err) {
      console.error('API cart load error → fallback to local only', err.response || err);
    }
  };

  /* ------------------ Fetch Snapshot Designs Cart ------------------ */
  const fetchDesigns = async () => {
    try {
      const res = await api.get('/cart/designs');
      setSnapCart(res.data.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        qty: item.quantity,
        imageFront: base + item.image_front,
        imageBack: base + item.image_back,
      })));
    } catch (err) {
      console.error("❌ Failed to load designs:", err);
    }
  };

  /* ------------------ Lifecycle ------------------ */
  useEffect(() => {
    fetchApiCart();
    fetchDesigns();
  }, []);

  /* ---------------- API Cart Handlers ---------------- */
  const updateApiQty = async (item, dir) => {
    const qty = item.quantity + (dir === 'inc' ? 1 : -1);
    if (qty < 1) return;
    try {
      await api.put(`/cart/${item.id}`, { quantity: qty });
      setApiCart((prev) =>
        prev.map((it) => (it.id === item.id ? { ...it, quantity: qty } : it))
      );
    } catch (err) {
      console.error('API qty update error', err.response || err);
    }
  };

  const deleteApiItem = async (id) => {
    try {
      await api.delete(`/cart/${id}`);
      setApiCart((prev) => prev.filter((it) => it.id !== id));
    } catch (err) {
      console.error('API delete error', err.response || err);
    }
  };

  /* ---------------- Snapshot Cart Handlers ---------------- */
  const changeSnapQty = async (id, dir) => {
    const it = snapCart.find((i) => i.id === id);
    if (!it) return;

    const newQty = Math.max(1, it.qty + (dir === 'inc' ? 1 : -1));

    try {
      await api.put(`/designs/${id}`, { quantity: newQty });
      console.log(`✅ Design ${id} quantity updated to ${newQty}`);
      fetchDesigns(); // 🔄 refresh UI
    } catch (err) {
      console.error(`❌ Failed to update design quantity`, err.response?.data || err.message);
    }
  };

  const deleteSnapItem = async (id) => {
    try {
      await api.delete(`/designs/${id}`);
      console.log("✅ Design deleted from backend");
      fetchDesigns(); // 🔄 refresh UI
    } catch (err) {
      console.error("❌ Failed to delete design from backend:", err.response?.data || err.message);
    }
  };

  /* ---------------- Checkout & Subtotal ---------------- */
  const subtotal =
    apiCart.reduce((s, it) => s + it.quantity * (parseFloat(it.product?.product_price) || 0), 0) +
    snapCart.reduce((s, it) => s + it.qty * (parseFloat(it.price) || 0), 0);

  const handleCheckout = () => {
    const allItems = [...apiCart, ...snapCart];
    if (!allItems.length) return;
    navigate('/purchase/cart', { state: { cart: allItems } });
  };

  /* ---------------- Render ---------------- */
  return (
    <>
      <div className="max-w-screen-xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-12">
        {/* LEFT SIDE */}
        <div className="md:col-span-2 space-y-8">
          <h2 className="text-3xl font-bold">Your cart</h2>
          <FreeShippingBar />

          {/* ---------- Cart Lines ---------- */}
          {apiCart.length + snapCart.length === 0 ? (
            <p className="text-lg text-gray-500">🛒 Your cart is empty</p>
          ) : (
            <>
              {apiCart.map((it) => (
                <BackendLine
                  key={it.id}
                  item={it}
                  onInc={() => updateApiQty(it, 'inc')}
                  onDec={() => updateApiQty(it, 'dec')}
                  onDel={() => deleteApiItem(it.id)}
                />
              ))}

              {snapCart.map((it) => (
                <SnapshotLine
                  key={it.id}
                  item={it}
                  onInc={() => changeSnapQty(it.id, 'inc')}
                  onDec={() => changeSnapQty(it.id, 'dec')}
                  onDel={() => deleteSnapItem(it.id)}
                />
              ))}
            </>
          )}

          {/* Recommendations */}
          <Recommendations rows={apiCart.slice(0, 2)} />
        </div>

        {/* RIGHT SIDE */}
        <SummaryBox
          subtotal={subtotal}
          disabled={!apiCart.length && !snapCart.length}
          onCheckout={handleCheckout}
        />
      </div>

      {/* Banner + Featured */}
      <Banner />
      <div className="my-10">
        <Featured />
      </div>
    </>
  );
};

/* -------------------- Sub‑components -------------------- */
const FreeShippingBar = () => (
  <div className="bg-gray-100 p-4 rounded">
    <p className="text-sm font-medium mb-2">Your order is eligible for free shipping!</p>
    <div className="w-full h-1 bg-gray-300 rounded">
      <div className="h-full bg-black w-[90%] rounded" />
    </div>
  </div>
);

const BackendLine = ({ item, onInc, onDec, onDel }) => (
  <div className="flex gap-6 border-b pb-6">
    <img
      src={`http://localhost:8000/storage/${item.product?.product_img1}`}
      onError={(e) => (e.currentTarget.src = '/placeholder.jpg')}
      alt={item.product?.product_title}
      className="w-24 h-24 object-cover rounded"
    />
    <div className="flex-1">
      <p className="text-sm text-gray-500">{item.product?.product_title}</p>
      <p className="text-sm">Color: {item.color || '-'}</p>
      <p className="text-sm">Size: {item.size || '-'}</p>
      <QtyBox qty={item.quantity} onInc={onInc} onDec={onDec} onDel={onDel} />
    </div>
    <div className="font-semibold">${item.product?.product_price}</div>
  </div>
);

const SnapshotLine = ({ item, onInc, onDec, onDel }) => (
  <div className="flex gap-6 border-b pb-6">
    <div className="w-32 flex flex-col gap-1">
      <img
        src={item.imageFront}
        alt="Front view"
        className="rounded"
        onError={(e) => (e.currentTarget.src = '/placeholder.jpg')}
      />
      <img
        src={item.imageBack || item.imageFront}
        alt="Back view"
        className="rounded"
        onError={(e) => (e.currentTarget.src = '/placeholder.jpg')}
      />
    </div>
    <div className="flex-1">
      <p className="font-medium">{item.title}</p>
      <QtyBox qty={item.qty} onInc={onInc} onDec={onDec} onDel={onDel} />
    </div>
    <div className="font-semibold w-20 text-right">${(item.qty * item.price).toFixed(2)}</div>
  </div>
);

const QtyBox = ({ qty, onInc, onDec, onDel }) => (
  <div className="mt-2 flex items-center gap-3">
    <div className="flex border rounded-full overflow-hidden">
      <button onClick={onDec} className="w-8">-</button>
      <span className="w-8 text-center select-none">{qty}</span>
      <button onClick={onInc} className="w-8">+</button>
    </div>
    <button onClick={onDel} className="text-gray-500 hover:text-black">
      <Trash2 size={18} />
    </button>
  </div>
);

const SummaryBox = ({ subtotal, disabled, onCheckout }) => (
  <div className="bg-white border rounded p-6 h-fit shadow-sm">
    <h3 className="text-xl font-semibold mb-4">Order summary</h3>
    <div className="border-t pt-4 text-sm text-gray-500">Tax included, shipping calculated at checkout.</div>
    <div className="flex justify-between font-semibold text-lg mt-8 mb-6">
      <span>Subtotal:</span>
      <span>${subtotal.toFixed(2)}</span>
    </div>
    <button
      onClick={onCheckout}
      disabled={disabled}
      className={`w-full py-2.5 rounded-full text-white font-semibold transition ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#5B2EFF] hover:bg-[#4a24d6]'}`}
    >
      Checkout
    </button>
  </div>
);

const Banner = () => (
  <div className="relative w-full h-64 mt-12 rounded-2xl overflow-hidden shadow-lg">
    <img src={bannerImg} alt="Cart banner" className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-black/50 flex items-center justify-end pr-16">
      <div className="text-white text-right space-y-2 max-w-md">
        <h2 className="text-3xl font-bold">Protect your purchase</h2>
        <p className="text-sm">For life's little mishaps</p>
        <button className="px-6 py-2.5 bg-white text-black rounded-full text-sm font-semibold">Learn more</button>
      </div>
    </div>
  </div>
);

const Recommendations = ({ rows }) => (
  <div className="mt-10">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold">You may also like…</h3>
      <div className="flex gap-2">
        <button className="p-2 border rounded-full"><ArrowLeft size={18} /></button>
        <button className="p-2 border rounded-full"><ArrowRight size={18} /></button>
      </div>
    </div>
    <div className="flex gap-4 overflow-x-auto scrollbar-hide">
      {rows.map((item, i) => (
        <div key={i} className="min-w-[260px] p-4 bg-gray-50 rounded shadow-sm flex gap-3 items-center">
          <img src={`http://localhost:8000/storage/${item.product?.product_img2}`} onError={(e) => (e.currentTarget.src = '/placeholder.jpg')} className="w-20 h-20 object-cover rounded" alt="rec" />
          <div className="flex-1">
            <p className="text-sm">{item.product?.product_title}</p>
            <p className="text-sm font-semibold">${item.product?.product_price}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default CartPage;
