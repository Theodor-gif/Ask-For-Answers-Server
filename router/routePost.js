import express from "express";
import {
  allPosts,
  createPost,
  deletePost,
  changePost,
} from "../controller/postController.js";

export const routePosts = express.Router();

routePosts.get("/posts", allPosts);
routePosts.post("/upload/:id", createPost); // Does not need normaly with auth
routePosts.delete("/deletePost/:id", deletePost);
routePosts.put("/changePost/:id", changePost);
