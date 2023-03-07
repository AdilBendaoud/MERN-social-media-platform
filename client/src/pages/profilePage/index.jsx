import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FriendsList from "../../components/FriendsList";
import NavBar from "../../components/NavBar";
import Posts from "../homePage/Posts";
import Userinfo from "../homePage/Userinfo";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.myPersistReducer.token);

  const getUser = async () => {
    const response = await fetch(`http://localhost:5000/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    setUser(data);
  };

  useEffect(()=>{
    getUser()
  },[])

  if(!user) return null

  return (
    <div style={{backgroundColor:"#0A0A0A",minHeight:"100vh" }}>
    <NavBar />
    <div className="container">
      <div className="row" style={{ height: "100%" }}>
        <div className="col-3">
          <div className="d-flex justify-content-center align-items-center flex-column">
            <Userinfo picPath={user.picturePath} userid={userId} />
          </div>
        </div>
        <div className="col-6">
          <div>
            <Posts userId={userId} userProfile />
          </div>
        </div>
        <div className="col-3">
          <div className='pt-3'>
            <FriendsList userId={userId} />
          </div>
        </div>
      </div>
    </div>
  </div>);
}
