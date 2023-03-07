import React from "react";
import Friend from "./Friend";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFriends } from "../store/authSlice";

export default function FriendsList({ userId }) {
  const token = useSelector((state) => state.myPersistReducer.token);
  const friends = useSelector((state) => state.myPersistReducer.user.friends);
  const dispatch = useDispatch();
  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:5000/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <div className="py-4 px-3 rounded-3" style={{minHeight:250,backgroundColor:"#1A1A1A"}}>
      <div>
        <p className='fw-bold' style={{color:"#cccccc"}}>Friend List</p>
      </div>
      <div>
        {friends.map((friend) => (
          <Friend
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            userPicturePath={friend.picturePath}
          />
        ))}
      </div>
    </div>
  );
}
