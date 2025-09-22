import ioredis from "ioredis";

const authMiddleware = async (req, res, next) => {
  try {
    const redis = new ioredis();
    const token = await redis.get("token");
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    await redis.set("token", token, "EX", 3600); // Extend expiration by 1 hour

    next();
  } catch (error) {
    console.error("Error in authMiddleware:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default authMiddleware;
