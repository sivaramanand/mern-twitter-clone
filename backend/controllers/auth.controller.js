import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullname, username, email, password } = req.body;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalud email format" });
    }
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: "username is already taken" });
    }

    const exisitingEmail = await User.findOne({ email });
    if (exisitingEmail) {
      return res.status(400).json({ error: "email already exists" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "password myust be atlekast 6 characters long" });
    }

    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newuser = new User({
      fullname: fullname,
      username: username,
      email: email,
      password: hashedPassword,
    });

    if (newuser) {
      generateTokenAndSetCookie(newuser._id, res);
      await newuser.save();

      res.status(201).json({
        _id: newuser._id,
        fullname: newuser.fullname,
        username: newuser.username,
        email: newuser.email,
        followers: newuser.followers,
        following: newuser.following,
        profileImg: newuser.profileImg,
        coverImg: newuser.coverImg,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (err) {
    console.log("error in signup controller", err.message);
    res.status(400).json({ error: "Invalid user data" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      followers: user.followers,
      following: user.following,
      profileImg: user.profileImg,
      coverImg: user.coverImg,
    });
  } catch (err) {
    console.log("Error in login controller:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "looged out successfully" });
  } catch (err) {
    console.log("error in logout controller", err.message);
    res.status(500).json({ message: "error in logout controller" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json(user);
  } catch (err) {
    console.log("error in getting is me controller", err.message);
    res.status(500).json({ err: "internal server error" });
  }
};
