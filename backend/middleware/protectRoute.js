import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "unauthorized: no token provided" });
    }

    const decoded = jwt.verify(
      token,
      "T/3v/p+DhBOZ1AgBBbcDdqa6WAPgVx9pYkVQAS4e+14="
    );
    if (!decoded) {
      return res.status(401).json({ error: "unauthorized: invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    req.user = user;

    next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: "unauthorized: invalid token" });
    }

    return res.status(500).json({ error: "server error" });
  }
};
