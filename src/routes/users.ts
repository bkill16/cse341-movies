import express from "express";
import * as usersController from "../controllers/users";

const router = express.Router();
const { requiresAuth } = require("express-openid-connect");

router.get("/", requiresAuth(), usersController.getAllUsers);

export default router;
