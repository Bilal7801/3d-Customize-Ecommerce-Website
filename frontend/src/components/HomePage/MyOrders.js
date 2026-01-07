import React, { useEffect, useState } from 'react';
import axios from '../../axios'; // ✅ Make sure this has baseURL + withCredentials

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); // Optional: show user info or debug

  useEffect(() => {
    // First fetch user info to confirm login
    axios.get('/user')
      .then(res => {
        setUser(res.data); // optional
        return axios.get('/orders');
      })
      .then(res => {
        setOrders(res.data.orders || []);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setOrders([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 py-16 mt-10 mb-16 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">My Orders</h2>

      {loading ? (
        <p className="text-gray-600">Loading your orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-600">You have no orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map(order => {
            let parsedItems = [];
            try {
              const parsed = typeof order.data === 'string' ? JSON.parse(order.data) : order.data;
              parsedItems = parsed?.items || [];
            } catch (err) {
              console.warn("Failed to parse order data:", err);
            }

            return (
              <div
                key={order.id}
                className="border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-gray-500">
                      Order ID: <span className="font-medium text-gray-700">{order.id}</span>
                    </p>
                    <p className="text-sm text-gray-500">Date: {new Date(order.created_at).toLocaleString()}</p>
                  </div>
                  <div>
                    <span className={`text-sm px-3 py-1 rounded-full ${order.status === 'Delivered'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                      }`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                {parsedItems.length > 0 ? (
                  <div className="space-y-2">
                    {parsedItems.map((item, index) => (
                      <div key={index} className="text-sm text-gray-700">
                        • {item.name || item.title || 'Unnamed Product'} <span className="text-gray-500">(Qty: {item.quantity || 1})</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-gray-500 italic">No items found in this order.</div>
                )}

                <div className="mt-4 text-sm font-semibold text-gray-800">
                  Total: ${Number(order.total).toFixed(2)}
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
