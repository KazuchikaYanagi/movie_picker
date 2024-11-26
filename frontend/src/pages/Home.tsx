import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import Header from "../features/Header";
// import { MovieData } from "../App";

const Home: React.FC = () => {
  // const movies = useContext(MovieData);
  const [fetchMovies, setFetchMovies] = useState<string[]>([]);
  useEffect(() => {
    const getMovies = async () => {
      try {
        const res = await axios.get("http://localhost:3003/movies");
        const data = res.data.results;
        console.log(data);
        setFetchMovies(data);
      } catch (err) {
        console.error(err);
      }
    };
    getMovies();
  }, []);

  return (
    // <div className="bg-purple-950">
    <div className="bg-hero-pattern w-full h-[80vh] bg-cover">
      {/* <img
        src={`https://image.tmdb.org/t/p/w500${fetchMovies[0]?.backdrop_path}`}
        alt="img"
        className="w-full h-auto bg-auto"
      /> */}
      <Header />
      <main className="bg-purple-950 pb-5">
        <h3 className="text-orange-500 uppercase mt-[69vh] font-bold text-4xl p-7">
          trend movie
        </h3>
        <ul className="flex overflow-x-auto w-full">
          {fetchMovies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </ul>
      </main>
    </div>
    // </div>
  );
};

export default Home;
