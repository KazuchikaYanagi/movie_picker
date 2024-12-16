import { Request, Response } from "express";
import movieModel from "../models/movie.model";

const popularMovies = async (req: Request, res: Response) => {
  try {
    console.log(req.params.page);
    const { page } = req.params;
    const popularMovieUrl = `${process.env.MOVIE_URL}/popular?language=en-US&page=${page}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN_AUTH}`,
      },
    };
    const response = await fetch(popularMovieUrl, options);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
  }
};

const upcomingMovies = async (req: Request, res: Response) => {
  try {
    const upcomingMovieUrl = `${process.env.MOVIE_URL}/upcoming?language=en-US&page=1`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.DETAILS_ACCESS_TOKEN}`,
      },
    };

    const response = await fetch(upcomingMovieUrl, options);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
  }
};

const findMatchedTitleMovie = async (req: Request, res: Response) => {
  try {
    const { title, page } = req.params;
    console.log(title);
    const findTitleMatchedUrl = `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=${page}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.DETAILS_ACCESS_TOKEN}`,
      },
    };

    const response = await fetch(findTitleMatchedUrl, options);
    const data = await response.json();
    console.log(data);
    res.json(data);
  } catch (err) {
    console.error(err);
  }
};

const movieDetail = async (req: Request<{ id: number }>, res: Response) => {
  const movieId = req.params.id;
  console.log(movieId);
  try {
    const detailMovieUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&append_to_response=credits,videos,reviews`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.DETAILS_ACCESS_TOKEN}`,
      },
    };

    const response = await fetch(detailMovieUrl, options);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
  }
};

export default {
  popularMovies,
  movieDetail,
  upcomingMovies,
  findMatchedTitleMovie,
};
