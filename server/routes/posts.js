import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  getAllPosts,
  likePost,
  dislikePost,
  getUserPost,
} from "../controllers/posts.js";
const router = express.Router();

router.get("/", verifyToken, getAllPosts);
router.get("/:userid", verifyToken, getUserPost);
router.patch("/:id/like", verifyToken, likePost);
router.patch("/:id/dislike", verifyToken, dislikePost);
export default router;
