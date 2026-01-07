import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Added useNavigate
import api from "../axios";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../components/AuthContext";

const LogIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate(); // ✅ Initialize navigate

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { setUser } = useAuth(); // Add this line above handleSubmit

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await api.post("/login", formData);

      const token = response.data.token;
      localStorage.setItem("token", token);
      setMessage(response.data.message);

      // ✅ Fetch user data after login and set in context
      const userResponse = await api.get("/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(userResponse.data); // 🔥 This updates Nav immediately

      navigate("/");

    } catch (err) {
      if (err.response?.data?.errors) {
        const errors = Object.values(err.response.data.errors).flat().join(", ");
        setError(errors);
      } else {
        setError(err.response?.data?.message || "Login failed.");
      }
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError("");
  //   setMessage("");

    // try {
      // await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
      //   withCredentials: true,
      // });

      // const response = await axios.post(
      //   "http://localhost:8000/api/login",
      //   formData
      //   // { withCredentials: true }
      // );

      // const response = await api.post('/login', formData);


      // 2) Store token and set defaults for all future calls
  //     const token = response.data.token;
  //     localStorage.setItem("token", token);

  //     setMessage(response.data.message);

  //     // ✅ Navigate to homepage after login
  //     navigate("/");


  //   } catch (err) {
  //     if (err.response?.data?.errors) {
  //       const errors = Object.values(err.response.data.errors).flat().join(", ");
  //       setError(errors);
  //     } else {
  //       setError(err.response?.data?.message || "Login failed.");
  //     }
  //   }
  // };

  return (
    <>
      <style>{`
        .custom-placeholder::placeholder {
          text-indent: 10px !important;
        }
      `}</style>

      <div className="flex justify-center items-center dark:bg-gray-900 font-DM-sans">
        <div className="bg-white dark:bg-black p-10 md:p-32 rounded-lg w-full flex flex-col md:flex-row gap-8">

          {/* Registered Customers */}
          <div className="w-full md:w-1/2">
            <h2 className="text-xl font-black dark:text-white mb-5">
              REGISTERED CUSTOMERS
            </h2>
            <p className="text-gray-500 italic dark:text-gray-300 text-sm mb-6">
              If you have an account, sign in with your email address.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="pr-[5px]">
                <label className="block text-sm font-medium dark:text-gray-200 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white p-2 pl-[15px] rounded-full mt-1 mb-3 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                  required
                />
              </div>

              <div className="pr-[5px] relative">
                <label className="block text-sm font-medium dark:text-gray-200 mb-2">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white p-2 pl-[15px] rounded-full mt-1 mb-3 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-[42px] text-sm text-gray-600 dark:text-gray-300"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <div className="min-h-[25px]">
                {message && <p className="text-green-600">{message}</p>}
                {error && <p className="text-red-600">{error}</p>}
              </div>

              <div className="flex items-center space-x-8 mt-3">
                <button
                  type="submit"
                  className="relative border-2 bg-black border-black px-10 py-2 rounded-full text-sm 
                             cursor-pointer overflow-hidden group flex items-center justify-center text-white"
                >
                  <span className="relative z-[2] font-medium">Sign In</span>
                  <div className="absolute inset-0 w-0 transition-all duration-300 ease-in-out 
                              bg-white/20 group-hover:w-full"></div>
                </button>

                <p className="text-gray-800 dark:text-gray-300 flex items-center">
                  <Link to="/forgot-password" className="hover:underline">
                    Forgot Your Password?
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Vertical Divider */}
          <div className="hidden md:block w-[1px] ml-[25px] bg-gray-300 self-stretch"></div>

          {/* New Customers */}
          <div className="w-full md:w-1/2 ml-[12px]">
            <h2 className="text-xl font-black dark:text-white mb-5">NEW CUSTOMERS</h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-8">
              By creating an account with our store, you will be able to move through the checkout process faster,
              store multiple shipping addresses, view and track your orders in your account, and more.
            </p>

            <div className="flex items-center flex-wrap gap-4 mb-4">
              <Link
                to="/signin"
                className="relative border-2 bg-blue-800 dark:bg-blue-800 border-blue-800 dark:border-blue-700 px-4 py-2 rounded-full text-sm cursor-pointer overflow-hidden group flex items-center justify-center text-white"
              >
                <span className="relative z-[2] font-medium">Create an Account</span>
                <div className="absolute inset-0 w-0 transition-all duration-300 ease-in-out bg-white/10 group-hover:w-full"></div>
              </Link>

              <p className="text-gray-800 dark:text-gray-300 text-sm underline">OR</p>

              <button className="relative border-2 bg-white dark:bg-gray-800 border-gray-800 dark:border-gray-600 px-4 py-2 rounded-full text-sm cursor-pointer overflow-hidden group flex items-center gap-2">
                <span className="relative z-[2] flex items-center">
                  <FcGoogle className="text-lg" />
                  <span className="ml-1 font-medium text-gray-800 dark:text-white">Sign in With Google</span>
                </span>
                <div className="absolute inset-0 w-0 transition-all duration-300 ease-in-out bg-black/10 group-hover:w-full"></div>
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default LogIn;
