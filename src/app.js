import express from "express";
import ApiError from "./utils/apiError.js";
import postRouter from "./routes/post.route.js";
import Redis from "ioredis";

const redis = new Redis();

const app = express();

// Middleware to parse JSON requests
app.use(express.json());
// Middleware to handle URL-encoded data
app.use(express.urlencoded({ extended: true }));

app.use("/api/posts", postRouter);

// handle errors
app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      message: err.message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
  }
  return res.status(500).json({
    message: "Internal Server Error",
  });
});

export default app;

export { redis };