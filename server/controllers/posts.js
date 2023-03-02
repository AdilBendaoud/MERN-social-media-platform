import express from "express";
import Post from "../models/Post.js";
import User from "../models/User.js";

//POST
export const createPost = async (req, res) => {
  try {
    const { userId, description, postPic } = req.body;
    const user = await User.findById(userId);
    const newPost = await Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      userPic: user.picturePath,
      postPic,
      description,
      likes: {},
      dislikes: {},
      comments: [],
    });

    await newPost.save();
    const Allposts = await Post.find();
    res.status(201).json(Allposts);
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};

//GET
export const getAllPosts = async (req, res) => {
  try {
    const Allposts = await Post.find();
    res.status(200).json(Allposts);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const getUserPost = async (req, res) => {
  try {
    const { userid } = req.params;
    const foundPost = await Post.find({ userId: userid });
    res.status(200).json(foundPost);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

//PATCH
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);
    const isDisliked = post.dislikes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    }

    if (isDisliked) {
      post.dislikes.delete(userId);
    }

    if (!isLiked || isDisliked) {
      post.likes.set(userId, true);
    }

    const updatePost = await Post.findByIdAndUpdate(
      id,
      {
        likes: post.likes,
        dislikes: post.dislikes,
      },
      { new: true }
    );
    res.status(200).json(updatePost);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const dislikePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);
    const isDisliked = post.dislikes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    }

    if (isDisliked) {
      post.dislikes.delete(userId);
    }

    if (isLiked || !isDisliked) {
      post.dislikes.set(userId, true);
    }

    const updatePost = await Post.findByIdAndUpdate(
      id,
      {
        likes: post.likes,
        dislikes: post.dislikes,
      },
      { new: true }
    );
    res.status(200).json(updatePost);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
