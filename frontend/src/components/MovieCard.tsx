import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MovieData } from "../types/MovieContext";
import noImage from "../../public/no_image.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

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
    setBackdropImage({ backdrop_path, title, release_date, vote_average });
  };

  const handleId: () => void = () => {
    navigate(`/movie/${id}`);
  };
  return (
    <>
      <li
        className="flex-none mx-5 text-center transition-all duration-150 hover:translate-y-2"
        onMouseEnter={handleMovieInfo}
      >
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : noImage
          }
          className="m-auto rounded-md w-28 md:w-32"
          alt="image"
          onClick={handleId}
        />
        <div className="text-orange-600 md:hidden">
          <div className="text-center">
            <FontAwesomeIcon icon={faStar} className="mr-2" />
            {Number(Math.round((vote_average * 100) / 10).toFixed(2)) / 10 ||
              Number(Math.round((vote_average * 100) / 10).toFixed(2)) / 10}
          </div>
        </div>
      </li>
    </>
  );
};

export default MovieCard;
