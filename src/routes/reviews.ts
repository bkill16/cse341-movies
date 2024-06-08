import express from "express";
import * as reviewsController from "../controllers/reviews";
import { idValidationRules, reviewValidationRules, validate } from "../validator";

const router = express.Router();

const { requiresAuth } = require("express-openid-connect");

router.get('/', requiresAuth(), reviewsController.getAllReviews);
router.get('/:id', requiresAuth(), idValidationRules(), validate, reviewsController.getSingleReview);
router.post('/', reviewValidationRules(), validate, reviewsController.createReview);
router.put('/:id', reviewValidationRules(), validate, reviewsController.updateReview);
router.delete('/:id', idValidationRules(), validate, reviewsController.deleteReview);

export default router;
