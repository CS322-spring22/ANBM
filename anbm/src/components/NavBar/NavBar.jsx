import "./NavBar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState, useRef, useEffect } from "react";
import Popup from "../Popup";
// import Table from "../Table";
// import {User} from mongoose;


import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
  Notes,
  MusicNote,
  LibraryMusic,
  LeakAdd,
} from "@material-ui/icons";
import { axiosInstance } from "../../config";

export default function NavBar() {
  const [user, setUser] = useState({});

  const handleClick = (e) => {
    e.preventDefault();
    localStorage.clear("user");
  };
  const { user: currentUser } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [buttonPopup, setButtonPopup] = useState(false);
  const [file, setFile] = useState(null);
  const [data, setData] = useState([])
  const desc = useRef();

  const [query, setQuery] = useState([]);


  const url = useRef();
  const friendID = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: currentUser._id,
      desc: desc.current.value,
      img: url.current.value,
    };
    try {
      await axiosInstance.post("/posts", newPost);
      window.location.reload();
    } catch (err) { }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await axios.get(`http://localhost:8800/api${query}`);
  //     setData(res.data);
  //   };
  //   if (query.length === 0 || query.length > 2) fetchData();
  // }, [query]);

  const searchHandler = () => {
    console.log(friendID.current.value);
    const fetchUser = async () => {
      const res = await axiosInstance.get(
        `/users?userId=${friendID.current.value}`
      );
      setUser(res.data);
    };
    fetchUser();
  };
  return (
    <div className="NavBarContainer">
      <div className="NavBarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">BANd</span>
        </Link>
      </div>
      <div className="NavBarCenter">
        <div className="searchbar">
        <input 
            placeholder="Search for friends, songs, or artists"
            className="searchInput" 
            onChange={(e) => setQuery(e.target.value.toLowerCase())}/>
           <ul className="list">
        {/* {Users.filter((asd) =>
          asd.username.toLowerCase().includes(query)
        ).map((user) => (
          <li className="listItem" key={user.id}>
            {user.username}
          </li>
        ))} */}
      </ul>
          <Search className="searchIcon" />
          
        </div> 
            className="searchInput"
            ref={friendID}
          
          <Link to={`/profile/${user.username}`}>
            <button onClick={searchHandler}>Search</button>
          </Link>

          <ul className="list"></ul>
      </div>
      <div className="NavBarRight">
        <div className="NavBarLinks">
          <span className="NavBarLink1">
            <main>
              <span onClick={() => setButtonPopup(true)}>Upload</span>
            </main>
            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
              <div className="shareTop">
                <img
                  className="shareProfileImg"
                  src={
                    currentUser.profilePicture
                      ? PF + currentUser.profilePicture
                      : PF + "profile/noAvatar.png"
                  }
                  alt=""
                />
                <input
                  placeholder={
                    "What amazing music would you like to share today,  " +
                    currentUser.username +
                    "?"
                  }
                  className="shareInput"
                  ref={desc}
                />

                <input
                  placeholder={"Youtube url"}
                  className="urlInput"
                  ref={url}
                />
              </div>
              <form className="shareBottom" onSubmit={submitHandler}>
                <li className="shareOptions">
                  <li className="shareOption">
                    <MusicNote htmlColor="Red" className="shareIcon" />
                    <span className="shareOptionText">Name</span>
                  </li>
                  <li className="shareOption">
                    <Person htmlColor="DodgerBlue" className="shareIcon" />
                    <span className="shareOptionText">Artist</span>
                  </li>
                  <li className="shareOption">
                    <LibraryMusic
                      htmlColor="DarkOrange"
                      className="shareIcon"
                    />
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
            </Popup>
          </span>

          <form className="logoutBox" onSubmit={handleClick}>
            <span className="logoutButton" type="submit">
              <a href="/login" style={{ textDecoration: "none" }}>
                Logout
              </a>
            </span>
          </form>
        </div>
        <div className="NavBarIcons">
          <div className="NavBarIconItems">
            <Person />
            <span className="NavBarIconBadge">1.2k</span>
          </div>
          <div className="NavBarIconItems">
            <Chat />
            <span className="NavBarIconBadge">657</span>
          </div>
          <div className="NavBarIconItems">
            <Notifications />
            <span className="NavBarIconBadge">1.0k</span>
          </div>
        </div>
        <Link to={`/profile/${currentUser.username}`}>
          <img
            src={
              currentUser.profilePicture
                ? PF + currentUser.profilePicture
                : PF + "profile/noAvatar.png"
            }
            alt=""
            className="NavBarImg"
          />
        </Link>
      </div>

    </div >
  );
}
