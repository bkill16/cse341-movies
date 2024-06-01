import { Router } from "express";
import * as usersController from "../controllers/usersController";

const router: Router = Router();

router.get("/", usersController.getAllUsers);
router.get("/:id", usersController.getSingleUser);
router.post("/", usersController.createUser);
router.put("/:id", usersController.updateUser);
router.delete("/:id", usersController.deleteUser);

export default router;