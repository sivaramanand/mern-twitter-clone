import express from "express";
import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import { connectMongoDB } from "./db/connectMongoDB.js";
import cookieParser from "cookie-parser";
import userrouter from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import notificationRoutes from "./routes/notification.route.js";
import { v2 as cloudinary } from "cloudinary";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__filename);
console.log(__dirname);

dotenv.config();

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const port = process.env.PORT;

app.use("/api/auth", authRoutes);
app.use("/api/users", userrouter);
app.use("/api/posts", postRoutes);
app.use("/api/routes", notificationRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(port, () => {
  console.log("Server running on port", port);
  connectMongoDB();
});