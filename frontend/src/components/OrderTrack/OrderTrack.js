import React, { useState } from 'react';
import orderPic from '../../assets/images/order-pic.jpg';

const OrderTrack = () => {
  const [trackingId, setTrackingId] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const [error, setError] = useState('');

  const handleTrackOrder = async (e) => {
    e.preventDefault();

    // Simulated flow: admin-controlled phase + API-controlled phase
    if (trackingId === '54879861231') {
      // Simulate admin part (phases 1 and 2)
      const adminPhases = [
        { status: 'Order Placed', date: 'Jun 10th, 2025' },
        { status: 'Order Packed', date: 'Jun 11th, 2025' }
      ];

      // Simulate API response for courier part (phases 3–5)
      const courierPhases = [
        { status: 'In Transit', date: 'Jun 12th, 2025' },
        { status: 'Out for delivery', date: 'Jun 13th, 2025' },
        { status: 'Delivered', date: 'Jun 13th, 2025' }
      ];

      setTrackingData({
        orderNumber: '54879861231',
        orderPlaced: 'Jun 10th, 2025',
        orderDelivered: 'Jun 13th, 2025',
        numberOfItems: '2 items',
        status: 'Delivered',
        history: [...adminPhases, ...courierPhases]
      });

      setError('');
    } else {
      setTrackingData(null);
      setError('Tracking ID not found. Please check and try again.');
    }
  };

  const getStatusIcon = (status, isLast = false) => {
    const colorClass = isLast ? 'text-green-500' : 'text-blue-500';
    const sizeClass = 'w-5 h-5';

    switch (status) {
      case 'Order Placed':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={`${sizeClass} ${colorClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        );
      case 'Order Packed':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={`${sizeClass} ${colorClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        );
      case 'In Transit':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={`${sizeClass} ${colorClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
          </svg>
        );
      case 'Out for delivery':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={`${sizeClass} ${colorClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        );
      case 'Delivered':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={`${sizeClass} ${colorClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      default:
        return (
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Banner */}
      <div className="relative w-full rounded-xl overflow-hidden mb-10 shadow-md" style={{ height: '256px' }}>
        <div className="absolute inset-0">
          <img src={orderPic} alt="Order tracking" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl font-bold tracking-wide text-white">Tracking</h1>
          <p className="mt-2 text-white text-sm">Check the status of your orders anytime</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleTrackOrder} className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Enter Tracking ID"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button type="submit" className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition">
          Track
        </button>
      </form>

      {error && <p className="text-red-500 text-center mb-6">{error}</p>}

      {trackingData && (
        <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div>
              <p className="text-gray-600 text-sm">Order Number</p>
              <p className="font-medium">{trackingData.orderNumber}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Order Placed</p>
              <p className="font-medium">{trackingData.orderPlaced}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Order Delivered</p>
              <p className="font-medium">{trackingData.orderDelivered}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">No of items</p>
              <p className="font-medium">{trackingData.numberOfItems}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-gray-600 text-sm">Status</p>
              <p className="font-medium text-green-600">{trackingData.status}</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-bold text-lg mb-4">Order Tracking</h3>
            <div className="space-y-3">
              {trackingData.history.map((event, index) => {
                const isLast = index === trackingData.history.length - 1;
                return (
                  <div key={index} className="flex items-start">
                    <div className="flex flex-col items-center mr-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isLast ? 'bg-green-100' : 'bg-blue-100'
                      }`}>
                        {getStatusIcon(event.status, isLast)}
                      </div>
                      {index < trackingData.history.length - 1 && (
                        <div className="w-0.5 h-10 bg-gray-300 mt-1"></div>
                      )}
                    </div>
                    <div className="pb-4">
                      <p className="font-medium">{event.status}</p>
                      <p className="text-sm text-gray-500">{event.date}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Footer Text */}
      <div className="mt-16 text-center text-sm text-gray-500 leading-6">
        <p>For any delivery-related queries, please contact our support team or check your order status regularly.</p>
        <p className="mt-2">Tracking data may take some time to update depending on the courier service.</p>
        <p className="mt-1 italic">We are committed to delivering your order safely and on time.</p>
      </div>
    </div>
  );
};

export default OrderTrack;
