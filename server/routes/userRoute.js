import {
  userGet,
  userPost,
  userDelete,
  userCheckPost,
  userGetById,
  userPut,
} from "../controllers/userController.js";
import express from "express";

const userRouter = express.Router();
userRouter.get("/:id", userGetById);
userRouter.get("/", userGet);
userRouter.post("/", userPost);
userRouter.post("/check", userCheckPost);
userRouter.delete("/:id", userDelete);
userRouter.put("/:id", userPut);
export default userRouter;
