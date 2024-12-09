import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import { createContext, useState } from "react";
import MovieDetail from "./pages/MovieDetail";

export const MovieData = createContext();

const App = () => {
  const [search, setSearch] = useState<string>("");
  const [backdropImage, setBackdropImage] = useState({});

  // const handleMovieInfo = () => {
  //   setBackdropImage(movie.backdrop_path);
  //   console.log(movie.backdrop_path);
  // };

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
