import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import { connectMongoDB } from "./db/connectMongoDB.js";

dotenv.config();
const app = express();

const port = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);
app.listen(port, () => {
  console.log("port running at 8000");
  connectMongoDB();
});
