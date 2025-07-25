import React from "react";
import { LogOut } from "lucide-react";
import colors from "../../src/utils/colors";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router";
import { Toaster } from "react-hot-toast";

const Logout = () => {
  const { logout, isAuthenticated, user } = useAuth();
  const handleLogout = async () => {
    console.log("Logging out...");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/logout`,
        {},
        { withCredentials: true }
      );
      logout();
      <Navigate to="/" />;
      console.log(isAuthenticated, user);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  };
  return (
    <div>
      <Toaster />
      <button
        onClick={handleLogout}
        className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-100 transform hover:scale-105 active:scale-95 shadow-lg cursor-pointer`}
        style={{ backgroundColor: colors.primary, color: "white" }}
      >
        <LogOut
          color="#FFFFFF"
          className="h-5 w-4 mr-2 text-white text-oppacity-100"
        />
        Logout
      </button>
    </div>
  );
};

export default Logout;
