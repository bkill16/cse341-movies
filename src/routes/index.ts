import { Router } from "express";
import moviesRouter from './movies';

const router: Router = Router();

router.use('/movies', moviesRouter);

export default router;