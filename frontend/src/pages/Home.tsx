import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import Header from "../features/Header";
import { MovieData } from "../App";

const Home: React.FC = () => {
  const search = useContext(MovieData);
  const [fetchPopularMovies, setFetchPopularMovies] = useState<string[]>([]);
  const [fetchDiscoverMovies, setFetchDiscoverMovies] = useState<string[]>([]);

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
    const handleFetchData = async (title: string) => {
      try {
        console.log(title.search);
        const res = await axios.get(
          `http://localhost:3003/movies/find/${title.search}`
        );
        console.log("movie fetching with matching titles");
        console.log(res.data.results);
        setFetchDiscoverMovies(res.data?.results);
        return res;
      } catch (err) {
        console.error(err);
      }
    };
    handleFetchData(search);
  }, [search]);

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

        <h3 className="text-orange-600 text-3xl">fetch movie</h3>
        <ul className="text-orange-600">
          {fetchDiscoverMovies?.map((m) => (
            <li className="text-orange-600">{m.title}</li>
          ))}
        </ul>

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
