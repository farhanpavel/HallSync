import express from "express";
import {
  paymentDelete,
  paymentGet,
  paymentPost,
  paymentGetById,
} from "../controllers/paymentController.js";

const paymentRouter = express.Router();
paymentRouter.get("/", paymentGet);
paymentRouter.get("/:id", paymentGetById);
paymentRouter.post("/", paymentPost);
paymentRouter.delete("/:id", paymentDelete);
export default paymentRouter;
