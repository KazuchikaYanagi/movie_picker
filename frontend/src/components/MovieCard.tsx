import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie<Array> }) => {
  const { poster_path, id } = movie;
  const navigate = useNavigate();

  const handleMovieInfo = () => {
    console.log(movie);
  };

  const handleId: () => void = () => {
    console.log(id);
    navigate(`/movie/${id}`);
  };
  return (
    <>
      <li className="flex-none mx-5" onMouseEnter={handleMovieInfo}>
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          className="w-64 rounded-md"
          alt="image"
          onClick={handleId}
        />
      </li>
    </>
  );
};

export default MovieCard;
