import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { IoLocationSharp } from "react-icons/io5";
import { BsFillPersonFill, BsTwitter, BsLinkedin } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function Userinfo({ userid, picPath }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = useSelector((state) => state.myPersistReducer.token);
  const getUser = async () => {
    try {
      const response = await fetch(`http://localhost:5000/users/${userid}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      setUser(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getUser();
    console.log("effect");
  }, []);

  if (!user) {
    return;
  }
  const name =
    user.firstName.charAt(0).toUpperCase() +
    user.firstName.slice(1) +
    " " +
    user.lastName.charAt(0).toUpperCase() +
    user.lastName.slice(1);
  return (
    <div className="pt-4" style={{ width: "85%" }}>
      <div className="d-flex border-bottom pb-3 w-100 text-white align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <img
            src={`http://localhost:5000/assets/${picPath}`}
            width={53}
            height={53}
            className="rounded-circle me-2"
          />
          <h5>{name}</h5>
        </div>
        <div
          onClick={() => {
            navigate(`/profile/${userid}`);
            navigate(0);
          }}
        >
          <FiEdit size={23} style={{ color: "white", cursor: "pointer" }} />
        </div>
      </div>
      <div className="py-3 d-flex border-bottom pb-2 w-100 text-white justify-content-center flex-column">
        <div className="pb-3">
          <BsFillPersonFill size={25} style={{ marginRight: 8 }} />
          <span className="fw-bold" style={{ fontSize: 16 }}>
            Bio :{" "}
          </span>{" "}
          <span>{user.bio}</span>
        </div>
        <div className="pb-3">
          <IoLocationSharp size={25} style={{ marginRight: 8 }} color="white" />
          <span className="fw-bold fs-6" style={{ fontSize: 16 }}>
            Location :{" "}
          </span>
          <span>{user.location}</span>
        </div>
      </div>
      <div className="pt-2">
        <span className="fw-bold text-white">Social Profile</span>
        <div className="pt-2">
          <BsTwitter color="white" size={25} style={{ marginRight: 10 }} />{" "}
          <span style={{ color: "white" }}>Twitter</span>
        </div>
        <div className="pt-2">
          <BsLinkedin color="white" size={25} style={{ marginRight: 10 }} />
          <span style={{ color: "white" }}>Linkedin</span>
        </div>
      </div>
    </div>
  );
}
