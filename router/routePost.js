import express from "express";
import {
  allPosts,
  createPost,
  deletePost,
  changePost,
} from "../controller/postController.js";
import isAuth from "../middleware/isAuth.js";

export const routePosts = express.Router();

routePosts.get("/posts", allPosts);
routePosts.post("/upload", isAuth, createPost);
routePosts.delete("/deletePost/:id", isAuth, deletePost);
routePosts.put("/changePost/:id", isAuth, changePost);
