import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import { Context } from "../../context/Context";

function LikedPages() {
  const { user } = useContext(Context);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`/posts/${user._id}/likedPosts`);
      setPosts(res.data);
      console.log(res);
    };

    fetchPosts();
  }, [user._id]);

  return (
    <div>
      <Header />

      {posts.length === 0 ? (
        <h1>No posts to show</h1>
      ) : (
        <div className="home">
          <Sidebar />
          <Posts posts={posts} />
        </div>
      )}
    </div>
  );
}

export default LikedPages;
