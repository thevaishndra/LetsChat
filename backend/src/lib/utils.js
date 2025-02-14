import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  console.log("Generated Token:", token); // Debugging log

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true, // Prevents XSS attacks
    sameSite: "Lax", // Protects against CSRF attacks
    secure: process.env.NODE_ENV !== "development",
  });

  console.log("JWT cookie set successfully");

  return token;
};
