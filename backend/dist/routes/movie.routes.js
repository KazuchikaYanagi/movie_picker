"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dotenv_1 = __importDefault(require("dotenv"));
const movie_controller_1 = __importDefault(require("../controllers/movie.controller"));
dotenv_1.default.config();
const movieRouter = (0, express_1.Router)();
movieRouter.get("/popular", movie_controller_1.default.popularMovies);
movieRouter.get("/:id", movie_controller_1.default.movieDetail);
movieRouter.get("/upcoming", movie_controller_1.default.upcomingMovies);
movieRouter.post("/find/", movie_controller_1.default.findMatchedTitleMovie);
// movieRouter.get("/discover", movieController.discoverMovies);
exports.default = movieRouter;
