import "./share.css";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
  Notes,
  MusicNote,
  Person,
  LibraryMusic,
  LeakAdd,
} from "@material-ui/icons";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import React from "react";

import { axiosInstance } from "../../config";

export default function Share() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("file", file);
      data.append("name", fileName);
      newPost.img = fileName;
      try {
        await axiosInstance.post("/upload", data);
      } catch (err) {}
    }

    try {
      await axiosInstance.post("/posts", newPost);
      window.location.reload();
    } catch (err) {}
  };
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "profile/noAvatar.png"
            }
            alt=""
          />
          <input
            placeholder={
              "What would you like to share today,  " + user.username + "?"
            }
            className="shareInput"
            ref={desc}
          />
        </div>
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <li className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <MusicNote htmlColor="Red" className="shareIcon" />
              <span className="shareOptionText">Name</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <li className="shareOption">
              <Person htmlColor="DodgerBlue" className="shareIcon" />
              <span className="shareOptionText">Artist</span>
            </li>
            <li className="shareOption">
              <LibraryMusic htmlColor="DarkOrange" className="shareIcon" />
              <span className="shareOptionText">Album</span>
            </li>
            <li className="shareOption">
              <LeakAdd htmlColor="Gold" className="shareIcon" />
              <span className="shareOptionText">Link</span>
            </li>
          </li>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
