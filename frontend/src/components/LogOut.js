// src/components/LogOut.jsx
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Make sure this path is correct
import cartStore from '../store/cartStore'; // ✅ Import cart store

const LogOut = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:8000/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      // ✅ Clear cart data
      cartStore.clearCart();
      localStorage.removeItem("fitforge_cart");

      // ✅ Clear auth data
      localStorage.removeItem("token");
      setUser(null);

      navigate("/");
    } catch (error) {
      console.error("Logout failed", error.response?.data || error.message);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="hover:underline text-black dark:text-white"
    >
      Logout
    </button>
  );
};

export default LogOut;
