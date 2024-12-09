import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCalendar, faStar } from "@fortawesome/free-solid-svg-icons";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import Header from "../features/Header";
import ReviewCard from "../components/ReviewCard";
import { library } from "@fortawesome/fontawesome-svg-core";

const MovieDetail = () => {
  const [movieDetail, setMovieDetail] = useState(null);
  const [movieCredits, setMovieCredits] = useState(null);
  const [movieReviews, setMovieReviews] = useState([]);
  const { id } = useParams();
  console.log(id);

  // const stars = Array(10).fill(0);

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
        className={`${
          "bg-[image:var(--image-url)]" ?? "bg-no-image"
        } w-screen h-[80vh] bg-cover object-cover bg-no-repeat relative`}
      >
        <Header />
        <p className="text-xl my-5 p-2 font-bold absolute bottom-0 right-5 backdrop-blur-md text-orange-500 ">
          {movieDetail?.title}
        </p>
      </div>

      <div className="p-10 h-full">
        <p className="mb-5 text-xl">{movieDetail?.overview}</p>

        <div className="flex my-10 gap-5">
          <p className="text-purple-700">
            <FontAwesomeIcon icon={faCalendar} />
            <span className="pl-2 text-2xl">{movieDetail?.release_date}</span>
          </p>

          <p className="text-purple-700">
            <FontAwesomeIcon icon={faClock} />
            <span className="pl-2 text-2xl">{movieDetail?.runtime}</span> mins
          </p>

          <p className="text-purple-700">
            <FontAwesomeIcon icon={faStar} className="pr-2" />
            <span className="text-2xl">
              {Math.round(movieDetail?.vote_average * 10) / 10}
            </span>
          </p>

          {movieDetail?.homepage ? (
            <a href={movieDetail?.homepage} className="text-blue-600">
              {movieDetail?.homepage}
            </a>
          ) : (
            <p className="text-stone-500">NO URL</p>
          )}
        </div>

        {movieReviews.length !== 0 ? (
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
        ) : (
          <div className="flex justify-center items-center uppercase w-full h-64 bg-purple-900 mb-10 text-4xl">
            no reviews...
          </div>
        )}

        <h3 className="font-bold text-lg">Main casts</h3>
        <ul className="flex gap-5 mb-10">
          {movieCredits?.cast.map((c, i) => {
            if (i < 3)
              return (
                <li>
                  {c.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${c.profile_path}`}
                      alt="cast-image"
                      className="w-20 h-auto rounded-md object-cover"
                    />
                  ) : (
                    <img
                      src="../../public/avatar-3814049_640.png"
                      alt="avatar"
                      className="w-20 h-[7.5rem] rounded-md object-cover"
                    />
                  )}
                  <p className="font-bold text-sm">{c.name}</p>
                  <p className="text-purple-700">({c.character})</p>
                </li>
              );
          })}
        </ul>

        <p className="text-xl">Genres</p>
        <ul className="flex gap-5">
          {movieDetail?.genres.map((g) => (
            <li className="text-purple-700">{g.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MovieDetail;
