import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import { connectMongoDB } from "./db/connectMongoDB.js";
import cookieParser from "cookie-parser";
import userrouter from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: "decgs0gw4",
  api_key: "438673737995198",
  api_secret: "a2GYvVX1_4ahLw7kc2Qbts12ijQ",
});
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const port = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);
app.use("/api/user", userrouter);
app.use("/api/post", postRoutes);
app.listen(port, () => {
  console.log("port running at ", port);
  connectMongoDB();
});
