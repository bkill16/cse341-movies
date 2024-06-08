import express from "express";
import * as usersController from "../controllers/users";
import { idValidationRules, userValidationRules, validate } from "../validator";

const router = express.Router();

const { requiresAuth } = require("express-openid-connect");

router.get("/", requiresAuth(), usersController.getAllUsers);
router.get("/:id", requiresAuth(), idValidationRules(), validate, usersController.getSingleUser);
router.post("/", userValidationRules(), validate, usersController.createUser);
router.put("/:id", userValidationRules(), validate, usersController.updateUser);
router.delete("/:id", idValidationRules(), validate, usersController.deleteUser);

export default router;
