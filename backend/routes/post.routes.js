import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  createPost,
  deletepost,
  commentonpost,
  likeunlikepost,
  getallposts,
  getlikedposts,
  getfollowingposts,
  getuserposts,
} from "../controllers/post.controller.js";
const router = express.Router();

router.post("/create", protectRoute, createPost);
router.get("/following", protectRoute, getfollowingposts);
router.get("/user/:username", protectRoute, getuserposts);
router.post("/like/:id", protectRoute, likeunlikepost);
router.post("/comment/:id", protectRoute, commentonpost);
router.get("/all", protectRoute, getallposts);
router.get("/likes/:id", protectRoute, getlikedposts);
router.delete("/delete/:id", protectRoute, deletepost);

export default router;
