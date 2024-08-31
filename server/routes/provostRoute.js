import {
  provostGet,
  provostGetByActive,
  provostMix,
} from "../controllers/provostController.js";

import express from "express";

const provostRouter = express.Router();
provostRouter.get("/", provostGet);
provostRouter.put("/:id", provostMix);
provostRouter.get("/active/:id", provostGetByActive);

export default provostRouter;
