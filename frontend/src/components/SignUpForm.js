import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios";

const SignUpForm = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreement, setAgreement] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleCreateAccount = async () => {
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (!agreement) {
      setError("You must agree to the terms.");
      return;
    }

    const signupData = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      agreement,
    };

    try {
      await api.post("/request-otp", signupData);

      localStorage.setItem("signupData", JSON.stringify(signupData));
      setMessage("Account created! Please check your email for the OTP.");
      setTimeout(() => {
        navigate("/verify-otp");
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };


  return (
    <div className="min-h-screen dark:bg-gray-900 flex justify-center items-start text-black dark:text-white">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-24 mt-32 relative">
        {/* Personal Information Section */}
        <div>
          <h2 className="font-bold text-xl mb-8">SIGN-IN INFORMATION</h2> {/* Update "SIGN-IN" here */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-3">First Name</label>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              style={{ width: "calc(100% + 3px)" }}
              className="pr-6 border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-gray-400 mb-1"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-3 text-sm">Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              style={{ width: "calc(100% + 3px)" }}
              className="border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            />
          </div>
        </div>

        {/* Vertical divider for desktop */}
        <div className="hidden md:block absolute left-[calc(50%+5px)] top-0 bottom-0 w-[0.5px] bg-gray-200 dark:bg-gray-600"></div>

        {/* Horizontal divider for mobile */}
        <div className="md:hidden w-full h-[0.5px] bg-gray-300 dark:bg-gray-600 my-6"></div>

        {/* Sign-In Information Section */}
        <div>
          <h2 className="font-bold text-xl mb-8">SIGN-IN INFORMATION</h2>
          <div className="mb-4">
            <label className="block font-medium mb-3 text-sm">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "calc(100% + 3px)" }}
              className="border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            />
          </div>
          <div className="mb-2">
            <label className="block font-medium mb-3 text-sm">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "calc(100% + 3px)" }}
                className="border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white mb-2"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
              >
                {showPassword ? "Hide" : "Show"}
              </button>

            </div>
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-3 text-sm">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ width: "calc(100% + 3px)" }}
                className="border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className="mb-4 flex items-start space-x-2">
            <input
              type="checkbox"
              id="agreement"
              className="accent-black dark:accent-white"
              checked={agreement}
              onChange={() => setAgreement(!agreement)}
            />
            <label htmlFor="agreement" className="text-sm text-gray-600">
              By using this form you agree with the storage and handling of your data by this website.
            </label>
          </div>

          {/* Message Display Area */}
          <div className="min-h-[25px] mb-3">
            {message && <p className="text-green-600 text-sm">{message}</p>}
            {error && <p className="text-red-600 text-sm">{error}</p>}
          </div>

          <div className="flex justify-center gap-4 mt-2">
            <button
              className="relative border-2 border-black dark:border-white flex-1 py-2 rounded-full text-sm cursor-pointer overflow-hidden group text-black dark:text-white"
              onClick={() => navigate("/login")}
            >
              <span className="relative z-[2] font-medium">Back</span>
              <div className="absolute inset-0 w-0 transition-all duration-300 ease-in-out bg-black/10 dark:bg-white/10 group-hover:w-full"></div>
            </button>

            <button
              className="relative border-2 border-black dark:border-orange-500 bg-black dark:bg-orange-500 text-white flex-1 py-2 rounded-full text-sm cursor-pointer overflow-hidden group"
              onClick={handleCreateAccount}
            >
              <span className="relative z-[2] font-medium">Create Account</span>
              <div className="absolute inset-0 w-0 transition-all duration-300 ease-in-out bg-white/20 group-hover:w-full"></div>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
