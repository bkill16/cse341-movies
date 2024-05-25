import { Router } from "express";
import moviesRouter from "./movies";
import actorsRouter from "./actors";
import associationsRouter from "./associations"
import { swaggerUi, swaggerDocument } from "../swaggerConfig";

const router: Router = Router();

router.use("/movies", moviesRouter);
router.use("/actors", actorsRouter);
router.use("/movie-actors", associationsRouter);
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;
