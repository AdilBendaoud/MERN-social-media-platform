import mongoose from "mongoose";

let UserShema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, min: 3, max: 20 },
    lastName: { type: String, required: true, min: 3, max: 20 },
    email: { type: String, required: true, max: 50 },
    password: { type: String, required: true, max: 50 },
    picturePath: { type: String, default: "" },
    bio: { type: String, default: "" },
    location: { type: String, default: "" },
    friends: { type: Array, default: [] },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserShema);
export default User;
