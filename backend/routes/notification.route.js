import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
    getnotificatons,
  deletenotifications,
} from "../controllers/notification.controller.js";
const router = express.Router();

router.get("/getnotifications", protectRoute, getnotificatons);
router.delete("/deletenotification", protectRoute, deletenotifications);
export default router;
