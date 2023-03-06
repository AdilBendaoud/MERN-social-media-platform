import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../store/authSlice";
import { HiUserRemove, HiUserAdd } from "react-icons/hi";

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
    <div>
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
        <h5>{name}</h5>
      </div>
      <div onClick={() => patchFriend()}>
        {isFriend ? <HiUserRemove size={24} /> : <HiUserAdd size={24} />}
      </div>
    </div>
  );
}
