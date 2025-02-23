import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// It protects routes that require authentication by verifying the user's JWT
export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;//jwt token

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);//verify the token

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    //find the user in db using decoded id
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //attaching the user object for further use
    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
