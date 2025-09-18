import Post from "../models/post.model.js";

export const createPost = async (postData) => {
  const post = new Post(postData);
  return await post.save();
};

export const getAllPosts = async () => {
  return await Post.find();
};

export const getPostById = async (id) => {
  return await Post.findById(id);
};

export const updatePost = async (id, postData) => {
  return await Post.findByIdAndUpdate(id, postData, { new: true });
};

export const deletePost = async (id) => {
  return await Post.findByIdAndDelete(id);
};

export const deleteAllPosts = async () => {
  return await Post.deleteMany({});
};