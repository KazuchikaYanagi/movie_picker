import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import Header from "../features/Header";
// import { MovieData } from "../App";

const Home: React.FC = () => {
  // const movies = useContext(MovieData);
  const [fetchPopularMovies, setFetchPopularMovies] = useState<string[]>([]);
  const [fetchUpcomingMovies, setFetchUpcomingMovies] = useState<string[]>([]);
  // const [fetchDiscoverMovies, setFetchDiscoverMovies] = useState<string[]>([]);

  useEffect(() => {
    const getPopularMovies = async () => {
      try {
        const res = await axios.get("http://localhost:3003/movies/popular");
        const data = res.data.results;
        console.log(data);
        setFetchPopularMovies(data);
      } catch (err) {
        console.error(err);
      }
    };
    getPopularMovies();
  }, []);

  useEffect(() => {
    const getUpcomingMovies = async () => {
      try {
        const res = await axios.get("http://localhost:3003/movies/upcoming");
        const data = res.data.results;
        console.log(data);
        setFetchUpcomingMovies(data);
      } catch (err) {
        console.error(err);
      }
    };
    getUpcomingMovies();
  }, []);

  return (
    <div
      style={{
        "--image-url": `url(https://image.tmdb.org/t/p/w500${fetchPopularMovies[0]?.backdrop_path})`,
      }}
      className="bg-[image:var(--image-url)] w-full h-[80vh] bg-cover"
    >
      <Header />

      <main className="bg-purple-950 pb-5">
        <h3 className="text-orange-500 uppercase mt-[73.7vh] font-bold text-4xl p-7">
          trend movie
        </h3>
        <ul className="flex overflow-x-auto w-full">
          {fetchPopularMovies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </ul>

        <h3 className="text-orange-500 uppercase font-bold text-4xl p-7">
          upcoming movie
        </h3>
        <ul className="flex overflow-x-auto w-full">
          {fetchUpcomingMovies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Home;
