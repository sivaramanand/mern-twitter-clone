import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log("connection established successfgully", conn.connection.host);
  } catch (err) {
    console.log("error in connecting to database ", err);
    process.exit(1);
  }
};
