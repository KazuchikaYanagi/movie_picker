import { Request, Response, Router } from "express";
import dotenv from "dotenv";
import movieController from "../controllers/movie.controller";
dotenv.config();

const movieRouter = Router();

movieRouter.get("/", movieController.popularMovies);
movieRouter.get("/:id", movieController.movieDetail);
// movieRouter.get("/credit/:id", movieController.movieCredits);

export default movieRouter;
