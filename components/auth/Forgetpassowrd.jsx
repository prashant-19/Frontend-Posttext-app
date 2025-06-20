import { React, useEffect, useState } from "react";
import { useAuth } from "../../src/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { POST } from "../../src/Api";

const Forgetpassword = () => {

    const { user } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [resetToken, setResetToken] = useState();
    const [newPassword, setNewPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [message, setMessage] = useState("");

    if (user) {
        navigate("/profile");
    }


    const handleTokenRequest = async (e) => {
        e.preventDefault();

        try {
            const response = await POST("/api/forgot-password", { email })
            console.log(response.resetToken);
            setResetToken(response.resetToken);
            setMessage("Enter your new password.");

        } catch (err) {
            setMessage("Error", err.response);
        }

    }

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage("Password do not match");
            return;
        }
        try {
            const response = await POST("/api/reset-password", {
                token: resetToken,
                newPassword,
            });
            console.log(response);
            setMessage("Password reset successful! Please login.");
            setResetToken(null);
            setNewPassword("");
            setConfirmPassword("");
            setEmail("");
            navigate("/login")
        } catch (err) {
            setMessage(" Password reset failed.");
        }
    }

    return (

        <>
            <div className="min-h-screen bg-neutral-800 text-gray-200 px-4 py-16">
  <div className="max-w-md mx-auto p-6 rounded-xl shadow-md bg-neutral-700">
    <h2 className="text-xl font-bold mb-6 text-center">Forgot Password</h2>

    {!resetToken ? (
      <form onSubmit={handleTokenRequest} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your registered email"
          className="w-full p-3 bg-neutral-600 text-white rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="username"
        />
        <button
          className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-xl transition"
          type="submit"
        >
          Submit Email
        </button>
      </form>
    ) : (
      <form onSubmit={handlePasswordReset} className="space-y-4">
        <input
          type="email"
          name="username"
          autoComplete="username"
          value=""
          readOnly
          hidden
        />
        <input
          type="password"
          name="new-password"
          autoComplete="new-password"
          placeholder="New password"
          className="w-full p-3 bg-neutral-600 text-white rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          name="confirm-password"
          autoComplete="new-password"
          placeholder="Confirm new password"
          className="w-full p-3 bg-neutral-600 text-white rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-xl transition"
          type="submit"
        >
          Reset Password
        </button>
      </form>
    )}

    {message && (
      <p className="mt-6 text-center text-sm text-gray-300">{message}</p>
    )}
  </div>
</div>


        </>
    )
}
export default Forgetpassword;