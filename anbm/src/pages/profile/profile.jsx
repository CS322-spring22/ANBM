import "./profile.css"
import Leftsidebar from "../../components/leftsidebar/Leftsidebar";
import Rightsidebar from "../../components/rightsidebar/Rightsidebar";
import Feed from '../../components/mainfeed/Feed';
import NavBar from '../../components/NavBar/NavBar';
import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { axiosInstance } from "../../config";

export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({})
    const username = useParams().username;
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axiosInstance.get(`/users?username=${username}`)
            setUser(res.data)
        };
        fetchUser();
    }, [username]);

    return (
        <>
            <NavBar />
            <div className="profile">
                <div className="profileLeft">
                    <Leftsidebar></Leftsidebar>
                </div>
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img className="profileCoverImg" src={user.coverPicture ? PF + user.coverPicture : PF + "profile/noCover.png"} alt="" />    
                            <img className="profileUserImg" src={user.profilePicture ? PF+ user.profilePicture : PF + "profile/noAvatar.png"} alt="" />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName"> {user.username}</h4>
                            <span className="profileID"> {user._id}</span>
                            <span className="profileInfoDesc" > {user.desc} </span>
                        </div>
                        <div className="profileRightBottom">
                            <Feed username={username} />
                            <Rightsidebar user={user} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
