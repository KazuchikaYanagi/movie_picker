import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import Header from "../features/Header";
import { MovieData } from "../App";

const Home: React.FC = () => {
  const { search, backdropImage } = useContext(MovieData);
  const { backdrop_path, title, release_date, vote_average, runtime } =
    backdropImage;

  const [fetchPopularMovies, setFetchPopularMovies] = useState<string[]>([]);
  const [fetchDiscoverMovies, setFetchDiscoverMovies] = useState<string[]>([]);

  console.log(search);
  console.log(title, backdrop_path, release_date, vote_average);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentDiscoverPage, setCurrentDiscoverPage] = useState<number>(1);

  useEffect(() => {
    const getPopularMovies = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3003/movies/popular/${currentPage}`
        );
        const data = res.data.results;
        console.log(data);
        setFetchPopularMovies(data);
      } catch (err) {
        console.error(err);
      }
    };
    getPopularMovies();
  }, [currentPage]);

  useEffect(() => {
    const getDiscoverMovies = async (title: string, page: number) => {
      try {
        if (search.length < 3) return;

        console.log(title);
        console.log(title.search);
        const res = await axios.get(
          `http://localhost:3003/movies/find/${search}/${page}`
        );
        console.log("movie fetching with matching titles");
        console.log(res.data.results);
        setFetchDiscoverMovies(res.data?.results);
        return res;
      } catch (err) {
        console.error(err);
      }
    };
    getDiscoverMovies(search, currentDiscoverPage);
  }, [search, currentDiscoverPage]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  };

  const handleNextDiscoverPage = () => {
    setCurrentDiscoverPage(currentDiscoverPage + 1);
  };

  const handlePreviousDiscoverPage = () => {
    if (currentDiscoverPage === 1) return;
    setCurrentDiscoverPage(currentDiscoverPage - 1);
  };

  return (
    <>
      <div className="relative">
        <span
          style={{
            "--image-url": `url(https://image.tmdb.org/t/p/w500${
              !backdrop_path
                ? fetchPopularMovies[0]?.backdrop_path
                : backdrop_path
            })`,
          }}
          className="bg-[image:var(--image-url)] w-full h-[70vh] bg-cover fixed z-10 brightness-50"
        ></span>
        <Header />

        <div className="fixed z-20">
          <p className="absolute text-orange-500 bg-red-100 min-w-32 top-28">
            {title}
          </p>
          <p className="absolute w-28 text-orange-500 text-lg bg-opacity-0 top-80 left-[60vw]">
            {release_date}
          </p>
          <p className="absolute w-28 text-orange-500 text-lg bg-opacity-0 top-80 left-[70vw]">
            {runtime}
          </p>
          <p className="absolute w-28 text-orange-500 text-lg bg-opacity-0 top-80 left-[80vw]">
            {vote_average}
          </p>
        </div>
      </div>

      <main className="pb-5 bg-purple-950">
        {fetchDiscoverMovies.length > 1 ? (
          <>
            <h3 className="text-lg font-bold text-orange-500 uppercase p-3 pt-[72vh]">
              Found movies
            </h3>
            <ul className="flex w-full overflow-x-auto">
              {fetchDiscoverMovies.map((movie) => (
                <MovieCard movie={movie} />
              ))}
            </ul>

            {/* previous page button */}
            <button
              type="button"
              onClick={handlePreviousDiscoverPage}
              className="text-4xl text-orange-500"
            >
              &larr;
            </button>

            {/* next page button */}
            <button
              type="submit"
              onClick={handleNextDiscoverPage}
              className="text-4xl text-orange-500"
            >
              &rarr;
            </button>
          </>
        ) : (
          <>
            <h3 className="text-orange-500 uppercase pt-[72vh] font-bold text-xl p-5">
              trend movie
            </h3>
            <ul className="flex w-full overflow-x-auto">
              {fetchPopularMovies.map((movie) => (
                <MovieCard movie={movie} key={movie.id!} />
              ))}
            </ul>

            {/* previous page button */}
            <button
              type="button"
              onClick={handlePreviousPage}
              className="text-4xl text-orange-500"
            >
              &larr;
            </button>

            {/* next page button */}
            <button
              type="submit"
              onClick={handleNextPage}
              className="text-4xl text-orange-500"
            >
              &rarr;
            </button>
          </>
        )}

        {/* <h3 className="text-3xl text-orange-600">fetch movie</h3>
        <ul className="text-orange-600">
          {fetchDiscoverMovies?.map((m) => (
            <li className="text-orange-600">{m.title}</li>
          ))}
        </ul> */}

        {/* <p>{fetchDiscoverMovies ?? "empty"}</p> */}

        {/* <h3 className="text-4xl font-bold text-orange-500 uppercase p-7">
          upcoming movie
        </h3>
        <ul className="flex w-full overflow-x-auto">
          {fetchUpcomingMovies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </ul> */}
      </main>
    </>
  );
};

export default Home;
