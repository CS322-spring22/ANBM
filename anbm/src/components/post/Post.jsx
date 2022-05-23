import "./post.css";
import {
  MoreVert,
  ThumbDown,
  ThumbUp,
  Comment,
  Save,
  Share,
  MusicVideo,
  PowerSettingsNew,
} from "@material-ui/icons";
import { useState, useEffect, useContext } from "react";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { axiosInstance } from "../../config";
import ReactPlayer from "react-player";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);

  const likeHandler = () => {
    try {
      axiosInstance.put("/posts/" + post._id + "/like", {
        userId: currentUser._id,
      });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  const [dislike, setDislike] = useState(post.dislikes.length);
  const [isDisliked, setIsDisliked] = useState(false);
  const dislikeHandler = () => {
    try {
      axiosInstance.put("/posts/" + post._id + "/dislike", {
        userId: currentUser._id,
      });
    } catch (err) {}
    setDislike(isDisliked ? dislike - 1 : dislike + 1);
    setIsDisliked(!isDisliked);
  };
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
    setIsDisliked(post.dislikes.includes(currentUser._id));
  }, [currentUser._id, post.likes, post.dislikes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axiosInstance.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postLeft">
          <div className="postLeftTop">
            <div className="postLeftTopLeft">
              <Link to={`/profile/${user.username}`}>
                <img
                  className="postProfileImg"
                  src={
                    user.profilePicture
                      ? PF + user.profilePicture
                      : PF + "profile/noAvatar.png"
                  }
                  alt=""
                />
              </Link>
              <span className="postUsername">{user.username}</span>
              <span className="postDate"> {format(post.createdAt)}</span>
            </div>
            <div className="postLeftTopRight">
              <MoreVert />
            </div>
          </div>
          <div className="postLeftCenter">
            <span className="postText">{post?.desc}</span>
          </div>
          <div className="postLeftBottom">
            <div className="play">
              <button className="playButton">
                <PowerSettingsNew
                  style={{
                    fontSize: 30,
                    backgroundColor: "",
                  }} /* onClick={likeHandler}*/
                />
              </button>
            </div>
            <div className="video">
              <ReactPlayer url={post?.img} controls={true} />
            </div>
          </div>
        </div>
        <div className="postRight">
          <div className="postRightTop">
            <img className="albumImg" src={PF + post.img} alt="" />
          </div>
          <div className="postRightBottom">
            <div className="interactButton">
              <ThumbUp style={{ fontSize: 25 }} onClick={likeHandler} />
              <span className="interactButtonText">Like</span>
              <span className="postLikeCounter">{like}</span>
            </div>
            <div className="interactButton">
              <ThumbDown style={{ fontSize: 25 }} onClick={dislikeHandler} />
              <span className="interactButtonText">Dislike</span>
              <span className="postDislikeCounter">{dislike}</span>
            </div>
            <div className="interactButton">
              <Comment style={{ fontSize: 25 }} />
              <span className="interactButtonText">Comment</span>
              <span className="postCommentCounter">{post.comment}</span>
            </div>
            <div className="interactButton">
              <Save style={{ fontSize: 25 }} />
              <span className="interactButtonText">Save</span>
            </div>
            <div className="interactButton">
              <Share style={{ fontSize: 25 }} />
              <span className="interactButtonText">Share</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
