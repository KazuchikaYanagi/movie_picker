import { Request, Response } from "express";

const popularMovies = async (req: Request, res: Response) => {
  try {
    const popularMovieUrl = `${process.env.MOVIE_URL}/popular?language=en-US&page=1`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN_AUTH}`,
      },
    };
    const response = await fetch(popularMovieUrl, options);
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
    console.log(data);
    res.json(data);
  } catch (err) {
    console.error(err);
  }
};

export default {
  popularMovies,
  movieDetail,
};
