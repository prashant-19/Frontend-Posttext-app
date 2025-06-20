import React, { useEffect, useState } from "react";
import { GET } from "../../src/Api";
import Savebutton from "../functions/Savebutton";

const SavedPosts = () => {
  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const res = await GET("/api/saved");
        console.log(res)
        setSavedPosts(res);
      } catch (err) {
        setError(" Failed to fetch saved posts");
      } finally {
        setLoading(false);
      }
    };

    fetchSaved();
  }, []);

  if (loading) return <p className="text-center text-gray-400 bg-neutral-700  mt-10">⏳ Loading saved posts...</p>;
  if (error) return <p className=" text-gray-400 bg-neutral-700  text-center mt-10">{error}</p>;
  if (!savedPosts.length) return <p className="text-center min-h-screen text-gray-400 bg-neutral-700  pt-10">No saved posts yet.</p>;

  return (
    <div className="min-h-screen bg-neutral-800 text-gray-200 px-4">
      <div className="max-w-3xl mx-auto pt-10 space-y-6">
        <h2 className="text-2xl font-bold text-center">Saved Posts:</h2>

        {savedPosts.length === 0 ? (
          <div className="text-center text-gray-400 bg-neutral-700 py-10 px-6 rounded-lg shadow-md">
          </div>
        ) : (
          savedPosts.map((post) => (
            <div
              key={post._id}
              className="p-4 bg-neutral-700 rounded-lg shadow-md"
            >
              <p className="mb-2">
                  <span className="text-sm text-gray-400">Author:</span>{" "}
                  <span className="text-sm font-mono font-semibold">{post.author.username}</span>
                </p>
              <h3 className="text-lg font-semibold text-gray-100">{post.title}</h3>
              <p className="mt-2 text-gray-300">{post.content}</p>

              <div className="mt-4 flex justify-end">
                <Savebutton postId={post._id} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>


  );
};

export default SavedPosts;
