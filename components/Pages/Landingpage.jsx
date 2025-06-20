import React, { useState, useEffect } from "react";
import { GET } from "../../src/Api";
import { useNavigate } from "react-router-dom";
import Savebutton from "../functions/Savebutton";



const Landingpage = () => {
    const [post, setPosts] = useState([]);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPostsPublic = async () => {
            try {
                const response = await GET('/api/notes/public');
                setPosts(response);
                console.log(response);
            } catch (err) {
                if (err.response?.status === 401) {
                    navigate("/login");
                }
                setMessage("Failed to load posts");
            }
        };
        fetchPostsPublic();
    }, []);

    return (
        <>
         <div className="min-h-screen bg-neutral-800  text-gray-200">
  <div className="p-4">
    {message && <p className="text-red-500">{message}</p>}

    {post.length === 0 ? (
      <p>No posts available</p>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {post.map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-between p-4 rounded-xl shadow-xl bg-neutral-700  min-h-[200px]"
          >
            <div>
              <p className="mb-2">
                  <span className="text-sm text-gray-400">Author:</span>{" "}
                  <span className="text-sm font-mono font-semibold">{item.author.username}</span>
                </p>
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="text-base my-2 text-gray-300">{item.content}</p>
            </div>

            <div className="flex justify-end mt-auto">
              <Savebutton postId={item._id} />
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</div>


        </>
    );
};

export default Landingpage;
