import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import { Context } from "../../context/Context";

function MyPosts() {
  const { user } = useContext(Context);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`/users/${user._id}/myposts`);
      setPosts(res.data);
    };

    fetchPosts();
  }, [user._id]);

  return (
    <div>
      <Header />
      {posts.length === 0 ? (
        <h1>
          You have not written a blog yet.{" "}
          <Link className="link" to={"/write"}>  Click here to start.</Link>
        </h1>
      ) : (
        <div className="home">
          <Sidebar />
          <Posts posts={posts} />
        </div>
      )}
    </div>
  );
}

export default MyPosts;
