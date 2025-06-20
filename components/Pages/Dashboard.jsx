// ✅ Dashboard.jsx (updated to use imported components)
import React, { useState, useEffect } from "react";
import { GET } from "../../src/Api";
import CreatePost from "../functions/CreatePost";
import EditPost from "../functions/EditPost";
import DeletePost from "../functions/DeletePost";
import Savebutton from "../functions/Savebutton";
import editImg from "../../src/images/edit.png"

const Dashboard = () => {
    const [posts, setPosts] = useState([]);
    const [editing, setEditing] = useState(null);
    
    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const data = await GET("/api/notes");
            setPosts(data);
        } catch (err) {
            console.error(" Failed to fetch posts", err);
        }
    };

    const handleNewPost = (newPost) => {
        setPosts([newPost, ...posts]);
    };

    const handleUpdate = (updatedPost) => {
        setPosts(posts.map(p => p._id === updatedPost._id ? updatedPost : p));
        setEditing(null);
    };

    const handleDelete = (id) => {
        setPosts(posts.filter(p => p._id !== id));
    };

    return (
 <div className="min-h-screen bg-neutral-800 text-gray-200">
  <div className="max-w-2xl mx-auto p-4">
    <h1 className="m-2 text-2xl font-mono font-bold mb-4">Dashboard:</h1>

    <CreatePost onPostCreated={handleNewPost} />

    <div>
      {posts.map((post) => (
        <div key={post._id} className="p-4 mb-4 rounded-xl bg-neutral-700 shadow-lg">
          {editing === post._id ? (
            <EditPost
              post={post}
              onCancel={() => setEditing(null)}
              onPostUpdated={handleUpdate}
            />
          ) : (
            <>
              <div>
                <p className="mb-2">
                  <span className="text-sm text-gray-400">Author:</span>{" "}
                  <span className="text-sm font-mono font-semibold">{post.author.username}</span>
                </p>
                <h2 className="text-lg mb-2 font-semibold">{post.title}</h2>
                <p className="mb-10">{post.content}</p>
              </div>

              <div className="flex justify-between border-t-2 border-zinc-600 pt-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditing(post._id)}
                    className="flex items-center gap-2 text-white bg-blue-500 hover:bg-blue-600 px-4 py-1 rounded-xl shadow-md transition cursor-pointer"
                  >
                    <img className="w-4" src={editImg} alt="edit" />
                    <span className="text-sm font-semibold">Edit</span>
                  </button>

                  <DeletePost postId={post._id} onDeleted={handleDelete} />
                </div>

                <div className="flex  items-center gap-2">
                  <p className=" text-sm font-semibold px-4 py-2 text-gray-200 bg-zinc-800 rounded-xl shadow-inner">
                    {post.isPublic ? "🌐 Public" : "🔒 Private"}
                  </p>
                  <Savebutton postId={post._id} />
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  </div>
</div>

    );
};

export default Dashboard;
