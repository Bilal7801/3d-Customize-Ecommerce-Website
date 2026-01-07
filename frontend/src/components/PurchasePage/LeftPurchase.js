import React, { useState } from 'react';
import api from '../../axios';
import { Phone } from 'lucide-react';
import { FaCcVisa } from 'react-icons/fa';

const LeftPurchase = ({ amount }) => {
  const [form, setForm] = useState({
    fullName: 'Test User',
    email: 'test@example.com',
    phone: '1234567890',
    country: 'US',
    firstName: 'Test',
    lastName: 'User',
    address: '123 Main St',
    apt: '',
    city: 'Anytown',
    state: 'CA',
    zip: '90210',
    paymentMethod: 'visa',
    cardNumber: '4111111111111111',
    expMonth: '12',
    expYear: '2031',
    cvv: '123'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const handleBlur = e => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmailError(/^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(value) ? '' : 'Please enter a valid email address');
    }
    if (name === 'phone') {
      setPhoneError(/^\+?[0-9]{10,15}$/.test(value) ? '' : 'Please enter a valid phone number');
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const isVisa = form.paymentMethod === 'visa';
      const payload = {
        amount,
        currency: 'USD',
        customer: { name: form.fullName, email: form.email, phone: form.phone },
        shipping: {
          country: form.country,
          firstName: form.firstName,
          lastName: form.lastName,
          address: form.address,
          apt: form.apt,
          city: form.city,
          state: form.state,
          zip: form.zip
        },
        paymentMethod: form.paymentMethod,
        ...(isVisa && {
          card: {
            number: form.cardNumber,
            expirationMonth: form.expMonth,
            expirationYear: form.expYear,
            securityCode: form.cvv
          }
        })
      };

      // Determine endpoint based on payment method (no duplicate 'api/')
      const endpoint = isVisa ? '/cybersource/pay' : '/cybersource/pay-cod';

      const { data } = await api.post(endpoint, payload);

      if (data.success || data.message?.toLowerCase().includes('success')) {
        setSuccessMsg('Payment successful!');
      } else {
        throw new Error(data.message || 'Payment failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };



  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto px-4 py-8">
      {/* Contact Section */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm space-y-4">
        <h2 className="text-2xl font-bold">Contact</h2>
        <input
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full p-3 border rounded-md"
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Email address"
          className="w-full p-3 border rounded-md"
          required
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          title="Please enter a valid email address"
        />
        {emailError && <p className="text-red-600 text-sm mt-1">{emailError}</p>}

        <div className="relative">
          <Phone className="absolute inset-y-0 left-0 ml-3 mt-3 text-gray-400" />
          <input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Phone number"
            className="w-full pl-10 p-3 border rounded-md"
            required
            pattern="^\+?[0-9]{10,15}$"
            title="Please enter a valid phone number (10-15 digits, optional + sign)"
          />
          {phoneError && <p className="text-red-600 text-sm mt-1">{phoneError}</p>}
        </div>


      </div>

      {/* Delivery Section */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm space-y-4">
        <h2 className="text-2xl font-bold">Delivery</h2>
        <select
          name="country"
          value={form.country}
          onChange={handleChange}
          className="w-full p-3 border rounded-md"
        >
          <option value="">Select Country</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="GB">United Kingdom</option>
          <option value="AU">Australia</option>
          <option value="DE">Germany</option>
          <option value="FR">France</option>
          <option value="PK">Pakistan</option>
          <option value="IN">India</option>
          <option value="CN">China</option>
          <option value="AE">United Arab Emirates</option>
        </select>
        <div className="grid grid-cols-2 gap-4">
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="First name"
            className="p-3 border rounded-md"
          />
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Last name"
            className="p-3 border rounded-md"
          />
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
            className="col-span-2 p-3 border rounded-md"
          />
          <input
            name="apt"
            value={form.apt}
            onChange={handleChange}
            placeholder="Apartment, suite, etc."
            className="col-span-2 p-3 border rounded-md"
          />
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City"
            className="p-3 border rounded-md"
          />
          <input
            name="state"
            value={form.state}
            onChange={handleChange}
            placeholder="State"
            className="p-3 border rounded-md"
          />
          <input
            name="zip"
            value={form.zip}
            onChange={handleChange}
            placeholder="ZIP code"
            className="p-3 border rounded-md"
          />
        </div>
      </div>

      {/* Payment Section */}
      <div className="bg-gray-50 p-6 rounded-lg space-y-4">
        <h2 className="text-2xl font-bold">Payment</h2>
        <p className="text-sm text-gray-600">All transactions are secure and encrypted.</p>

        <div className="space-y-4">
          {/* Credit Card Option */}
          <label className="flex items-center gap-2 p-4 border rounded-md bg-gray-100">
            <input
              type="radio"
              name="paymentMethod"
              value="visa"
              checked={form.paymentMethod === 'visa'}
              onChange={handleChange}
            />
            <span className="font-medium">Credit card</span>
            <FaCcVisa className="h-5 w-5 text-purple-600" />
          </label>
          {form.paymentMethod === 'visa' && (
            <div className="space-y-4">
              <input
                name="cardNumber"
                value={form.cardNumber}
                onChange={handleChange}
                placeholder="Card number"
                className="w-full p-3 border rounded-md"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  name="expMonth"
                  value={form.expMonth}
                  onChange={handleChange}
                  placeholder="MM"
                  className="p-3 border rounded-md"
                />
                <input
                  name="expYear"
                  value={form.expYear}
                  onChange={handleChange}
                  placeholder="YYYY"
                  className="p-3 border rounded-md"
                />
              </div>
              <input
                name="cvv"
                value={form.cvv}
                onChange={handleChange}
                placeholder="CVV"
                className="w-full p-3 border rounded-md"
              />
            </div>
          )}

          {/* Cash on Delivery Option */}
          <label className="flex items-center gap-2 p-4 border rounded-md bg-gray-100">
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={form.paymentMethod === 'cod'}
              onChange={handleChange}
            />
            <span className="font-medium">Cash on Delivery</span>
          </label>
        </div>
      </div>

      {/* Feedback & Submit */}
      {error && <p className="text-red-600">{error}</p>}
      {successMsg && <p className="text-green-600">{successMsg}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-purple-600 text-white rounded-md"
      >
        {loading ? 'Processing…' : 'Place Order'}
      </button>
    </form>
  );
};

export default LeftPurchase;
