import express from "express";
import {
  failedPayment,
  initiatePayment,
  successPayment,
} from "../controllers/sslController.js";

const sslRouter = express.Router();

// Route to initiate payment
sslRouter.post("/init", initiatePayment);

// Route to validate payment
sslRouter.post("/success/:id", successPayment);
sslRouter.post("/fail", failedPayment);
export default sslRouter;
