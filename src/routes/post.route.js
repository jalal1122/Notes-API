import * as postController from "../controllers/post.controller.js";
import express from "express";

const postRouter = express.Router();

postRouter.post("/", postController.createPost);
postRouter.get("/", postController.getAllPosts);
postRouter.get("/:id", postController.getPostById);
postRouter.put("/:id", postController.updatePost);
postRouter.delete("/:id", postController.deletePost);
postRouter.delete("/", postController.deleteAllPosts);

export default postRouter;
