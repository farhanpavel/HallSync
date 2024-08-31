import express from "express";
import {
  hallDelete,
  hallGet,
  hallGetById,
  hallPost,
  hallPut,
} from "../controllers/hallController.js";

const hallRouter = express.Router();
hallRouter.get("/", hallGet);

hallRouter.post("/", hallPost);
hallRouter.put("/:id", hallPut);
hallRouter.delete("/:id", hallDelete);
hallRouter.get("/:id", hallGetById);
export default hallRouter;
