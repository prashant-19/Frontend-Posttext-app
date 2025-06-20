import React, { useEffect, useState } from "react";
import { POST, GET } from "../../src/Api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../src/context/AuthContext";
import img1 from "../../src/images/ribbon.png"
import img2 from "../../src/images/bookmark.png"

const Savebutton = ({ postId }) => {
  const [isSaved, setIsSaved] = useState(false);
  const { user } = useAuth(); // ✅ get user from context
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return; // Skip if not logged in
    GET("/api/saved")
      .then(data => {
        const ids = data.map(p => p._id);
        setIsSaved(ids.includes(postId));
      })
      .catch(err => console.error("❌ Error checking saved", err));
  }, [user, postId]);

  const handleToggle = async () => {
    if (!user) {
      navigate("/login"); // redirect if not logged in
      return;
    }

    try {
      const res = await POST(`/api/save-toggle/${postId}`);
      setIsSaved(res.saved);
    } catch (err) {
      console.error("Toggle failed", err.message);
    }
  };

  return (
    <>
    
       <button onClick={handleToggle} className={'flex m-2 cursor-pointer'}
    >
      <img

      src = {isSaved ? img2 : img1}
      className="w-6"
      />
    </button>
    </>

  );
};

export default Savebutton;