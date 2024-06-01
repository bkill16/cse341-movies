import { Router } from "express";
import * as actorsController from "../controllers/actorsController";

const router: Router = Router();

router.get("/", actorsController.getAllActors);
router.get("/:id", actorsController.getSingleActor);
router.post("/", actorsController.createActor);
router.put("/:id", actorsController.updateActor);
router.delete("/:id", actorsController.deleteActor);

export default router;
