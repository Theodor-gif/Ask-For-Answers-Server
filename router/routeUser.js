import express from "express";
import {
  allUsers,
  createUser,
  changeUser,
  deleteUser,
  logUser,
} from "../controller/userController.js";
import isAuth from "../middleware/isAuth.js";

export const routeUser = express.Router();

routeUser.get("/users", allUsers);
routeUser.post("/register", createUser);
routeUser.put("/change", isAuth, changeUser);
routeUser.delete("/deleteUser", isAuth, deleteUser);
routeUser.post("/login", logUser);
