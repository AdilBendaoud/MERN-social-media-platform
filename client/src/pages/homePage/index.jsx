import React from "react";
import NavBar from "../../components/NavBar";
import { useSelector } from "react-redux";

export default function HomePage() {
  //const path = useSelector((state) => state.myPersistReducer.user.picturePath);
  return (
    <div className=" bg-dark" style={{ height: "100vh" }}>
      <NavBar />
    </div>
  );
}
