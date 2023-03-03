import React from "react";
import {BsSearch} from "react-icons/bs"
import {AiOutlineMessage} from "react-icons/ai"
import {MdNotificationsNone} from "react-icons/md"
import {TbLogout} from "react-icons/tb"
import {useSelector, useDispatch} from "react-redux"
import {setLogout} from "../store/authSlice"
export default function NavBar() {
    //const pic = useSelector((state)=>state.user.picture);
    const dispatch = useDispatch();
  return (
    <nav className="navbar  navbar-dark bg-dark pt-3 px-5">
        <div className=" d-flex">
            <a className="navbar-brand fw-bold text-info" href="#">
                Social Club
            </a>
            <div className="" id="navbarsExample04">
                <form className="form-inline my-2 my-md-0 position-relative">
                <BsSearch color="black" style={{position:"absolute",zIndex:10,top:11,left:15}}/>
                <input className="rounded-pill ps-5 border-0" style={{outline:'none',height:40}} type="text" placeholder="Search" />
                </form>
            </div>
        </div>
        <div style={{width:200}} className='d-flex align-items-center justify-content-around'>
            <a href="#">
                <AiOutlineMessage color="white" size={24}/>
            </a>
            <a href="#">
                <MdNotificationsNone color="white" size={24}/>
            </a>
            <div style={{cursor:'pointer'}} onClick={()=>dispatch(setLogout())}>
                <TbLogout color="white" size={24}/>
            </div>
            <div className="bg-danger rounded-circle" style={{width:35, height:35}}>
                <img src="" alt="" />
            </div>
        </div>
        
    </nav>
  );
}
