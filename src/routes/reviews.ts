import express from "express";
import * as reviewsController from "../controllers/reviews";

const router = express.Router();

router.get('/reviews', reviewsController.getAllReviews);
router.get('/reviews/:id', reviewsController.getSingleReview);
router.post('/reviews', reviewsController.createReview);
router.put('/reviews/:id', reviewsController.updateReview);
router.delete('/reviews/:id', reviewsController.deleteReview);

export default router;
