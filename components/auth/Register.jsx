// ✅ Register.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { POST } from "../../src/Api";
import { useAuth } from "../../src/context/AuthContext";

const Register = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      console.log("🔁 Already logged in, redirecting to dashboard");
      navigate("/dashboard");
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("📨 Registering with:", form);

    try {
      const res = await POST("/api/register", form);
      console.log("✅ Register response:", res);

      if (res.token) {
        login(res.token);
        navigate("/dashboard");
      } else {
        setMessage("Registration successful but no token returned");
      }
    } catch (err) {
      console.error("❌ Registration failed:", err);
      setMessage(err.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-800 text-gray-200 flex items-center justify-center">
  <div className="max-w-md w-full mx-auto  p-6 border border-neutral-600 rounded-xl shadow-md bg-neutral-700">
    <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="username"
        placeholder="Username"
        className="w-full p-3 rounded-md bg-neutral-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
        value={form.username}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full p-3 rounded-md bg-neutral-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
        value={form.email}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full p-3 rounded-md bg-neutral-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
        value={form.password}
        onChange={handleChange}
        required
      />

      <button
        type="submit"
        className="bg-purple-600 text-white w-full py-3 rounded-xl hover:bg-purple-700 transition"
      >
        Register
      </button>
    </form>

    {message && (
      <p className="mt-4 text-center text-sm text-red-500">{message}</p>
    )}
  </div>
</div>

  );
};

export default Register;
