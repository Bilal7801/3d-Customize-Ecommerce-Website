import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPasswordForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = decodeURIComponent(searchParams.get("token") || "");
  const urlEmail = decodeURIComponent(searchParams.get("email") || "");

  const [email, setEmail] = useState(urlEmail);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Password visibility state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (urlEmail) setEmail(urlEmail.toLowerCase().trim());
  }, [urlEmail]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/reset-password", {
        token,
        email: email.toLowerCase().trim(),
        password,
        password_confirmation: confirmPassword,
      });

      setMessage(response.data.message || "Password reset successful!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.errors?.token?.[0] ||
        "Failed to reset password. Token may be invalid or expired.";
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen dark:bg-gray-900 flex justify-center items-start text-black dark:text-white px-4 mt-11">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-32 w-full max-w-5xl relative">
        {/* Left Side */}
        <div className="text-center px-4">
          <h2 className="font-bold text-2xl mb-6">RESET PASSWORD</h2>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Enter your new password below to reset access to your account.
          </p>
        </div>

        {/* Divider */}
        <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-[0.5px] bg-gray-200 dark:bg-gray-600"></div>
        <div className="md:hidden w-full h-[0.5px] bg-gray-300 dark:bg-gray-600 my-6"></div>

        {/* Right Side Form */}
        <div className="text-center px-4">
          <h2 className="font-bold text-2xl mb-9">NEW CREDENTIALS</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              readOnly
              className="w-full px-4 py-2 border border-gray-400 dark:border-gray-600 rounded-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white cursor-not-allowed"
            />

            {/* Password Field */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="New Password"
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-400 dark:border-gray-600 rounded-full bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 dark:text-gray-300 focus:outline-none"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Confirm Password Field */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                required
                placeholder="Confirm Password"
                minLength={6}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-400 dark:border-gray-600 rounded-full bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 dark:text-gray-300 focus:outline-none"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Message/Error */}
            <div className="min-h-[25px]">
              {message && <p className="text-green-600 text-sm">{message}</p>}
              {error && <p className="text-red-600 text-sm">{error}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="relative border-2 border-black dark:border-orange-500 bg-black dark:bg-orange-500 text-white w-full py-2 rounded-full text-sm cursor-pointer overflow-hidden group"
            >
              <span className="relative z-[2] font-medium">Reset Password</span>
              <div className="absolute inset-0 w-0 transition-all duration-300 ease-in-out bg-white/20 group-hover:w-full"></div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
