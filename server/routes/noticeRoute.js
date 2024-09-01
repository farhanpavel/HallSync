import express from "express";
import {
  noticeDelete,
  noticeGet,
  noticePost,
} from "../controllers/noticeController.js";

const noticeRouter = express.Router();
noticeRouter.get("/", noticeGet);

noticeRouter.post("/", noticePost);
noticeRouter.delete("/:id", noticeDelete);
export default noticeRouter;
