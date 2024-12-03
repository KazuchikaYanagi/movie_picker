import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCalendar, faStar } from "@fortawesome/free-solid-svg-icons";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import Header from "../features/Header";
import ReviewCard from "../components/ReviewCard";

const MovieDetail = () => {
  const [movieDetail, setMovieDetail] = useState(null);
  const [movieCredits, setMovieCredits] = useState(null);
  const [movieReviews, setMovieReviews] = useState([]);
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const handleDetailMovie = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3003/movies/${id}`);
        console.log(data);
        setMovieDetail(data);
        setMovieCredits(data.credits);
        setMovieReviews(data.reviews?.results);
      } catch (err) {
        console.error(err);
      }
    };
    handleDetailMovie();
  }, []);

  return (
    <div className="bg-purple-950 text-purple-500">
      <div
        style={{
          "--image-url": `url(https://image.tmdb.org/t/p/w500${movieDetail?.backdrop_path})`,
        }}
        className="bg-[image:var(--image-url)] w-screen h-[80vh] bg-cover object-cover bg-no-repeat"
      >
        <Header />
      </div>

      <div className="m-10 h-[100vh]">
        {/* <p className="text-3xl my-5 font-bold">{movieDetail?.title}</p> */}

        <p className="mb-5 text-xl">{movieDetail?.overview}</p>

        {/* <div className="flex mb-5 gap-5">
          <p className="text-purple-500">
            <FontAwesomeIcon icon={faCalendar} />
            <span className="pl-2">{movieDetail?.release_date}</span>
          </p>

          <p className="text-purple-500">
            <FontAwesomeIcon icon={faClock} />
            <span className="pl-2">{movieDetail?.runtime} mins</span>
          </p> */}
        {movieDetail?.homepage ? (
          <a href={movieDetail?.homepage} className="text-blue-400">
            {movieDetail?.homepage}
          </a>
        ) : (
          <p className="text-stone-500">NO URL</p>
        )}
        {/* </div> */}

        <p>
          <FontAwesomeIcon icon={faStar} className="pr-2" />
          {Math.round(movieDetail?.vote_average * 10) / 10}
        </p>

        <Splide
          aria-label="reviews"
          options={{
            autoplay: true,
            interval: 10000,
          }}
        >
          {movieReviews?.map((review, i) => (
            <SplideSlide>
              <ReviewCard review={review} i={i} key={i} />
            </SplideSlide>
          ))}
        </Splide>

        {/* <h3 className="font-bold text-lg">Main casts</h3>
        <ul className="flex gap-5">
          {movieCredits?.cast.map((c, i) => {
            if (i < 3)
              return (
                <li>
                  {c.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${c.profile_path}`}
                      alt="cast-image"
                      className="w-36 h-auto rounded-md"
                    />
                  ) : (
                    <img src="../assets/avatar-3814049_640.png" alt="avatar" />
                  )}
                  <p>{c.name}</p>
                </li>
              );
          })}
        </ul> */}
      </div>
    </div>
  );
};

export default MovieDetail;
