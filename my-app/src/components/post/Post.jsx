import { Link } from "react-router-dom";
import "./post.css";

// https://via.placeholder.com/150"

export default function Post({ post }) {
  const PF = "http://localhost:5000/images/";
  return (
    <div className="post">
      {post.photo && <img className="postImg" src={post.photo} alt="" />}
      {
          post.video && (
            <video className="postImg"  controls src={post.video}></video>
          )
        }
      <div className="postInfo">
        {/* <div className="postCats">
          {post.categories.map((cat) => {
            return <span className="postCat">{cat.name}</span>;
          })}
        </div> */}

        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>

        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>

        <div className="postBody">
          <i
            className="fa-solid fa-heart"
            style={{ color: "red", marginRight: "6px" }}
          >
            {" "}
          </i>
          {post.likedBy.length}
        </div>
      </div>
      <p className="postDesc">{post.desc}</p>
    </div>
  );
}
