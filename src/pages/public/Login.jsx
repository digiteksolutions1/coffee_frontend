import { useState } from "react";
import { Eye, EyeOff, Coffee } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Navigate, useNavigate } from "react-router";
import colors from "../../utils/colors";

export default function LoginScreen() {
  const navigate = useNavigate();
  const { isAuthenticated, user, login } = useAuth();
  // const base_url = import.meta.env.VITE_BASE_URL;
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedField, setFocusedField] = useState(null);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here
    try {
      const response = await axios.post(
        `https://nice-bohr.212-227-199-118.plesk.page/api/v1/login`,
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      );
      toast.success(response?.data?.message);
      if (response?.status == 200 && response.data.data.token) {
        login(response.data.data.token);
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  };
  return (
    <>
      <Toaster />
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#F9FBFD" }}
      >
        <div
          className="max-w-md w-full p-8 rounded-xl shadow-md"
          style={{ backgroundColor: colors.background }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-3">
              <Coffee style={{ color: colors.primary }} className="h-10 w-10" />
            </div>
            <h1 className="text-2xl font-medium" style={{ color: colors.text }}>
              Online Virtual Coffee
            </h1>
            <p className="mt-2" style={{ color: colors.primary }}>
              Sign in to your account
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-1"
                style={{ color: colors.text }}
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                className="w-full px-4 py-2 rounded-lg outline-none transition-all duration-200"
                style={{
                  backgroundColor: colors.background,
                  border: `1px solid ${
                    focusedField === "email" ? colors.primary : colors.lightGray
                  }`,
                  color: colors.text,
                  boxShadow:
                    focusedField === "email"
                      ? `0 0 0 2px rgba(30, 144, 255, 0.1)`
                      : "none",
                }}
                placeholder="your@email.com"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1"
                style={{ color: colors.text }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-4 py-2 rounded-lg outline-none transition-all duration-200"
                  style={{
                    backgroundColor: colors.background,
                    border: `1px solid ${
                      focusedField === "password"
                        ? colors.primary
                        : colors.lightGray
                    }`,
                    color: colors.text,
                    boxShadow:
                      focusedField === "password"
                        ? `0 0 0 2px rgba(30, 144, 255, 0.1)`
                        : "none",
                  }}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center hover:opacity-80"
                  style={{ color: colors.primary }}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Eye className="h-5 w-5" aria-hidden="true" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <a
                href="#"
                className="text-sm hover:underline"
                style={{ color: colors.primary }}
              >
                Forgot your password?
              </a>
            </div>

            {/* Login Button */}
            <div>
              <button
                type="submit"
                className="w-full font-medium py-2 px-4 rounded-lg transition duration-200 ease-in-out hover:bg-opacity-90 active:scale-[0.98] cursor-pointer"
                style={{
                  backgroundColor: colors.primary,
                  color: "white",
                }}
              >
                Sign In
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center mt-4">
              <p style={{ color: colors.text }}>
                Don't have an account?{" "}
                <a
                  href="#"
                  className="hover:underline font-medium"
                  style={{ color: colors.primary }}
                >
                  Sign up
                </a>
              </p>
            </div>
          </form>

          {/* Decoration */}
          <div
            className="mt-8 pt-6 flex justify-center"
            style={{ borderTop: `1px solid ${colors.lightGray}` }}
          >
            <div
              className="text-sm flex items-center"
              style={{ color: "#9CA3AF" }}
            >
              <Coffee
                className="h-4 w-4 mr-2"
                style={{ color: colors.primary }}
              />
              <span>Brew your perfect virtual coffee experience</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
