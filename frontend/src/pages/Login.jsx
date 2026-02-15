import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

   const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await API.post("/api/auth/login", {
      email,
      password
    });

    const { token, role } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    alert("Login successful");

    if (role === "STUDENT") {
      navigate("/user-dashboard");
    } else {
      navigate("/admin-dashboard");
  
    }

  } catch (error) {
    alert("Invalid credentials");
  }
};



  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      
      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-lg border border-slate-700 rounded-2xl shadow-2xl p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            🔐 LMS Login
          </h1>
          <p className="text-gray-400 mt-2 text-sm">
            Access your smart library dashboard
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Email */}
          <div>
            <label className="block text-gray-300 text-sm mb-1">
              📧 Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-300 text-sm mb-1">
              🔑 Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between text-sm text-gray-400">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-yellow-400" />
              Remember me
            </label>
            <button
              type="button"
              className="hover:text-yellow-400 transition"
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-lg hover:bg-yellow-300 transition shadow-lg"
          >
            🚀 Login to Library
          </button>
         
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-400">
          New User?
          <Link to="/register" className="text-yellow-400 hover:underline cursor-pointer ml-1">
            Register Here
          </Link>
        </div>

      </div>
    </div>
  );
}
