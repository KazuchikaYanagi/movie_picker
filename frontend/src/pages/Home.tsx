import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import MovieCard, { Movie } from "../components/MovieCard";
import Header from "../features/Header";
import { MovieData } from "../types/MovieContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faStar } from "@fortawesome/free-solid-svg-icons";

const Home: React.FC = () => {
  const context = useContext(MovieData);

  if (!context) throw new Error("MovieData context is not provided");

  const { search, backdropImage } = context;
  const { backdrop_path, title, release_date, vote_average } = backdropImage;

  const [fetchPopularMovies, setFetchPopularMovies] = useState<Movie[]>([]);
  const [fetchDiscoverMovies, setFetchDiscoverMovies] = useState<Movie[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentDiscoverPage, setCurrentDiscoverPage] = useState<number>(1);

  useEffect(() => {
    const getPopularMovies = async () => {
      try {
        const res = await axios.get(
          `https://movie-picker-backend.vercel.app/movies/popular/${currentPage}`
        );
        const data = res.data.results;
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

        const res = await axios.get(
          `https://movie-picker-backend.vercel.app/movies/find/${search}/${page}`
        );
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
          style={
            {
              "--image-url": `url(https://image.tmdb.org/t/p/w500${
                !backdrop_path
                  ? fetchPopularMovies[0]?.backdrop_path
                  : backdrop_path
              })`,
            } as React.CSSProperties
          }
          className="bg-[image:var(--image-url)] w-full h-[70vh] bg-cover fixed z-10 brightness-50"
        ></span>
        <Header />

        <div className="fixed z-20">
          <p className="absolute w-[100vw] text-3xl font-bold text-orange-500 bg-opacity-0 top-28 left-7">
            {title || fetchPopularMovies[0]?.title}
          </p>
          <p className="absolute w-28 text-orange-500 text-2xl bg-opacity-0 top-[64vh] w-44 text-center left-[65vw] font-bold">
            <FontAwesomeIcon icon={faCalendar} className="mr-2" />
            {release_date || fetchPopularMovies[0]?.release_date}
          </p>
          <p className="absolute w-28 text-orange-500 text-2xl bg-opacity-0 top-[64vh] left-[85vw] text-center font-bold">
            <FontAwesomeIcon icon={faStar} className="mr-2" />
            {Number(Math.round((vote_average * 100) / 10).toFixed(2)) / 10 ||
              Number(
                Math.round(
                  (fetchPopularMovies[0]?.vote_average * 100) / 10
                ).toFixed(2)
              ) / 10}
          </p>
        </div>
      </div>

      <main className="pb-5 bg-purple-950">
        {fetchDiscoverMovies.length > 1 ? (
          <>
            <h3 className="text-lg font-bold text-orange-500 uppercase p-3 pt-[72vh]">
              Found movies
            </h3>
            <ul className="flex w-full overflow-x-auto no-scrollbar">
              {fetchDiscoverMovies.map((movie) => (
                <MovieCard movie={movie} />
              ))}
            </ul>

            {/* page buttons */}
            <div className="flex items-center justify-center pt-4">
              {/* previous page button */}
              {currentDiscoverPage !== 1 && (
                <button
                  type="button"
                  onClick={handlePreviousDiscoverPage}
                  className="flex items-center px-2 text-4xl text-opacity-0 bg-orange-500 rounded-full"
                >
                  &larr; <span className="pl-2 text-lg">Prev</span>
                </button>
              )}

              <span className="px-4 text-2xl text-orange-500">
                {currentDiscoverPage}
              </span>

              {/* next page button */}
              <button
                type="submit"
                onClick={handleNextDiscoverPage}
                className="flex items-center px-2 text-4xl bg-orange-500 rounded-full text-opacity-10"
              >
                <span className="pr-2 text-lg">Next</span> &rarr;
              </button>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-orange-500 uppercase pt-[72vh] font-bold text-xl p-5">
              trend movie
            </h3>
            <ul className="flex w-full overflow-x-auto no-scrollbar">
              {fetchPopularMovies.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
              ))}
            </ul>

            <div className="flex items-center justify-center pt-4">
              {/* previous page button */}
              {currentPage !== 1 && (
                <button
                  type="button"
                  onClick={handlePreviousPage}
                  className="flex items-center px-2 text-4xl bg-orange-500 rounded-full text-opacity-10"
                >
                  &larr; <span className="pl-2 text-lg">Prev</span>
                </button>
              )}

              <span className="px-4 text-2xl text-orange-500">
                {currentPage}
              </span>

              {/* next page button */}
              <button
                type="submit"
                onClick={handleNextPage}
                className="flex items-center px-2 text-4xl bg-orange-500 rounded-full text-opacity-10"
              >
                <span className="pr-2 text-lg">Next</span> &rarr;
              </button>
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default Home;
