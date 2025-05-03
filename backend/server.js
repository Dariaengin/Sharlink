import express from "express";
import cors from "cors";
import authRoutes from "./auth/auth.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(2100, () => {
      console.log("Server running on http://localhost:2100");
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));