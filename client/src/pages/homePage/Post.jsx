import React, { useState } from "react";
import Friend from "../../components/Friend";
import { useSelector, useDispatch } from "react-redux";
import { setPost } from "../../store/authSlice.js";
import {
  AiOutlineLike,
  AiOutlineDislike,
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
  const [showFulldesc, setShowFulldesc] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.myPersistReducer.token);
  const logedUser = useSelector((state) => state.myPersistReducer.user._id);
  const isLiked = Boolean(logedUser in likes);
  const isDisLiked = Boolean(logedUser in dislikes);
  const likeCount = Object.keys(likes).length;
  const disLikeCount = Object.keys(dislikes).length;
  const showMore = (e) => {
    if (showFulldesc) {
      e.target.previousElementSibling.classList.add("text-truncate");
    } else {
      e.target.previousElementSibling.classList.remove("text-truncate");
    }
  };
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
    <div className=" mb-4 rounded-3 py-4 px-3" style={{backgroundColor:"#1A1A1A"}}>
      <Friend friendId={userId} name={name} userPicturePath={userPicturePath} />
      <p className=" d-block text-truncate" style={{color:"#cccccc"}}>{description}</p>
      <span
        style={{ cursor: "pointer" }}
        className="text-primary text-decoration-underline"
        onClick={(e) => {
          showMore(e);
          setShowFulldesc(!showFulldesc);
        }}
      >
        {showFulldesc ? "Show less" : "Show more"}
      </span>
      <div className="mb-3">
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
      <div className="d-flex justify-content-evenly">
        <div>
          <span className="me-2" style={{color:"#cccccc"}}>{likeCount}</span>
          {
            isLiked ? (<AiFillLike
              onClick={() => patchLikeDislike("like")}
              size={24}
              style={{ cursor: "pointer" }}
              color="#cccccc" 
            />):(<AiOutlineLike
              onClick={() => patchLikeDislike("like")}
              size={24}
              style={{ cursor: "pointer" }}
              color="#cccccc" 
            />)
          }
          
        </div>
        <div>
          <span className="me-2" style={{color:"#cccccc"}}>{disLikeCount}</span>
          {isDisLiked?(<AiFillDislike
            onClick={() => patchLikeDislike("dislike")}
            size={24}
            style={{ cursor: "pointer" }}
            color="#cccccc"
          />):(<AiOutlineDislike
            onClick={() => patchLikeDislike("dislike")}
            size={24}
            style={{ cursor: "pointer" }}
            color="#cccccc"
          />)}
        </div>
        <div>
          <span className="me-2" style={{color:"#cccccc"}}>{comments.length}</span>
          <AiOutlineComment
          color="#cccccc"
            size={24}
            style={{ cursor: "pointer" }}
            onClick={() => setShowComments(!showComments)}
          />
        </div>
        <div>
          <AiOutlineShareAlt color="#cccccc" style={{ cursor: "pointer" }} size={24} />
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
