import { Router } from "express";
import * as associationsController from "../controllers/associationsController";

const router: Router = Router();

router.get("/", associationsController.getAllAssociations);
router.get("/:id", associationsController.getSingleAssociation);
router.post("/", associationsController.createAssociation);
router.put("/:id", associationsController.updateAssociation);
router.delete("/:id", associationsController.deleteAssociation);

export default router;
