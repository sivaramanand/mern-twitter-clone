import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://3110lawliet:TqEo8QRGylEr9Te2@cluster0.1cpto.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("connection established successfgully", conn.connection.host);
  } catch (err) {
    console.log("error in connecting to database ", err);
    process.exit(1);
  }
};
