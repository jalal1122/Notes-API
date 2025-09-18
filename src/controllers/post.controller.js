import * as postService from "../services/post.service.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";

export const createPost = async (req, res) => {
  try {
    const post = await postService.createPost(req.body);
    ApiResponse.success(res, 201, post);
  } catch (error) {
    ApiResponse.error(res, 500, error.message);
  }
};
export const getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    ApiResponse.success(res, 200, posts);
  } catch (error) {
    ApiResponse.error(res, 500, error.message);
  }
};
export const getPostById = async (req, res) => {
  try {
    const post = await postService.getPostById(req.params.id);
    if (!post) {
      return ApiResponse.error(res, 404, "Post not found");
    }
    ApiResponse.success(res, 200, post);
  } catch (error) {
    ApiResponse.error(res, 500, error.message);
  }
};
export const updatePost = async (req, res) => {
  try {
    const post = await postService.updatePost(req.params.id, req.body);
    if (!post) {
      return ApiResponse.error(res, 404, "Post not found");
    }
    ApiResponse.success(res, 200, post);
  } catch (error) {
    ApiResponse.error(res, 500, error.message);
  }
};
export const deletePost = async (req, res) => {
  try {
    const post = await postService.deletePost(req.params.id);
    if (!post) {
      return ApiResponse.error(res, 404, "Post not found");
    }
    ApiResponse.success(res, 200, { message: "Post deleted successfully" });
  } catch (error) {
    ApiResponse.error(res, 500, error.message);
  }
};

export const deleteAllPosts = async (req, res) => {
  try {
    await postService.deleteAllPosts();
    ApiResponse.success(res, 200, {
      message: "All posts deleted successfully",
    });
  } catch (error) {
    ApiResponse.error(res, 500, error.message);
  }
};
