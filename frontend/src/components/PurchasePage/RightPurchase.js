import React from 'react';

const RightPurchase = ({ items = [] }) => {
  const subtotal = items.reduce((sum, it) => {
    const qty = it.qty || it.quantity || 1;
    const price = it.price ?? it.product?.product_price ?? 0;
    return sum + qty * price;
  }, 0);

  return (
    <div className="space-y-5 bg-gray-50 p-6 rounded shadow-sm">
      <h2 className="text-xl font-bold">Order Summary</h2>

      {items.map((it) => {
        const qty = it.qty || it.quantity || 1;
        const price = it.price ?? it.product?.product_price ?? 0;

        return (
          <div key={it.id} className="flex gap-4 border-b pb-4">
            {/* Custom shirt (front/back base64) */}
            {it.imageFront ? (
              <div className="w-28 flex flex-col gap-1">
                <img
                  src={it.imageFront}
                  alt="Front"
                  className="w-16 h-16 object-cover rounded border"
                  onError={(e) => (e.currentTarget.src = '/placeholder.jpg')}
                />
                <img
                  src={it.imageBack || it.imageFront}
                  alt="Back"
                  className="w-16 h-16 object-cover rounded border"
                  onError={(e) => (e.currentTarget.src = '/placeholder.jpg')}
                />
              </div>
            ) : (
              <img
                src={`http://localhost:8000/storage/${it.product?.product_img1}`}
                className="w-20 h-20 object-cover rounded border"
                alt={it.product?.product_title}
                onError={(e) => (e.currentTarget.src = '/placeholder.jpg')}
              />
            )}

            <div className="flex-1">
              <p className="font-medium text-sm">
                {it.title || it.product?.product_title}
              </p>
              <p className="text-xs text-gray-500">Qty: {qty}</p>
            </div>

            <div className="font-semibold text-sm whitespace-nowrap">
              Rs. {qty * price}
            </div>
          </div>
        );
      })}

      <div className="flex justify-between font-bold text-lg pt-4">
        <span>Total</span>
        <span>Rs. {subtotal}</span>
      </div>
    </div>
  );
};

export default RightPurchase;
