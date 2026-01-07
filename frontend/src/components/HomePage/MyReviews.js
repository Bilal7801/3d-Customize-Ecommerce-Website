import React from 'react';
import { Star } from 'lucide-react'; // optional: replace or remove if you're not using Lucide

const mockReviews = [
  {
    id: 1,
    productName: 'Training Shorts',
    productImage: '/images/products/shorts.jpg',
    rating: 4,
    comment: 'Comfortable and breathable, perfect for gym.',
    date: '2025-06-03',
  },
  {
    id: 2,
    productName: 'Performance T-Shirt',
    productImage: '/images/products/tshirt.jpg',
    rating: 5,
    comment: 'Great quality and fit. Loved the fabric!',
    date: '2025-06-01',
  },
];

const MyReviews = () => {
  return (
    <div className="p-6 py-16 mt-10 mb-16 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Reviews</h2>

      {mockReviews.length === 0 ? (
        <p className="text-gray-600">You haven’t submitted any reviews yet.</p>
      ) : (
        <div className="space-y-6">
          {mockReviews.map(review => (
            <div
              key={review.id}
              className="border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition bg-white"
            >
              <div className="flex items-center gap-4 mb-3">
                <img
                  src={review.productImage}
                  alt={review.productName}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{review.productName}</h3>
                  <p className="text-sm text-gray-500">Reviewed on {review.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-yellow-500 mb-2">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    size={16}
                    fill={index < review.rating ? 'currentColor' : 'none'}
                    strokeWidth={1.5}
                  />
                ))}
              </div>

              <p className="text-gray-700 text-sm">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReviews;
