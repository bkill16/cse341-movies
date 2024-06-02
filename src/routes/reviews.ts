import express from "express";
import {
  getAllReviews,
  getSingleReview,
  createReview,
  updateReview,
  deleteReview,
  validateReviewData,
  validateObjectId,
  validateRequest,
} from "../controllers/reviewsController";

const router = express.Router();

router.get("/", getAllReviews);
router.get("/:id", validateObjectId, getSingleReview);
router.post("/", validateReviewData, validateRequest, createReview);
router.put("/:id", validateObjectId, validateReviewData, validateRequest, updateReview);
router.delete("/:id", validateObjectId, deleteReview);

export default router;
