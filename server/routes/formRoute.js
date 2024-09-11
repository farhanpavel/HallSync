import express from "express";
import {
  createForm,
  formDelete,
  formGet,
  formGetByActive,
  formGetById,
  formGetByIdAnother,
  formGetByIdAnotherTwo,
  formGetByStatus,
  formPut,
} from "../controllers/formController.js";

const formRouter = express.Router();

formRouter.post("/", createForm);
formRouter.get("/", formGet);
formRouter.get("/studentdata/:hallid/:active", formGetByIdAnother);
formRouter.get("/formdata/:hallid", formGetByIdAnotherTwo);
formRouter.get("/activedata/data/:active", formGetByActive);
formRouter.get("/:id", formGetById);
formRouter.get("/status/data/:id", formGetByStatus);
formRouter.put("/:id", formPut);
formRouter.delete("/:id", formDelete);
export default formRouter;
