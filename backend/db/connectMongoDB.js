import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectMongoDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log("connection established successfgully", conn.connection.host);
  } catch (err) {
    console.log("error in connecting to database ", err);
    process.exit(1);
  }
};
