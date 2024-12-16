import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MovieData } from "../types/MovieContext";

export type Movie = {
  poster_path: string | null;
  id: number;
  backdrop_path: string | null;
  title: string;
  release_date: string;
  vote_average: number;
};

type MovieCardProps = {
  movie: Movie;
};

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { poster_path, id, backdrop_path, title, release_date, vote_average } =
    movie;
  const navigate = useNavigate();
  const context = useContext(MovieData);

  if (!context) throw new Error("MovieData context is not provided");

  const { setBackdropImage } = context;

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
