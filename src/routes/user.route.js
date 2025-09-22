import express from "express";
import ioredis from "ioredis";
import authMiddleware from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.get("/login", async (req, res) => {
  const redis = new ioredis();

  const token = await redis.get("token");
  if (token) {
    return res.status(200).json({ message: "Already logged in" });
  }
  const newToken = await redis.set("token", "some-generated", "EX", 3600); // Set token with 1 hour expiration
  res.status(200).json({ message: "Login successful", token: newToken });
});

userRouter.get("/session", authMiddleware, (req, res) => {
  console.log("Session check passed");
  res.status(200).json({ message: "Session is valid" });
});

export default userRouter;
