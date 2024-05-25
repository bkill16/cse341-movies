import { Router } from "express";
import moviesRouter from './movies';
import actorsRouter from './actors';

const router: Router = Router();

router.use('/movies', moviesRouter);
router.use('/actors', actorsRouter);

export default router;