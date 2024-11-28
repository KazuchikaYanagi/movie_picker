import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
// import { createContext, useEffect, useState } from "react";
import MovieDetail from "./pages/MovieDetail";
// import axios from "axios";

// export const MovieData = createContext();

const App = () => {
  // const [fetchMovies, setFetchMovies] = useState<string[]>([]);
  // const [fetchMovieId, setFetchMovieId] = useState<T>(null);

  // useEffect(() => {
  //   const getMovies = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:3003/movies");
  //       const data = res.data.results;
  //       console.log(data);
  //       setFetchMovies(data);
  //       setFetchMovieId(data.id);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   getMovies();
  // }, []);

  // useEffect(() => {
  //   const getMovieDetail = async (fetchMovieId) => {
  //     try {
  //       const res = await axios.post("http://localhost:3003/:id", { id });
  //       const data = res.data.results;
  //       console.log(data);
  //       setFetchMovieId(data.id);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   getMovieDetail();
  // }, []);

  const handleMovieInfo = () => {
    console.log("hi");
  };

  return (
    <>
      <Link to="/" />
      {/* <MovieData.Provider value={handleMovieInfo}> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/about" element={<About />} />
      </Routes>
      {/* </MovieData.Provider> */}
    </>
  );
};

export default App;
