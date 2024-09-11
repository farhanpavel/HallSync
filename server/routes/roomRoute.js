import express from "express";
import {
  roomGet,
  roomPost,
  roomDelete,
  roomGetAll,
  roomGetById,
  roomGetByStudentId,
  roomGetWithForm,
} from "../controllers/roomController.js";

const roomRouter = express.Router();
roomRouter.get("/data/:hallid/:room", roomGet);
roomRouter.get("/:id/:room", roomGetById);
roomRouter.get("/", roomGetAll);
roomRouter.get("/studentdata/data/:id", roomGetByStudentId);
roomRouter.get("/roomdata/form/:hallid", roomGetWithForm);
roomRouter.post("/", roomPost);
roomRouter.delete("/:id", roomDelete);
export default roomRouter;
