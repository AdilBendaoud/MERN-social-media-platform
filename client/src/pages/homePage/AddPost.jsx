import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPost, setPosts } from "../../store/authSlice";
import Dropzone from "react-dropzone";
import pic from "../../../public/my-uplaods/mypic.avif";
import { BsFillTrash3Fill, BsCardImage } from "react-icons/bs";
import { AiOutlineCloudUpload } from "react-icons/ai";

export default function AddPost({ picturePath }) {
  const [uploadingImage, setuploadingImage] = useState(true);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const token = useSelector((state) => state.myPersistReducer.token);
  const { _id } = useSelector((state) => state.myPersistReducer.user);
  const dispatch = useDispatch();

  const hundelSubmit = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("postPic", image.name);
    }

    const response = await fetch("http://localhost:5000/posts", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setImage(null);
    setPost("");
  };

  return (
    <div className="p-4 w-100 bg-danger">
      <div className=" mb-3">
        <img
          src={pic}
          alt="user"
          width={53}
          height={53}
          className="rounded-circle me-4"
        />
        <input
          type="text"
          placeholder="share something"
          className="p-3 ps-4 rounded-pill border-0"
          style={{ width: "83%" }}
          onChange={(e) => setPost(e.target.value)}
          value={post}
        />
      </div>
      {uploadingImage && (
        <div>
          <Dropzone
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <section className="d-flex align-items-center justify-content-around">
                <div
                  {...getRootProps()}
                  className="form-control d-flex justify-content-center align-items-center flex-column"
                  style={{ cursor: "pointer", width: image ? "85%" : "" }}
                >
                  <AiOutlineCloudUpload size={40} />
                  <input {...getInputProps()} />
                  {!image ? (
                    <p className="text-grey">
                      Click to browse or drag your profile picture Here
                    </p>
                  ) : (
                    <p>{image.name}</p>
                  )}
                </div>
                {image && (
                  <BsFillTrash3Fill
                    color="red"
                    style={{ cursor: "pointer" }}
                    size={25}
                    onClick={() => setImage(null)}
                  />
                )}
              </section>
            )}
          </Dropzone>
        </div>
      )}
      <div className="mt-3 px-5 d-flex align-items-center justify-content-around">
        <div
          style={{ cursor: "pointer" }}
          onClick={() => setuploadingImage(!uploadingImage)}
        >
          <BsCardImage size={25} /> <span>Add image</span>
        </div>
        <div>
          <button
            onClick={() => hundelSubmit()}
            className="btn btn-info fw-bold px-4 py-2 rounded-pill"
          >
            POST
          </button>
        </div>
      </div>
    </div>
  );
}
