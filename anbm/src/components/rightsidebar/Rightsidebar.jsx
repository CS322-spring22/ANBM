import "./rightsidebar.css"
import { FeaturedPlayList } from "@material-ui/icons";
import { Face } from "@material-ui/icons";
import { MusicNote } from "@material-ui/icons";
import { TrendingUp } from "@material-ui/icons";
import { Whatshot } from "@material-ui/icons";
import { Users } from "../../dummyData";
import Suggest from "../suggest/Suggest";

export default function Rightsidebar({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(()=>{
        setFollowed(currentUser.followings.includes(user?.id))
        
    },[currentUser, user?.id]);

    useEffect(()=>{
        const getFriends = async () => {
            try{
                const friendList = await axios.get("/users/friends/" +user._id);
                setFriends(friendList.data);
            }catch(err){
                console.log(err);
            }
        }; 
        getFriends();
     }, [user?._id]);
      

    const handleClick = async ()=> {
        try{
            if(followed){
                await axios.put("/users/" + user._id+"/unfollow", {userId:currentUser._id});
                dispatch({type:"UNFOLLOW",payload:user._id})
            }else{
                await axios.put("/users/" + user._id+"/follow", {userId:currentUser._id});
                dispatch({type:"FOLLOW",payload:user._id});
            }
        }catch(err){
            console.log(err)
        }
        setFollowed(!followed)
    };
    const HomeRightbar = () => {
        return (
            <>
                <ul className="rightsidebarList">
                    <li className="rightsidebarListItem">
                        <FeaturedPlayList className="rightsidebarIcon" />
                        <span className="rightsidebarListItemText">Suggested Columns</span>
                    </li>
                    <li className="rightsidebarListItem">
                        <Face className="rightsidebarIcon" />
                        <span className="rightsidebarListItemText">Artists</span>
                    </li>
                    <li className="rightsidebarListItem">
                        <MusicNote className="rightsidebarIcon" />
                        <span className="rightsidebarListItemText">Songs</span>
                    </li>
                    <li className="rightsidebarListItem">
                        <TrendingUp className="rightsidebarIcon" />
                        <span className="rightsidebarListItemText">Trending Profiles</span>
                    </li>
                    <li className="rightsidebarListItem">
                        <Whatshot className="rightsidebarIcon" />
                        <span className="rightsidebarListItemText">Trending Songs</span>
                    </li>
                </ul>
                <button className="rightsidebarButton">Show More</button>
                <hr className="rightsidebarHr" />
                <ul className="rightsidebarFriendList">
                    {Users.map(u => (
                        <Suggest key={u.id} user={u} />
                    ))}
                </ul>
            </>
        );
    };

    const ProfileRightbar = () => {
        return (
            <>
                <h4 className="rightsidebarTitle">Bio</h4>
                <div className="rightsidebarInfo">
                    <div className="rightsidebarInfoItem">
                        <span className="rightsidebarInfoKey">Pronouns:</span>
                        <span className="rightsidebarInfoValue"> {user.pronoun ? user.pronoun : "N/A"}</span>
                    </div>
                    <div className="rightsidebarInfoItem">
                        <span className="rightsidebarInfoKey">Location:</span>
                        <span className="rightsidebarInfoValue"> {user.location ? user.location : "N/A"} </span>
                    </div>
                    <div className="rightsidebarInfoItem">
                        <span className="rightsidebarInfoKey">Age:</span>
                        <span className="rightsidebarInfoValue"> {user.age ? user.age : "N/A"}</span>
                    </div>
                    <div className="rightsidebarInfoItem">
                        <span className="rightsidebarInfoKey">Genre:</span>
                        <span className="rightsidebarInfoValue"> {user.genre ? user.genre : "N/A"}</span>
                    </div>
                    <div className="rightsidebarInfoItem">
                        <span className="rightsidebarInfoKey">Instruments:</span>
                        <span className="rightsidebarInfoValue"> {user.instrument ? user.instrument : "N/A"}</span>
                    </div>
                </div>
                <h4 className="rightsidebarTitle">Top Songs</h4>
                <div className="rightsidebarFollowings">
                    <div className="rightsidebarFollowing">
                        <img src={`${PF}profile/photo1.jpg`} alt="" className="rightsidebarFollowingImg" />
                        <span className="rightsidebarFollowingName"> Tipitipitiu</span>
                    </div>
                    <div className="rightsidebarFollowing">
                        <img src={`${PF}profile/photo2.jpg`} alt="" className="rightsidebarFollowingImg" />
                        <span className="rightsidebarFollowingName">John Cena</span>
                    </div>
                    <div className="rightsidebarFollowing">
                        <img src={`${PF}profile/photo3.jpg`} alt="" className="rightsidebarFollowingImg" />
                        <span className="rightsidebarFollowingName">John Cena</span>
                    </div>
                    <div className="rightsidebarFollowing">
                        <img src={`${PF}profile/photo1.jpg`} alt="" className="rightsidebarFollowingImg" />
                        <span className="rightsidebarFollowingName">John Cena</span>
                    </div>
                    <div className="rightsidebarFollowing">
                        <img src={`${PF}profile/photo2.jpg`} alt="" className="rightsidebarFollowingImg" />
                        <span className="rightsidebarFollowingName">John Cena</span>
                    </div>
                    <div className="rightsidebarFollowing">
                        <img src={`${PF}profile/photo3.jpg`} alt="" className="rightsidebarFollowingImg" />
                        <span className="rightsidebarFollowingName">John Cena</span>
                    </div>
                </div>
            </>

        )
    }
    return (
        <div className="rightsidebar">
            <div className="rightsidebarWrapper">
                {user ? <ProfileRightbar /> : <HomeRightbar />}
            </div>
        </div>
    );
}