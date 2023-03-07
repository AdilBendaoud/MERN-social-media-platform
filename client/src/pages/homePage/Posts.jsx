import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "./Post";
import { setPosts } from "../../store/authSlice";

export default function Posts({ userId, userProfile = false }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.myPersistReducer.token);
  const posts = useSelector((state) => state.myPersistReducer.posts);
  const getUserPost = async () => {
    const response = await fetch(`http://localhost:5000/posts/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getPosts = async () => {
    const response = await fetch("http://localhost:5000/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("posts fetched from server");
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (userProfile) {
      getUserPost();
    } else {
      getPosts();
    }
  }, []);

  return (
    <div className='pt-3 px-2'>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          postPic,
          userPic,
          likes,
          dislikes,
          comments,
        }) => (
          <Post
            key={_id}
            postId={_id}
            userId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={postPic}
            userPicturePath={userPic}
            likes={likes}
            dislikes={dislikes}
            comments={comments}
          />
        )
      )}
    </div>
  );
}
