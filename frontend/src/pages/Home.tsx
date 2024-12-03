import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import Header from "../features/Header";
import { MovieData } from "../App";

const Home: React.FC = () => {
  const search: string = useContext(MovieData);

  const [fetchPopularMovies, setFetchPopularMovies] = useState<string[]>([]);
  const [fetchDiscoverMovies, setFetchDiscoverMovies] = useState<string[]>([]);

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
        if (title.search.length < 3) return;

        console.log(title.search);
        const res = await axios.get(
          `http://localhost:3003/movies/find/${title.search}/${page}`
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
    <div
      style={{
        "--image-url": `url(https://image.tmdb.org/t/p/w500${fetchPopularMovies[0]?.backdrop_path})`,
      }}
      className="bg-[image:var(--image-url)] w-full h-[80vh] bg-cover"
    >
      <Header />

      <main className="bg-purple-950 pb-5">
        {/* {search.legth > 3 ? (
          <>
            <h3 className="text-orange-500 uppercase mt-[73.7vh] font-bold text-4xl p-7">
              trend movie
            </h3>
            <ul className="flex overflow-x-auto w-full">
              {fetchPopularMovies.map((movie) => (
                <MovieCard movie={movie} />
              ))}
            </ul>
          </>
        ) : (
          <>
            <h3 className="text-orange-500 uppercase mt-[73.7vh] font-bold text-4xl p-7">
              fetch
            </h3>
            <ul className="flex overflow-x-auto w-full">
              {fetchDiscoverMovies.map((movie) => (
                <MovieCard movie={movie} />
              ))}
            </ul>
          </>
        )} */}

        {fetchDiscoverMovies.length > 1 ? (
          <>
            <h3 className="text-orange-500 uppercase mt-[73.7vh] font-bold text-4xl p-7">
              Fetch movie
            </h3>
            <ul className="flex overflow-x-auto w-full">
              {fetchDiscoverMovies.map((movie) => (
                <MovieCard movie={movie} key={movie.id!} />
              ))}
            </ul>

            <button
              type="button"
              onClick={handlePreviousDiscoverPage}
              className="text-orange-500 text-4xl"
            >
              &larr;
            </button>
            <button
              type="submit"
              onClick={handleNextDiscoverPage}
              className="text-orange-500 text-4xl"
            >
              &rarr;
            </button>
          </>
        ) : (
          <>
            <h3 className="text-orange-500 uppercase mt-[73.7vh] font-bold text-4xl p-7">
              trend movie
            </h3>
            <ul className="flex overflow-x-auto w-full">
              {fetchPopularMovies.map((movie) => (
                <MovieCard movie={movie} key={movie.id!} />
              ))}
            </ul>

            <button
              type="button"
              onClick={handlePreviousPage}
              className="text-orange-500 text-4xl"
            >
              &larr;
            </button>
            <button
              type="submit"
              onClick={handleNextPage}
              className="text-orange-500 text-4xl"
            >
              &rarr;
            </button>
          </>
        )}

        {/* <h3 className="text-orange-600 text-3xl">fetch movie</h3>
        <ul className="text-orange-600">
          {fetchDiscoverMovies?.map((m) => (
            <li className="text-orange-600">{m.title}</li>
          ))}
        </ul> */}

        {/* <p>{fetchDiscoverMovies ?? "empty"}</p> */}

        {/* <h3 className="text-orange-500 uppercase font-bold text-4xl p-7">
          upcoming movie
        </h3>
        <ul className="flex overflow-x-auto w-full">
          {fetchUpcomingMovies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </ul> */}
      </main>
    </div>
  );
};

export default Home;
