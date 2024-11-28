import { Request, Response, Router } from "express";
import dotenv from "dotenv";
import movieController from "../controllers/movie.controller";
dotenv.config();

const movieRouter = Router();

movieRouter.get("/popular", movieController.popularMovies);
movieRouter.get("/:id", movieController.movieDetail);
movieRouter.get("/upcoming", movieController.upcomingMovies);
movieRouter.post("/find/", movieController.findMatchedTitleMovie);
// movieRouter.get("/discover", movieController.discoverMovies);

export default movieRouter;
