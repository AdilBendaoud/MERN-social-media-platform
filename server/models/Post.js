import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userPic: String,
    postPic: String,
    description: String,
    likes: { type: Map, of: Boolean },
    dislikes: { type: Map, of: Boolean },
    comments: { type: Array, default: [] },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);
export default Post;
