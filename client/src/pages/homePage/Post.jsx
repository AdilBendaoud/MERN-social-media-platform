import React, { useState } from "react";
import Friend from "../../components/Friend";
import { useSelector, useDispatch } from "react-redux";
import { setPost } from "../../store/authSlice";
import {
  AiFillLike,
  AiFillDislike,
  AiOutlineComment,
  AiOutlineShareAlt,
} from "react-icons/ai";
export default function Post({
  postId,
  userId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  dislikes,
  comments,
}) {
  const [showComments, setShowComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.myPersistReducer.toke);
  const logedUser = useSelector((state) => state.myPersistReducer.user._id);
  const isLiked = Boolean(logedUser in likes);
  const isDisLiked = Boolean(logedUser in dislikes);
  const likeCount = Object.keys(likes).length;
  const disLikeCount = Object.keys(dislikes).length;

  if (likes) {
    console.log(likes);
  } else {
    console.log(likes.length);
  }

  const patchLikeDislike = async (param) => {
    const response = await fetch(
      `http://localhost:5000/posts/${postId}/${param}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: logedUser }),
      }
    );

    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <div>
      <Friend friendId={userId} name={name} userPicturePath={userPicturePath} />
      <div>
        {picturePath && (
          <img
            width="100%"
            height="auto"
            src={`http://localhost:5000/assets/${picturePath}`}
            alt="post"
            className="rounded-2"
          />
        )}
      </div>
      <div>
        <div>
          <AiFillLike
            onClick={() => patchLikeDislike("like")}
            size={24}
            style={{ cursor: "pointer" }}
            color={isLiked ? "white" : ""}
          />
          <span>{likeCount}</span>
        </div>
        <div>
          <AiFillDislike
            onClick={() => patchLikeDislike("dislike")}
            size={24}
            style={{ cursor: "pointer" }}
            color={isDisLiked ? "white" : ""}
          />
          <span>{disLikeCount}</span>
        </div>
        <div>
          <AiOutlineComment
            size={24}
            style={{ cursor: "pointer" }}
            onClick={() => setShowComments(!showComments)}
          />
          <span>{comments.length}</span>
        </div>
        <div>
          <AiOutlineShareAlt style={{ cursor: "pointer" }} size={24} />
        </div>
      </div>
      <div>
        {showComments && (
          <div>
            {comments.map((elm, i) => (
              <div key={i}>
                <p>{elm}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
