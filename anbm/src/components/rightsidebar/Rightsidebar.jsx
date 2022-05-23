import "./rightsidebar.css";
import {
  FeaturedPlayList,
  StayCurrentPortraitRounded,
} from "@material-ui/icons";
import { Face } from "@material-ui/icons";
import { MusicNote } from "@material-ui/icons";
import { TrendingUp } from "@material-ui/icons";
import { Whatshot } from "@material-ui/icons";
import { Users } from "../../dummyData";
import Suggest from "../suggest/Suggest";
import Profile from "../../pages/profile/profile";
import { useContext, useEffect } from "react";
import { Add, Remove } from "@material-ui/icons";
import { useState } from "react";
import { axiosInstance, AxiosInstance } from "../../config";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Rightsidebar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?._id));
  }, [currentUser._id, user?._id]);
  /*
  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axiosInstance.get(
          "/friend/:userId" + user._id
        );
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);
*/
  const handleClick = async () => {
    try {
      if (followed) {
        await axiosInstance.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axiosInstance.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {}
  };
  const HomeRightbar = () => {
    return (
      <>
        <ul className="rightsidebarList">
          <li className="rightsidebarListItem">
            <FeaturedPlayList className="rightsidebarIcon" />
            <span className="rightsidebarListItemText">Suggested Songs</span>
          </li>
          <li className="rightsidebarListItem">
            <Face className="rightsidebarIcon" />
            <span className="rightsidebarListItemText">Trending Artists</span>
          </li>
          <li className="rightsidebarListItem">
            <MusicNote className="rightsidebarIcon" />
            <span className="rightsidebarListItemText">Trending Songs</span>
          </li>
          <li className="rightsidebarListItem">
            <TrendingUp className="rightsidebarIcon" />
            <span className="rightsidebarListItemText">Trending Profiles</span>
          </li>
          <li className="rightsidebarListItem">
            <Whatshot className="rightsidebarIcon" />
            <span className="rightsidebarListItemText">Location Based</span>
          </li>
        </ul>
        <button className="rightsidebarButton">Show More</button>
        <hr className="rightsidebarHr" />
        {/* 
                <ul className="rightsidebarFriendList">
                    {Users.map(u => (
                        <Suggest key={u.id} user={u} />
                    ))}
                </ul> */}
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightsidebarTitle">Bio</h4>
        <div className="rightsidebarInfo">
          <div className="rightsidebarInfoItem">
            <span className="rightsidebarInfoKey">Pronouns:</span>
            <span className="rightsidebarInfoValue">
              {" "}
              {user.pronoun ? user.pronoun : "N/A"}
            </span>
          </div>
          <div className="rightsidebarInfoItem">
            <span className="rightsidebarInfoKey">Location:</span>
            <span className="rightsidebarInfoValue">
              {" "}
              {user.location ? user.location : "N/A"}{" "}
            </span>
          </div>
          <div className="rightsidebarInfoItem">
            <span className="rightsidebarInfoKey">Age:</span>
            <span className="rightsidebarInfoValue">
              {" "}
              {user.age ? user.age : "N/A"}
            </span>
          </div>
          <div className="rightsidebarInfoItem">
            <span className="rightsidebarInfoKey">Genre:</span>
            <span className="rightsidebarInfoValue">
              {" "}
              {user.genre ? user.genre : "N/A"}
            </span>
          </div>
          <div className="rightsidebarInfoItem">
            <span className="rightsidebarInfoKey">Instruments:</span>
            <span className="rightsidebarInfoValue">
              {" "}
              {user.instrument ? user.instrument : "N/A"}
            </span>
          </div>
        </div>
        <h4 className="rightsidebarTitle">Top Songs</h4>
        <div className="rightsidebarFollowings">
          <div className="rightsidebarFollowing">
            <img
              src={`${PF}profile/photo1.jpg`}
              alt=""
              className="rightsidebarFollowingImg"
            />
            <span className="rightsidebarFollowingName"> Tipitipitiu</span>
          </div>
          <div className="rightsidebarFollowing">
            <img
              src={`${PF}profile/photo2.jpg`}
              alt=""
              className="rightsidebarFollowingImg"
            />
            <span className="rightsidebarFollowingName">John Cena</span>
          </div>
          <div className="rightsidebarFollowing">
            <img
              src={`${PF}profile/photo3.jpg`}
              alt=""
              className="rightsidebarFollowingImg"
            />
            <span className="rightsidebarFollowingName">John Cena</span>
          </div>
          <div className="rightsidebarFollowing">
            <img
              src={`${PF}profile/photo1.jpg`}
              alt=""
              className="rightsidebarFollowingImg"
            />
            <span className="rightsidebarFollowingName">John Cena</span>
          </div>
          <div className="rightsidebarFollowing">
            <img
              src={`${PF}profile/photo2.jpg`}
              alt=""
              className="rightsidebarFollowingImg"
            />
            <span className="rightsidebarFollowingName">John Cena</span>
          </div>
          <div className="rightsidebarFollowing">
            <img
              src={`${PF}profile/photo3.jpg`}
              alt=""
              className="rightsidebarFollowingImg"
            />
            <span className="rightsidebarFollowingName">John Cena</span>
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="rightsidebar">
      <div className="rightsidebarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
