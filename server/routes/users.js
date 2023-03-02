import express from "express";
import {getUser, getUserFriends, addRemouveFriend} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router()

router.get("/:id", getUser)
router.get("/:id/friends", getUserFriends)
router.patch("/:id/:friendId", addRemouveFriend)

export default router;