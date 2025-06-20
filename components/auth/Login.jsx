// ✅ Login.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { POST } from "../../src/Api";
import { useAuth } from "../../src/context/AuthContext";

const Login = () => {
    const { user, login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        console.log("👀 Auth user state:", user);
        if (user) {
            console.log("➡️ Already logged in, redirecting to /dashboard");
            navigate("/dashboard");
        }
    }, [user]);

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("🔐 Attempting login with:", { email, password });

        try {
            const res = await POST("/api/login", { email, password });
            console.log("✅ Login response:", res);

            if (res.token) {
                login(res.token);
                navigate("/dashboard");
            } else {
                setMessage("No token received");
            }
        } catch (err) {
            console.error("❌ Login error:", err);
            setMessage(err.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen bg-neutral-800 text-gray-200 flex items-center justify-center">
            <div className="max-w-sm w-full mx-auto p-6 bg-neutral-700 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-3 rounded-md bg-neutral-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        className="w-full p-3 rounded-md bg-neutral-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button
                        className="w-full bg-purple-600 text-white p-3 rounded-xl hover:bg-purple-700 transition cursor-pointer"
                        type="submit"
                    >
                        Login
                    </button>

                    <Link
                        to="/forget-password"
                        className="block text-center text-sm text-gray-300 cursor-pointer"
                    >
                        Forgot Password?
                    </Link>
                </form>

                {message && <p className="text-red-500 mt-4 text-center">{message}</p>}
            </div>
        </div>

    );
};

export default Login;
