// ✅ Profile.jsx (Enhanced Password Update)
import React, {useEffect, useState } from "react";
import { GET, PUT } from "../../src/Api";
import { useAuth } from "../../src/context/AuthContext";
import editImg from "../../src/images/edit.png"
import saveImg from "../../src/images/save.png"
import cancelImg from "../../src/images/cancel.png"


const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [fieldValue, setFieldValue] = useState("");
  const [message, setMessage] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const {user} = useAuth()

  useEffect(()=>{
      fetchProfile();
    },[])

  const fetchProfile = async () => {
    try {
      const res = await GET("/api/user");
      console.log("👤 Profile fetched:", res);
      setProfile(res);
    } catch (err) {
      console.error("Failed to fetch profile:", err);
    }
  };

  const startEdit = (field) => {
    setEditingField(field);
    setFieldValue(profile[field]);
    if (field === "password") {
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  const cancelEdit = () => {
    setEditingField(null);
    setFieldValue("");
  };

  const saveEdit = async () => {
    if (editingField === "password") {
      if (!oldPassword || !newPassword || !confirmPassword) {
        setMessage("Please fill all password fields.");
        return;
      }
      if (newPassword !== confirmPassword) {
        setMessage("New passwords do not match.");
        return;
      }
      try {
        const res = await PUT("/api/user", {
          oldPassword,
          newPassword
        });
        setMessage("Password updated successfully");
        cancelEdit();
      } catch (err) {
        console.error("Password update failed:", err);
        setMessage("Password update failed");
      }
      return;
    }

    try {
      const res = await PUT("/api/user", { [editingField]: fieldValue });
      console.log("Profile updated:", res);
      setMessage("Profile updated successfully");
      cancelEdit();
      fetchProfile();
    } catch (err) {
      console.error("Update failed:", err);
      setMessage("Update failed");
    }
  };

  if (!profile) return <p className="p-4">Loading...</p>;

  return (
<div className="min-h-screen bg-neutral-800 text-gray-200 px-4 flex justify-center items-start pt-10">
  <div className="max-w-md w-full p-6 rounded-xl shadow-md bg-neutral-700">
    <h2 className="text-2xl font-bold mb-6 text-center">My Profile:</h2>

    {['username', 'email', 'password'].map((field) => (
      <div key={field} className="mb-6">
        <label className="block font-semibold mb-2 capitalize text-gray-300">
          {field}:
        </label>

        {editingField === field ? (
          <div className="space-y-3">
            {field === "password" ? (
              <>
                <input
                  type="password"
                  placeholder="Enter old password"
                  className="w-full p-2 bg-neutral-600 text-white rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="w-full p-2 bg-neutral-600 text-white rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Confirm new password"
                  className="w-full p-2 bg-neutral-600 text-white rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </>
            ) : (
              <input
                type="text"
                className="w-full p-2 bg-neutral-600 text-white rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={fieldValue}
                onChange={(e) => setFieldValue(e.target.value)}
              />
            )}

            <div className="flex gap-2">
              <button
                onClick={saveEdit}
                className="flex items-center gap-2 text-white bg-blue-500 hover:bg-blue-600 px-4 py-1.5 rounded-xl shadow-md transition cursor-pointer"
              >
                <img className="w-4" src={saveImg} alt="" />
                <span>Save</span>
              </button>
              <button
                onClick={cancelEdit}
                className="flex items-center gap-2 text-white bg-rose-500 hover:bg-rose-600 px-4 py-1.5 rounded-xl shadow-md transition cursor-pointer"
              >
                  <img className="w-4" src={cancelImg} alt="" />
                <span>Cancel</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <span className="text-gray-200">
              {field === "password" ? "******" : profile[field]}
            </span>
            <button
              onClick={() => startEdit(field)}
              className="flex items-center gap-2 text-white bg-amber-500 hover:bg-amber-600 px-4 py-1.5 rounded-xl shadow-md transition cursor-pointer"
            >
                <img className="w-4" src={editImg} alt="" />
              <span>Edit</span>
            </button>
          </div>
        )}
      </div>
    ))}

    {message && (
      <p className="mt-6 text-center text-sm text-green-500">{message}</p>
    )}
  </div>
</div>

  );
};

export default Profile;
