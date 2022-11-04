import axios from "axios";
import { useContext, useRef, useState } from "react";
import { Context } from "../../context/Context";
import "./write.css";
import { storage } from "../../firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { v4 } from "uuid";

export default function Write() {
  const titleRef = useRef();
  const descRef = useRef();
  const [imageUpload, setImageUpload] = useState(null);
  const [url, setUrl] = useState("");
  const [urlVideo, setUrlVideo] = useState("");
  const { user } = useContext(Context);

  const submitHandler = async (e) => {
    e.preventDefault();

    const newPost = {
      username: user.username,
      title: titleRef.current.value,
      desc: descRef.current.value,
    };

    if (urlVideo) {
      newPost.video = urlVideo;
    } else {
      newPost.photo = url;
    }

    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };

  const uploadImage = () => {
    if (imageUpload == null) return;

    console.log(imageUpload);

    // const isImage = (imageUpload) => ;

    // const isVideo = (imageUpload) => ;

    // console.log("isIMage ", isImage);
    // console.log("isVideo ", isVideo);

    if (imageUpload.type.startsWith("image/")) {
      const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);

      uploadBytes(imageRef, imageUpload).then((res) => {
        console.log(res);
        alert("Image Uploaded");
      });

      const uploadTask = uploadBytesResumable(imageRef, imageUpload);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("Image available at", downloadURL);
            setUrl(downloadURL);
            console.log(url);
          });
        },
        (error) => console.log(error)
      );
    } else if (imageUpload.type.startsWith("video/")) {
      const videoRef = ref(storage, `video/${imageUpload.name + v4()}`);

      uploadBytes(videoRef, imageUpload).then((res) => {
        console.log(res);
        alert("Video Uploaded");
      });

      const uploadTask = uploadBytesResumable(videoRef, imageUpload);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("Video available at", downloadURL);
            setUrlVideo(downloadURL);
            console.log(url);
          });
        },
        (error) => console.log(error)
      );
    }
  };

  return (
    <div className="write">
      <h1>Write Here</h1>
      {url && <img className="writeImg" src={url} alt="" />}
      {urlVideo && (
        <video className="singlePostImg" controls src={urlVideo}></video>
      )}
      <form className="writeForm" onSubmit={submitHandler}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            onChange={(e) => setImageUpload(e.target.files[0])}
          />
          <button onClick={uploadImage}> Upload</button>
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            ref={titleRef}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Enter your text here"
            type="text"
            autoFocus={true}
            ref={descRef}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
