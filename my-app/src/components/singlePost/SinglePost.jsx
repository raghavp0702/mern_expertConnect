import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../../context/Context";
import "./singlePost.css";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  // console.log(path);
  const { user } = useContext(Context);

  // const PF = "http://localhost:5000/images/";
  const [post, setPost] = useState({});

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [likeMode, setLikeMode] = useState(true);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [favourites, setFavourites] = useState([]);

  const [likes, setLikes] = useState(0);

  const [likedList, setLikedList] = useState([]);

  const [cats, setCats] = useState([]);
  const [postCats, setPostCats] = useState("");

  const [catsFromPost, setCatsFromPost] = useState([]);

  const [url, setUrl] = useState("");

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };

    getCats();
  }, []);

  // console.log(cats);

  let postCatChange = (e) => {
    if (e.target.value === "Select") {
      console.log("selected category JS");
      setPostCats("");
    }

    console.log("Selected category ", e.target.value);
    setPostCats(e.target.value);
  };

  const submitCategory = async (e) => {
    try {
      e.preventDefault();
      if (postCats !== "") {
        const res = await axios.put(`/posts/${post._id}/categories`, {
          categories: postCats,
        });
        console.log(res.data.categories);
        setCatsFromPost(res.data.categories);
        console.log(res);
        console.log(cats);
      }

      // window.location.reload();
    } catch (err) {
      alert(err.response.data);
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    const res = await axios.put(`/posts/${post._id}/comments`, {
      text: commentText,
      user: user._id,
      name: user.username,
    });
    // .then(data => console.log(data));
    // .then((myres)=> myres.data)

    // if(result.data.comments)

    console.log(res);
    console.log(post.categories);

    const newData = comments.map((item) => {
      if (item.id === res.data._id) {
        return res;
      } else return item;
    });
    // setComments(newData);
    console.log(newData);
    window.location.reload();
  };

  const likeHandler = async (e) => {
    e.preventDefault();
    setLikeMode(false);
    const userid = user._id;
    console.log(userid);

    await axios
      .put(`/posts/${post._id}/like`, {
        id: userid,
      })
      .then((res) => {
        console.log(res.data.length);
        setLikes(res.data.length);
        setLikedList(res.data);
        console.log(likes);
      });
  };
  const unlikeHandler = async (e) => {
    e.preventDefault();
    setLikeMode(true);
    const userid = user._id;
    console.log(userid);
    await axios
      .put(`/posts/${post._id}/unlike`, {
        id: userid,
      })
      .then((res) => {
        console.log(res.data.length);
        setLikes(res.data.length);
        setLikedList(res.data);
        console.log(likes);
      });
  };

  const updateHandler = async (e) => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false);
      // e.target.disabled();
    } catch (error) {}
  };

  const favouriteHandler = async (e) => {
    e.preventDefault();
    const postId = post._id;
    // console.log(user._id);

    await axios
      .post(`/posts/${postId}/favourites`, {
        id: user._id,
      })
      .then((res) => {
        console.log(res);
      });

    alert("Added to favourites");
  };

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      console.log(res);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setLikes(res.data.likedBy.length);
      setLikedList(res.data.likedBy);
      setComments(res.data.comments);
      setCatsFromPost(res.data.categories);
      // console.log(comments);
    };

    getPost();
  }, [path]);

  const deleteHandler = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: {
          username: user.username,
        },
      });

      window.location.replace("/");
    } catch (err) {}
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img className="singlePostImg" src={post.photo} alt="" />
        )}

        {post.video && (
          <video className="singlePostImg" controls src={post.video}></video>
        )}

        {/* when updating post */}
        {updateMode ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="singlePostTitleInput"
          />
        ) : (
          <div>
            <h1 className="singlePostTitle">
              {title}

              {user ? (
                <div className="iconspack">
                  {!likedList.includes(user._id) ? (
                    <i
                      className="fa-solid fa-heart singlePostIcon"
                      style={{ marginRight: "10px", color: "black" }}
                      onClick={likeHandler}
                    ></i>
                  ) : (
                    <i
                      className="fa-solid fa-heart singlePostIcon"
                      style={{ color: "red" }}
                      onClick={unlikeHandler}
                    ></i>
                  )}
                  <p style={{ marginRight: "5px" }}> {likes} </p>
                  <p> {likes > 1 ? "likes" : "like"} </p>

                  {/* <button className="singlePostIcon">Favourite</button> */}
                  <i
                    className="fa-solid fa-star singlePostIcon"
                    style={{
                      marginLeft: "15px",
                      marginRight: "15px",
                      color: "gold",
                    }}
                    onClick={favouriteHandler}
                  ></i>
                  <h5>Categories: </h5>
                  {post.username === user?.username &&
                    catsFromPost &&
                    catsFromPost.map((c, key) => (
                      <h6 key={key}>
                        <Link to={`/?cat=${c}`} key={c._id} className="link">
                          <li className="singlePostAuthor">
                            {c === "C_plus_plus" ? "C++" : c}
                          </li>
                        </Link>
                      </h6>
                    ))}
                  {post.username === user?.username && (
                    <>
                      <select
                        onChange={postCatChange}
                        className="singlePostIcon"
                        style={{ borderRadius: "10px", width: "100px" }}
                      >
                        <option value="">Select</option>
                        {cats.map((c, key) => (
                          <option key={key} value={c.name}>
                            {c.name === "C_plus_plus" ? "C++" : c.name}
                          </option>
                        ))}
                      </select>

                      <label className="singlePostIcon">
                        <i
                          onClick={submitCategory}
                          className="writeIcon fas fa-plus"
                        ></i>
                      </label>
                    </>
                  )}

                  {post.username === user?.username && (
                    <div className="singlePostEdit">
                      <i
                        className="singlePostIcon far fa-edit"
                        onClick={() => setUpdateMode(true)}
                        style={{ marginRight: "10px", fontSize: "20px" }}
                      ></i>
                      <i
                        className="singlePostIcon far fa-trash-alt"
                        onClick={deleteHandler}
                        style={{ marginRight: "10px", fontSize: "20px" }}
                      ></i>
                    </div>
                  )}
                </div>
              ) : (
                ""
              )}
            </h1>
          </div>
        )}
        <div className="singlePostInfo ">
          <span>
            Author:
            <Link to={`/?user=${post.username}`} className="link">
              <b className="singlePostAuthor">{post.username}</b>
            </Link>
          </span>
          <span>Created At: {new Date(post.createdAt).toDateString()} </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        {updateMode ? (
          <button className="singlePostButton" onClick={updateHandler}>
            Update
          </button>
        ) : (
          ""
        )}

        <div className="singlePostComments">
          <h2 className="singlePostTitle commentShower">Comments</h2>
          {/* { ? (
            <p className="singlePostInfo">
              <Link to={"/login"} className="link">
                Be the first one to comment
              </Link>
            </p>
          ) : (
            ""
          )} */}
          {comments.map((item) => (
            <div className="singlePostComment" key={item._id}>
              <p className="singlePostInfo">{item.postedByUser} :</p>
              <p className="singlePostDesc">{item.text}</p>
            </div>
          ))}
        </div>

        {user && (
          <div className="commentAdder ">
            <form onSubmit={addComment}>
              <input
                type="text"
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment"
                className="singlePostTitleInput"
              />
              <button type="submit" className="singlePostButton">
                Add Comment{" "}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
