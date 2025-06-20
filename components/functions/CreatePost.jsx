import React, { useState } from "react";
import { POST } from "../../src/Api";

const CreatePost = ({ onPostCreated }) => {
  const [form, setForm] = useState({ title: "", content: "", isPublic: true });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newPost = await POST("/api/notes", form);
      setForm({ title: "", content: "", isPublic: true });
      onPostCreated(newPost.note);
    } catch (err) {
      console.error(" Create post failed", err);
    }
  };

  return (
<form onSubmit={handleSubmit} className="mb-6 space-y-4 bg-neutral-800 text-gray-200 p-6 rounded-lg shadow-md">
  <input
    type="text"
    name="title"
    placeholder="Title"
    value={form.title}
    onChange={handleChange}
    className="w-full p-3 rounded-md bg-neutral-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
    required
  />

  <textarea
    name="content"
    placeholder="Content"
    value={form.content}
    onChange={handleChange}
    className="w-full h-60 resize-none p-3 rounded-md bg-neutral-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
    required
    rows={5}
  />

     <label className="flex items-center gap-3 w-36 cursor-pointer pl-4 py-2 bg-zinc-800 rounded-full shadow-inner">
      <span className="text-sm text-gray-200 font-medium">
        {form.isPublic ? "Public" : "Private"}
      </span>

      <div className="relative inline-block w-12 h-6">
        <input
          type="checkbox"
          name="isPublic"
          checked={form.isPublic}
          onChange={(e) => setForm({ ...form, isPublic: e.target.checked })}
          className="sr-only peer"
        />
        <div className="w-full h-full bg-rose-700 rounded-full peer-checked:bg-blue-700 transition-colors"></div>
        <div className="absolute top-[0.125rem] left-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
      </div>
    </label>

  <button
    type="submit"
    className=" w-full bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-xl transition"
  >
    Create Note
  </button>
</form>

  );
};

export default CreatePost;
