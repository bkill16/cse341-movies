import { Router } from "express";
import moviesRouter from "./movies";
import reviewsRouter from "./reviews";
import usersController from "./users"
import { swaggerUi, swaggerDocument } from "../swaggerConfig";

const router: Router = Router();

router.use("/movies", moviesRouter);
router.use("/reviews", reviewsRouter);
router.use("/users", usersController);
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;
