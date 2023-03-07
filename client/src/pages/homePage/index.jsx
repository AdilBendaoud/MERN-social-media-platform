import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import { useSelector } from "react-redux";
import Userinfo from "./Userinfo";
import AddPost from "./AddPost";
import Posts from "./Posts";
import FriendsList from "../../components/FriendsList";

export default function HomePage() {
  const { picturePath, _id } = useSelector(
    (state) => state.myPersistReducer.user
  );
  return (
    <div style={{ minHeight: "100vh", backgroundColor:"#0A0A0A" }}>
      <NavBar />
      <div className="container">
        <div className="row" style={{ height: "100%" }}>
          <div className="col-3">
            <div className="d-flex justify-content-center align-items-center flex-column">
              <Userinfo picPath={picturePath} userid={_id} />
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex align-items-center justify-content-center pt-3 mb-4">
              <AddPost picturePath={picturePath} />
            </div>
            <div>
              <Posts userId={_id} />
            </div>
          </div>
          <div className="col-3">
            <div className='pt-3'>
              <FriendsList userId={_id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
