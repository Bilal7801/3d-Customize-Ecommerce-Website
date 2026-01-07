import React, { useState, useEffect } from "react";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";

const MyAccount = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    country: "",
    city: "",
    state: "",
    address: "",
    zip: ""
  });

  useEffect(() => {
    axios.get("profile")
      .then(res => {
        const { user, profile } = res.data;
        setForm({
          fullName: `${user.first_name} ${user.last_name}`,
          email: user.email || "",
          phone: profile?.phone || "",
          gender: profile?.gender || "",
          dob: profile?.dob || "",
          country: profile?.country || "",
          city: profile?.city || "",
          state: profile?.state || "",
          address: profile?.address || "",
          zip: profile?.zip || ""
        });
      })
      .catch(err => {
        console.error("Profile fetch error:", err);
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setForm({
      fullName: "",
      email: "",
      phone: "",
      gender: "",
      dob: "",
      country: "",
      city: "",
      state: "",
      address: "",
      zip: ""
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Split full name
    const [first_name, ...lastParts] = form.fullName.trim().split(" ");
    const last_name = lastParts.join(" ") || "";

    axios.put("profile", {
      first_name,
      last_name,
      email: form.email,
      phone: form.phone,
      gender: form.gender,
      dob: form.dob,
      country: form.country,
      city: form.city,
      state: form.state,
      address: form.address,
      zip: form.zip
    })
      .then(res => {
        console.log("Profile updated:", res.data.message);
      })
      .catch(err => {
        console.error("Profile update error:", err);
      });
  };


  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-10 text-gray-800 dark:text-white -ml-2">
        Manage My Account
      </h2>

      {/* Card Container */}
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Personal Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Gender</label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                  <option>Prefer not to say</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={form.dob}
                  onChange={handleChange}
                  placeholder="Select date of birth"
                  className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Address Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">Address Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Country</label>
                <input
                  type="text"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  placeholder="Enter your country"
                  className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">City</label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Enter your city"
                  className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">State / Province</label>
                <input
                  type="text"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  placeholder="Enter your state or province"
                  className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Postal / Zip Code</label>
                <input
                  type="text"
                  name="zip"
                  value={form.zip}
                  onChange={handleChange}
                  placeholder="Enter your zip or postal code"
                  className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Street Address</label>
                <textarea
                  name="address"
                  rows="2"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Enter your street address"
                  className="w-full px-4 py-2 border rounded-md resize-none dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            {/* Reset Button */}
            <button
              type="button"
              onClick={() => navigate(-1)} // 👈 This goes back to the previous page
              className="relative border-2 border-black dark:border-white bg-black text-white dark:bg-black dark:text-white px-6 py-2 rounded-full text-sm cursor-pointer overflow-hidden group"
            >
              <span className="relative z-[2] font-medium">Back</span>
              <div className="absolute inset-0 w-0 transition-all duration-300 ease-in-out bg-white/20 group-hover:w-full"></div>
            </button>

            {/* Save Changes Button */}
            <button
              type="submit"
              className="relative border-2 border-indigo-600 dark:border-orange-500 bg-indigo-600 dark:bg-orange-500 text-white px-6 py-2 rounded-full text-sm cursor-pointer overflow-hidden group"
            >
              <span className="relative z-[2] font-medium">Save Changes</span>
              <div className="absolute inset-0 w-0 transition-all duration-300 ease-in-out bg-white/20 group-hover:w-full"></div>
            </button>
          </div>



        </form>
      </div>
    </div>

  );
};

export default MyAccount;
