import express from "express";
import {
  noticeDelete,
  noticeGet,
  noticeGetByRole,
  noticePost,
} from "../controllers/noticeController.js";

const noticeRouter = express.Router();
noticeRouter.get("/data/:id/:role", noticeGet);
noticeRouter.get("/:id/:role", noticeGetByRole);
noticeRouter.post("/", noticePost);
noticeRouter.delete("/:id", noticeDelete);
export default noticeRouter;
