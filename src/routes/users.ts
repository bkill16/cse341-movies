import express from "express";
import {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  validateUserData,
  validateObjectId,
  validateRequest,
} from "../controllers/usersController";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", validateObjectId, validateRequest, getSingleUser);
router.post("/", validateUserData, validateRequest, createUser);
router.put(
  "/:id",
  validateObjectId,
  validateUserData,
  validateRequest,
  updateUser
);
router.delete("/:id", validateObjectId, validateRequest, deleteUser);

export default router;
