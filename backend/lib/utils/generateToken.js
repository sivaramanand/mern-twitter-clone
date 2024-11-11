import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign(
    { userId }, 
    "T/3v/p+DhBOZ1AgBBbcDdqa6WAPgVx9pYkVQAS4e+14=", 
    {
      expiresIn: "15d",
    }
  );

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: false,
  });
};
