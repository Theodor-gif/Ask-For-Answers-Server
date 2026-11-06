import express from "express";
import {
  allComments,
  createComment,
  deleteComment,
  changeComment,
} from "../controller/commentController.js";

export const routeComments = express.Router();

routeComments.get("/allComments", allComments);
routeComments.post("/addComment/:id", createComment);
routeComments.delete("/deleteComment/:id", deleteComment);
routeComments.put("/changeComment/:id", changeComment);
