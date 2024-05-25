import { Router } from "express";
import * as associationController from "../controllers/associationController";

const router: Router = Router();

router.get("/", associationController.getAllAssociations);
router.get("/:id", associationController.getSingleAssociation);
router.post("/", associationController.createAssociation);

export default router;
