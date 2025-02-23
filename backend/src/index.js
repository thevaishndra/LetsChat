import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://letschat-peic.onrender.com"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//server connection test
app.get("/", (request, response) => {
  return response.status(200).send("Backend running");
});

//API routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

//start server
server.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
  connectDB();
});
