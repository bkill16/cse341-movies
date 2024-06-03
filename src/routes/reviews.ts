import express from "express";
import * as reviewsController from "../controllers/reviews";
import { idValidationRules, reviewValidationRules, validate } from "../validator";

const router = express.Router();

router.get('/reviews', reviewsController.getAllReviews);
router.get('/reviews/:id', ...idValidationRules(), validate, reviewsController.getSingleReview);
router.post('/reviews', ...reviewValidationRules(), validate, reviewsController.createReview);
router.put('/reviews/:id', ...reviewValidationRules(), validate, reviewsController.updateReview);
router.delete('/reviews/:id', ...idValidationRules(), validate, reviewsController.deleteReview);

export default router;
