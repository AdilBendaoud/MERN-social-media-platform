import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { AiOutlineMessage } from "react-icons/ai";
import { MdNotificationsNone } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../store/authSlice";
export default function NavBar() {
  //const pic = useSelector((state)=>state.user.picture);
  const dispatch = useDispatch();
  const [ notMobileScreen, setNotMobileScreen ] = useState(true);

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark pt-3 px-5">
      <div className="container-fluid " style={{width:'100vw'}}>
        <a className="navbar-brand fw-bold text-info" href="#">
          Social Club
        </a>
        <button
          className="navbar-toggler"
          onClick={()=>{setNotMobileScreen(!notMobileScreen)}}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={notMobileScreen ? 'collapse navbar-collapse': 'collapse navbar-collapse active'}>
          <ul className="navbar-nav ms-auto d-flex align-items-center justify-content-between" style={{width:notMobileScreen?450:'',height:notMobileScreen? '':250}}>
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

            <li className={notMobileScreen? 'nav-item':'nav-item'}>
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
                onClick={() => dispatch(setLogout())}
              >
                <TbLogout color="white" size={24} />
              </div>
            </li>
            <li className="nav-item">
              <div
                className="bg-danger rounded-circle"
                style={{ width: 35, height: 35 }}
              >
                <img src="" alt="" />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
