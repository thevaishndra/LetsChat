import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './lib/db.js';
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js";


dotenv.config();
const app = express();

const PORT =process.env.PORT;
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes)

app.listen(PORT, () => {
    console.log("server is running on PORT:" + PORT);
    connectDB();
});