import express from "express";
import {
  allComments,
  createComment,
  deleteComment,
  changeComment,
} from "../controller/commentController.js";
import isAuth from "../middleware/isAuth.js";

export const routeComments = express.Router();

routeComments.get("/allComments", allComments);
routeComments.post("/addComment/:id", isAuth, createComment);
routeComments.delete("/deleteComment/:id", isAuth, deleteComment);
routeComments.put("/changeComment/:id", isAuth, changeComment);
