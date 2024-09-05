import express from "express";
import {
  createForm,
  formDelete,
  formGet,
  formGetById,
  formGetByIdAnother,
  formGetByIdAnotherTwo,
  formPut,
} from "../controllers/formController.js";

const formRouter = express.Router();

formRouter.post("/", createForm);
formRouter.get("/", formGet);
formRouter.get("/studentdata/:hallid/:active", formGetByIdAnother);
formRouter.get("/formdata/:hallid", formGetByIdAnotherTwo);
formRouter.get("/:id", formGetById);
formRouter.put("/:id", formPut);
formRouter.delete("/:id", formDelete);
export default formRouter;
