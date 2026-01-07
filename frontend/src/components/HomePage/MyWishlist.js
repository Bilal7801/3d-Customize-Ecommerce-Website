import React from 'react';

const mockWishlist = [
  {
    id: 1,
    name: 'Slim Fit Joggers',
    price: 35.99,
    image: '/images/products/joggers.jpg',
    inStock: true,
  },
  {
    id: 2,
    name: 'Oversized Hoodie',
    price: 49.99,
    image: '/images/products/hoodie.jpg',
    inStock: false,
  },
];

const MyWishlist = () => {
  return (
    <div className="p-6 py-16 mt-10 mb-16 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Wishlist</h2>

      {mockWishlist.length === 0 ? (
        <p className="text-gray-600">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {mockWishlist.map(product => (
            <div
              key={product.id}
              className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition bg-white"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <h3 className="text-lg font-semibold text-gray-700">{product.name}</h3>
              <p className="text-sm text-gray-500 mb-2">${product.price.toFixed(2)}</p>
              <p className={`text-xs font-medium ${
                product.inStock ? 'text-green-600' : 'text-red-500'
              }`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </p>
              <div className="mt-4 flex gap-2">
                <button className="px-3 py-1 text-sm bg-black text-white rounded-lg hover:bg-gray-800">
                  Add to Cart
                </button>
                <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyWishlist;
