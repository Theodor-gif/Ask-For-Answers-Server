import express from "express";
import {
  allUsers,
  createUser,
  changeUser,
  deleteUser,
  logUser,
} from "../controller/userController.js";

export const routeUser = express.Router();

routeUser.get("/users", allUsers);
routeUser.post("/register", createUser);
routeUser.put("/change/:id", changeUser);
routeUser.delete("/deleteUser/:id", deleteUser);
routeUser.post("/login", logUser);
