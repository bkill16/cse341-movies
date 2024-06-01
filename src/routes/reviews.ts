import { Router } from "express";
import * as reviewsController from "../controllers/reviewsController";

const router: Router = Router();

router.get("/", reviewsController.getAllReviews);
router.get("/:id", reviewsController.getSingleReview);
router.post("/", reviewsController.createReview);
router.put("/:id", reviewsController.updateReview);
router.delete("/:id", reviewsController.deleteReview);

export default router;