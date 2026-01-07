import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios";

const OtpVerification = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1].focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("Text").slice(0, 6);
    if (!/^\d*$/.test(pasteData)) return;
    const newOtp = [...otp];
    for (let i = 0; i < 6; i++) newOtp[i] = pasteData[i] || "";
    setOtp(newOtp);
    inputRefs.current[Math.min(pasteData.length - 1, 5)].focus();
  };

  const handleSubmit = async () => {
    setError("");
    setMessage("");
    const enteredOtp = otp.join("");
    const signupData = JSON.parse(localStorage.getItem("signupData"));
    if (!signupData || !signupData.email) {
      setError("Signup session expired. Please sign up again.");
      return;
    }

    try {
      const response = await api.post("/verify-otp", {
        email: signupData.email,
        otp: enteredOtp,
      });
      setMessage("OTP Verified Successfully!");
      setTimeout(() => {
        localStorage.removeItem("signupData");
        navigate("/login");
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP. Please try again.");
    }
  };

  const handleResendOtp = async () => {
    setError("");
    setMessage("");
    const signupData = JSON.parse(localStorage.getItem("signupData"));
    const userEmail = signupData ? signupData.email : null;

    if (!userEmail) {
      setError("Email is missing. Please sign up again.");
      return;
    }

    try {
      const response = await api.post("/api/resend-otp", { email: userEmail });
      setMessage(response.data.message);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong while resending OTP");
    }
  };

  return (
    <div className="min-h-screen dark:bg-gray-900 flex justify-center items-start text-black dark:text-white px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-32 w-full max-w-5xl relative">
        {/* Left side text */}
        <div className="text-center px-4">
          <h2 className="font-bold text-2xl mb-6">OTP VERIFICATION</h2>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            We have sent a 6-digit verification code to your email. Please enter the code below to verify your account.
          </p>
        </div>

        {/* Divider */}
        <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-[0.5px] bg-gray-200 dark:bg-gray-600"></div>
        <div className="md:hidden w-full h-[0.5px] bg-gray-300 dark:bg-gray-600 my-6"></div>

        {/* Right side inputs */}
        <div className="text-center px-4">
          <h2 className="font-bold text-xl mb-4">ENTER CODE</h2>
          <div className="flex justify-center space-x-2 mb-6" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                className="w-10 h-12 text-center text-lg font-semibold rounded border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                style={{ caretColor: "transparent" }}
              />
            ))}
          </div>

          {/* Messages */}
          <div className="min-h-[25px] mb-4">
            {message && <p className="text-green-600 text-sm">{message}</p>}
            {error && <p className="text-red-600 text-sm">{error}</p>}
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => window.history.back()}
              className="relative border-2 border-black dark:border-white flex-1 py-2 rounded-full text-sm cursor-pointer overflow-hidden group text-black dark:text-white"
            >
              <span className="relative z-[2] font-medium">Back</span>
              <div className="absolute inset-0 w-0 transition-all duration-300 ease-in-out bg-black/10 dark:bg-white/10 group-hover:w-full"></div>
            </button>

            <button
              onClick={handleSubmit}
              className="relative border-2 border-black dark:border-orange-500 bg-black dark:bg-orange-500 text-white flex-1 py-2 rounded-full text-sm cursor-pointer overflow-hidden group"
            >
              <span className="relative z-[2] font-medium">Submit</span>
              <div className="absolute inset-0 w-0 transition-all duration-300 ease-in-out bg-white/20 group-hover:w-full"></div>
            </button>
          </div>

          {/* Resend Code */}
          <div className="text-center mt-6">
            <button
              onClick={handleResendOtp}
              className="text-sm underline cursor-pointer text-black dark:text-white hover:text-gray-800 dark:hover:text-gray-300"
            >
              Resend Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
