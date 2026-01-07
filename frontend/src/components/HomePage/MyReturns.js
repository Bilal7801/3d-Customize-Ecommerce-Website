import React from 'react';

const mockReturns = [
  {
    id: 'RET123456',
    productName: 'Flex Fit Hoodie',
    productImage: '/images/products/hoodie.jpg',
    type: 'Return',
    reason: 'Size too small',
    status: 'Processed',
    date: '2025-06-02',
  },
  {
    id: 'CAN123457',
    productName: 'Training Tank Top',
    productImage: '/images/products/tanktop.jpg',
    type: 'Cancellation',
    reason: 'Changed my mind',
    status: 'Pending',
    date: '2025-06-09',
  },
];

const MyReturns = () => {
  return (
    <div className="p-6 py-16 mt-10 mb-16 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Returns & Cancellations</h2>

      {mockReturns.length === 0 ? (
        <p className="text-gray-600">You have no returns or cancellations yet.</p>
      ) : (
        <div className="space-y-6">
          {mockReturns.map(entry => (
            <div
              key={entry.id}
              className="border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition bg-white"
            >
              <div className="flex items-center gap-4 mb-3">
                <img
                  src={entry.productImage}
                  alt={entry.productName}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{entry.productName}</h3>
                  <p className="text-sm text-gray-500">
                    {entry.type} ID: {entry.id} • {entry.date}
                  </p>
                </div>
              </div>

              <div className="mb-2">
                <span className="text-sm text-gray-600">Reason:</span>
                <p className="text-sm text-gray-700">{entry.reason}</p>
              </div>

              <div>
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${
                    entry.status === 'Processed'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {entry.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReturns;
