import React, { useState } from "react";
import { PUT } from "../../src/Api";
import saveImg from "../../src/images/save.png"
import cancelImg from "../../src/images/cancel.png"
const EditPost = ({ post, onCancel, onPostUpdated }) => {
    const [form, setForm] = useState({
        title: post.title,
        content: post.content,
        isPublic: post.isPublic
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updated = await PUT(`/api/notes/${post._id}`, form);
            onPostUpdated(updated.note);
        } catch (err) {
            console.error(" Update failed", err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-1 space-y-4">
  <input
    type="text"
    name="title"
    value={form.title}
    onChange={handleChange}
    placeholder="Title"
    className="w-full h-14 px-4 font-semibold text-base text-gray-200 shadow-inner bg-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
  />

  <textarea
    name="content"
    value={form.content}
    onChange={handleChange}
    placeholder="Write your note..."
    className="w-full h-60 px-4 py-2 resize-none text-gray-200 shadow-inner bg-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
  />

  <div className="flex justify-between  border-t-2 border-zinc-600 mt-2 pt-4">
    <div className="flex gap-3">
      <button
        type="submit"
        className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-xl shadow-md transition cursor-pointer"
      >
        <img className="w-4" src={saveImg} alt="save" />
        <span className="font-semibold text-sm">Save</span>
      </button>

      <button
        type="button"
        onClick={onCancel}
        className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-5 py-2 rounded-xl shadow-md transition cursor-pointer"
      >
        <img className="w-4" src={cancelImg} alt="cancel" />
        <span className="font-semibold text-sm">Cancel</span>
      </button>
    </div>

    <label className="flex items-center gap-3 w-32 cursor-pointer pl-4 py-2 bg-zinc-800 rounded-xl shadow-inner">
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
        <div className="w-full h-full bg-rose-700 rounded-full peer-checked:bg-blue-700 transition-colors cursor-pointer"></div>
        <div className="absolute top-[0.125rem] left-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
      </div>
    </label>
  </div>
</form>

    );
};

export default EditPost;
