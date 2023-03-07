import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../store/authSlice.js";
import {FiUserPlus, FiUserMinus} from "react-icons/fi"

export default function Friend({ friendId, name, userPicturePath }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.myPersistReducer.token);
  const { _id } = useSelector((state) => state.myPersistReducer.user);
  const friends = useSelector((state) => state.myPersistReducer.user.friends);

  const isFriend = friends.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:5000/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };
  return (
    <div className="d-flex justify-content-between align-items-center mb-3 px-3">
      <div
        className="d-flex align-items-center"
        onClick={() => {
          navigate(`/profile/${friendId}`);
        }}
      >
        <img
          src={`http://localhost:5000/assets/${userPicturePath}`}
          width={53}
          height={53}
          className="rounded-circle me-2"
        />
        <h5 style={{color:"#cccccc"}}>{name}</h5>
      </div>
      { friendId !== _id &&(
        <div onClick={() => patchFriend()}>
        {isFriend ? <FiUserMinus color="white" style={{cursor:"pointer"}} size={24} /> : <FiUserPlus style={{cursor:"pointer"}} color="white" size={24} />}
        </div>
      )}
      
    </div>
  );
}
