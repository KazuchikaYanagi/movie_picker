// import { v4 as uuid4 } from "uuid";
// import { Movie } from "../types/movie";

const findMovies = async (title: string) => {
  try {
    const findTitleMatchedUrl = `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=1`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.DETAILS_ACCESS_TOKEN}`,
      },
    };

    const res = await fetch(findTitleMatchedUrl, options);
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

const getMatchedTitleMovies = (title: string) => {
  return findMovies(title);
};

export default {
  findMovies,
  getMatchedTitleMovies,
};
