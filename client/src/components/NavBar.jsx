import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { AiOutlineMessage } from "react-icons/ai";
import { MdNotificationsNone } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  //const pic = useSelector((state)=>state.user.picture);
  const dispatch = useDispatch();
  const [notMobileScreen, setNotMobileScreen] = useState(true);
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-md navbar-dark py-3 px-5" style={{backgroundColor:"#1A1A1A"}}>
      <div className="container-fluid " style={{ width: "100vw" }}>
        <span onClick={()=>navigate("/home")} style={{cursor:"pointer"}} className="navbar-brand fw-bold text-info">
          Social Club
        </span>
        <button
          className="navbar-toggler"
          onClick={() => {
            setNotMobileScreen(!notMobileScreen);
          }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={
            notMobileScreen
              ? "collapse navbar-collapse"
              : "collapse navbar-collapse active"
          }
        >
          <ul
            className="navbar-nav ms-auto d-flex align-items-center justify-content-between"
            style={{
              width: notMobileScreen ? 450 : "",
              height: notMobileScreen ? "" : 250,
            }}
          >
            <li className="nav-item">
              <form className="form-inline my-2 my-md-0 position-relative">
                <BsSearch
                  color="black"
                  style={{
                    position: "absolute",
                    zIndex: 10,
                    top: 11,
                    left: 15,
                  }}
                />
                <input
                  className="rounded-pill ps-5 border-0"
                  style={{ outline: "none", height: 40 }}
                  type="text"
                  placeholder="Search"
                />
              </form>
            </li>

            <li className={notMobileScreen ? "nav-item" : "nav-item"}>
              <a href="#">
                <AiOutlineMessage color="white" size={24} />
              </a>
            </li>
            <li className="nav-item">
              <a href="#">
                <MdNotificationsNone color="white" size={24} />
              </a>
            </li>
            <li className="nav-item">
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  dispatch(setLogout());
                  navigate("/");
                }}
              >
                <TbLogout color="white" size={24} />
              </div>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}
