import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MovieData } from "../App";

const MovieCard = ({ movie }) => {
  const { poster_path, id, backdrop_path, title, release_date, vote_average } =
    movie;
  const navigate = useNavigate();
  const { setBackdropImage } = useContext(MovieData);

  const handleMovieInfo = () => {
    console.log({ backdrop_path, title, release_date, vote_average });
    setBackdropImage({ backdrop_path, title, release_date, vote_average });
  };

  const handleId: () => void = () => {
    console.log(id);
    navigate(`/movie/${id}`);
  };
  return (
    <>
      <li
        className="flex-none mx-5 transition-all duration-150 hover:translate-y-2 "
        onMouseEnter={handleMovieInfo}
      >
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "../../public/no_image.png"
          }
          className="w-32 rounded-md"
          alt="image"
          onClick={handleId}
        />
      </li>
    </>
  );
};

export default MovieCard;
