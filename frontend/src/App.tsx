import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import { useState } from "react";
import MovieDetail from "./pages/MovieDetail";
import { MovieData } from "./types/MovieContext";

const App = () => {
  const [search, setSearch] = useState<string>("");
  const [backdropImage, setBackdropImage] = useState<{
    backdrop_path: string | null;
    title: string;
    release_date: string;
    vote_average: number;
  }>({
    backdrop_path: null,
    title: "",
    release_date: "",
    vote_average: 0,
  });

  return (
    <>
      <Link to="/" />
      <MovieData.Provider
        value={{
          search,
          setSearch,
          backdropImage,
          setBackdropImage,
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </MovieData.Provider>
    </>
  );
};

export default App;
