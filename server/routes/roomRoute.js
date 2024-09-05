import express from "express";
import {
  roomGet,
  roomPost,
  roomDelete,
  roomGetAll,
  roomGetById,
} from "../controllers/roomController.js";

const roomRouter = express.Router();
roomRouter.get("/data/:hallid/:room", roomGet);
roomRouter.get("/:id/:room", roomGetById);
roomRouter.get("/", roomGetAll);
roomRouter.post("/", roomPost);
roomRouter.delete("/:id", roomDelete);
export default roomRouter;
