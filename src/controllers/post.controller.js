import * as postService from "../services/post.service.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { redis } from "../app.js";

export const createPost = async (req, res) => {
  try {
    const post = await postService.createPost(req.body);
    res
      .statusCode(201)
      .res.json(new ApiResponse("Post created successfully", 201, post));
  } catch (error) {
    res
      .statusCode(500)
      .res.json(new ApiError("Failed to create post", 400, error.message));
  }
};
export const getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    res
      .statusCode(200)
      .res.json(new ApiResponse("Posts retrieved successfully", 200, posts));
  } catch (error) {
    res
      .statusCode(500)
      .res.json(new ApiError("Failed to retrieve posts", 400, error.message));
  }
};
export const getPostById = async (req, res) => {
  try {
    const post = await postService.getPostById(req.params.id);
    if (!post) {
      return res.statusCode(404).res.json(new ApiError("Post not found", 404));
    }
    res
      .statusCode(200)
      .res.json(new ApiResponse("Post retrieved successfully", 200, post));
  } catch (error) {
    res
      .statusCode(500)
      .res.json(new ApiError("Failed to retrieve post", 400, error.message));
  }
};
export const updatePost = async (req, res) => {
  try {
    const post = await postService.updatePost(req.params.id, req.body);
    if (!post) {
      res.statusCode(404).res.json(new ApiError("Post not found", 404));
    }
    res
      .statusCode(200)
      .res.json(new ApiResponse("Post updated successfully", 200, post));
  } catch (error) {
    res
      .statusCode(500)
      .res.json(new ApiError("Failed to update post", 400, error.message));
  }
};
export const deletePost = async (req, res) => {
  try {
    const post = await postService.deletePost(req.params.id);
    if (!post) {
      return res.statusCode(404).res.json(new ApiError("Post not found", 404));
    }
    res
      .statusCode(200)
      .res.json(new ApiResponse("Post deleted successfully", 200));
  } catch (error) {
    res
      .statusCode(500)
      .res.json(new ApiError("Failed to delete post", 400, error.message));
  }
};

export const deleteAllPosts = async (req, res) => {
  try {
    await postService.deleteAllPosts();
    res
      .statusCode(200)
      .res.json(new ApiResponse("All posts deleted successfully", 200));
  } catch (error) {
    res
      .statusCode(500)
      .res.json(new ApiError("Failed to delete all posts", 400, error.message));
  }
};

export const getPopularPosts = async (req, res) => {
  try {
    const cacheKey = "popularPosts";
    const cachedPosts = await redis.get(cacheKey);
    if (cachedPosts) {
      console.log("Serving from cache");
      return res
        .statusCode(200)
        .res.json(
          new ApiResponse(
            "Popular posts retrieved successfully",
            200,
            JSON.parse(cachedPosts)
          )
        );
    }
    const posts = await postService.getPopularPosts();
    await redis.set(cacheKey, JSON.stringify(posts), "EX", 3600);
    console.log("Serving from database");
    res
      .statusCode(200)
      .res.json(
        new ApiResponse("Popular posts retrieved successfully", 200, posts)
      );
  } catch (error) {
    res
      .statusCode(500)
      .res.json(
        new ApiError("Failed to retrieve popular posts", 400, error.message)
      );
  }
};
