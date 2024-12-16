import { Request, Response, Router } from "express";
import dotenv from "dotenv";
import movieController from "../controllers/movie.controller";
dotenv.config();

const movieRouter = Router();

movieRouter.get("/popular/:page", movieController.popularMovies);
movieRouter.get("/find/:title/:page", movieController.findMatchedTitleMovie);
movieRouter.get("/:id", movieController.movieDetail);
movieRouter.get("/upcoming", movieController.upcomingMovies);

export default movieRouter;
