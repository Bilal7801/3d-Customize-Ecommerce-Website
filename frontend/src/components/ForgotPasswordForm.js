import React, { useState } from "react";
import api from "../axios";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await api.post("/forgot-password", { email });
      setMessage(response.data.message || "Reset link sent to your email.");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to send reset link. Try again."
      );
    }
  };

  return (
    <div className="min-h-screen dark:bg-gray-900 flex justify-center items-start text-black dark:text-white px-4 mt-11">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-32 w-full max-w-5xl relative">
        {/* Left side text */}
        <div className="text-center px-4">
          <h2 className="font-bold text-2xl mb-6">FORGOT PASSWORD</h2>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Enter your email address below and we’ll send you a link to reset
            your password.
          </p>
        </div>

        {/* Divider */}
        <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-[0.5px] bg-gray-200 dark:bg-gray-600"></div>
        <div className="md:hidden w-full h-[0.5px] bg-gray-300 dark:bg-gray-600 my-6"></div>

        {/* Right side form */}
        <div className="text-center px-4">
          <h2 className="font-bold text-2xl mb-9">RESET PASSWORD</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-400 dark:border-gray-600 rounded-full bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
            />

            {/* Message/Error */}
            <div className="min-h-[25px] text-left">
              {message && <p className="text-green-600 text-sm">{message}</p>}
              {error && <p className="text-red-600 text-sm">{error}</p>}
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-4 mt-4">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="relative border-2 border-black dark:border-white flex-1 py-2 rounded-full text-sm cursor-pointer overflow-hidden group text-black dark:text-white"
              >
                <span className="relative z-[2] font-medium">Back</span>
                <div className="absolute inset-0 w-0 transition-all duration-300 ease-in-out bg-black/10 dark:bg-white/10 group-hover:w-full"></div>
              </button>

              <button
                type="submit"
                className="relative border-2 border-black dark:border-orange-500 bg-black dark:bg-orange-500 text-white flex-1 py-2 rounded-full text-sm cursor-pointer overflow-hidden group"
              >
                <span className="relative z-[2] font-medium">Send Link</span>
                <div className="absolute inset-0 w-0 transition-all duration-300 ease-in-out bg-white/20 group-hover:w-full"></div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
