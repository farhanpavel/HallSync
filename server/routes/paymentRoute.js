import express from "express";
import {
  paymentDelete,
  paymentGet,
  paymentPost,
  paymentGetById,
  paymentGetByStudentId,
} from "../controllers/paymentController.js";

const paymentRouter = express.Router();
paymentRouter.get("/", paymentGet);
paymentRouter.get("/:id", paymentGetById);
paymentRouter.get("/data/:id/:status", paymentGetByStudentId);
paymentRouter.post("/", paymentPost);
paymentRouter.delete("/:id", paymentDelete);
export default paymentRouter;
