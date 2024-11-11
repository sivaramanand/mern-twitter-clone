import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
const router = express.Router();
import {
  followUnfollowuser,
  getUserProfile,
  getSuggestedUser,
  updateUser
} from "../controllers/user.controller.js";

router.get("/profile/:username", protectRoute, getUserProfile);
router.post("/follow/:id", protectRoute, followUnfollowuser);
router.get("/suggested", protectRoute, getSuggestedUser);
router.post("/update", protectRoute, updateUser);

export default router;
