import { Router } from "express";
import moviesRouter from "./movies";
import usersRouter from "./users";
import reviewsRouter from "./reviews";
import { swaggerUi, swaggerDocument } from "../swaggerConfig";

const router: Router = Router();

router.use("/movies", moviesRouter);
router.use("/users", usersRouter);
router.use("/reviews", reviewsRouter);
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;
