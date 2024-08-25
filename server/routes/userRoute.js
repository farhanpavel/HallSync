import {
  userGet,
  userPost,
  userDelete,
  userCheckPost,
} from "../controllers/userController.js";
import express from "express";

const userRouter = express.Router();
userRouter.get("/", userGet);
userRouter.post("/", userPost);
userRouter.post("/check", userCheckPost);
userRouter.delete("/:id", userDelete);
export default userRouter;
