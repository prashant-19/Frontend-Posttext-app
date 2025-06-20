import React from "react";
import { DELETE } from "../../src/Api";
import deleteImg from "../../src/images/delete.png"
const DeletePost = ({ postId, onDeleted }) => {
  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this note?");
    if (!confirm) return;

    try {
      await DELETE(`/api/notes/${postId}`);
      onDeleted(postId);
    } catch (err) {
      console.error("❌ Delete failed", err);
    }
  };

  return (
 <button
  onClick={handleDelete}
  className="flex items-center gap-2 text-white bg-rose-500 hover:bg-rose-600 px-4 py-1 rounded-xl shadow-md transition cursor-pointer"
>
  <img className="w-4" src={deleteImg} alt="delete" />
  <span className="text-sm font-semibold">Delete</span>
</button>

  );
};

export default DeletePost;