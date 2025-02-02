import { faCalendar, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import NoImage from "../../public/no_image.png";
import MovieCard, { Movie } from "../components/MovieCard";
import NextPageButton from "../components/NextPageButton";
import PrevPageButton from "../components/PrevPageButton";
import Header from "../features/Header";
import { MovieData } from "../types/MovieContext";

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
    const getDiscoverMovies = async (search: string, page: number) => {
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
              "--image-url": `url(${
                backdrop_path
                  ? `https://image.tmdb.org/t/p/w500${backdrop_path}`
                  : NoImage
              })`,
            } as React.CSSProperties
          }
          className="bg-[image:var(--image-url)] w-full h-[60vh] md:h-[70vh] bg-cover object-contain fixed z-10 brightness-50 hidden md:block"
        ></span>
        <Header />

        <div className="fixed z-20">
          <p className="absolute w-[100vw] md:text-3xl font-bold text-orange-500 bg-opacity-0 top-28 left-7 hidden md:block">
            {title || fetchPopularMovies[0]?.title}
          </p>
          <p className="absolute text-orange-500 md:text-2xl bg-opacity-0 top-[50vh] md:top-[64vh] w-44 text-center left-[30vw] md:left-[65vw] font-bold  hidden md:block">
            <FontAwesomeIcon icon={faCalendar} className="mr-2" />
            {release_date || fetchPopularMovies[0]?.release_date}
          </p>
          <p className="absolute w-28 text-orange-500 md:text-2xl bg-opacity-0 top-[50vh] md:top-[64vh] left-[70vw] md:left-[85vw] text-center font-bold hidden md:block">
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
        {fetchDiscoverMovies.length > 1 && search.length > 0 ? (
          <>
            <h3 className="text-lg font-bold text-orange-500 uppercase p-3 pt-14 md:pt-[72vh]">
              Found movies
            </h3>
            <ul className="grid w-full grid-cols-3 overflow-x-auto md:flex no-scrollbar gap-y-3 md:grid-rows-1">
              {fetchDiscoverMovies.map((movie) => (
                <MovieCard movie={movie} />
              ))}
            </ul>

            {/* page buttons */}
            <div className="flex items-center justify-center pt-4">
              {/* previous page button */}
              {currentDiscoverPage !== 1 && (
                <PrevPageButton onPrevPage={handlePreviousDiscoverPage} />
              )}

              <span className="px-4 text-2xl text-orange-500">
                {currentDiscoverPage}
              </span>

              {/* next page button */}
              <NextPageButton onNextPage={handleNextDiscoverPage} />
            </div>
          </>
        ) : (
          <>
            <h3 className="text-orange-500 uppercase pt-14 md:pt-[72vh] font-bold text-xl p-5">
              trend movie
            </h3>
            <ul className="grid w-full grid-cols-3 gap-y-3 md:flex md:grid-rows-1 md:overflow-x-auto md:no-scrollbar">
              {fetchPopularMovies.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
              ))}
            </ul>

            <div className="flex items-center justify-center pt-4">
              {/* previous page button */}
              {currentPage !== 1 && (
                <PrevPageButton onPrevPage={handlePreviousPage} />
              )}

              <span className="px-4 text-2xl text-orange-500">
                {currentPage}
              </span>

              {/* next page button */}
              <NextPageButton onNextPage={handleNextPage} />
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default Home;
