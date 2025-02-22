import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { faCalendar, faClock, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import axios from "axios";
import avatar from "../../public/avatar-3814049_640.png";
import NoImage from "../../public/no_image.png";

import BackButton from "../components/BackButton";
import ReviewCard, { Review } from "../components/ReviewCard";
import Header from "../features/Header";

interface MovieDetail {
  title: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  homepage: string;
  genres: { name: string }[];
  credits: {
    cast: { name: string; character: string; profile_path: string }[];
  };
  reviews: {
    results: Review[];
  };
}

const MovieDetail = () => {
  const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null);
  const [movieCredits, setMovieCredits] = useState<
    MovieDetail["credits"] | null
  >(null);
  const [movieReviews, setMovieReviews] = useState<Review[]>([]);
  const { id } = useParams();

  useEffect(() => {
    const handleDetailMovie = async () => {
      try {
        const { data } = await axios.get(
          `https://movie-picker-backend.vercel.app/movies/${id}`
        );
        setMovieDetail(data);
        setMovieCredits(data.credits);
        setMovieReviews(data.reviews?.results);
      } catch (err) {
        console.error(err);
      }
    };
    handleDetailMovie();
  }, [id]);

  return (
    <div className="text-purple-500 bg-purple-950">
      <div
        style={
          {
            "--image-url": `url(${
              movieDetail?.backdrop_path
                ? `https://image.tmdb.org/t/p/w500${movieDetail?.backdrop_path}`
                : NoImage
            })`,
          } as React.CSSProperties
        }
        className={`
          bg-[image:var(--image-url)]
         w-screen h-52 lg:h-[80vh] bg-cover object-cover bg-no-repeat relative`}
      >
        <Header />
        <p className="absolute bottom-0 p-2 my-5 text-sm font-bold text-orange-500 md:text-xl right-5 backdrop-blur-md">
          {movieDetail?.title}
        </p>
      </div>

      <div className="h-full p-10">
        <BackButton />

        <p className="my-5 text-balance md:text-xl">{movieDetail?.overview}</p>

        <div className="flex flex-col gap-5 my-10">
          <div className="flex justify-around">
            <p className="text-purple-700">
              <FontAwesomeIcon icon={faCalendar} />
              <span className="pl-2 text-sm md:text-2xl">
                {movieDetail?.release_date}
              </span>
            </p>

            <p className="text-purple-700">
              <FontAwesomeIcon icon={faClock} />
              <span className="pl-2 text-sm md:text-2xl">
                {movieDetail?.runtime}
              </span>
              mins
            </p>

            <p className="text-purple-700">
              <FontAwesomeIcon icon={faStar} className="pr-2" />
              <span className="text-sm md:text-2xl">
                {Math.round((movieDetail?.vote_average ?? 0) * 10) / 10}
              </span>
            </p>
          </div>

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
              type: "loop",
              autoplay: true,
              interval: 10000,
              arrows: true,
              pagination: true,
            }}
          >
            {movieReviews?.map((review, i) => (
              <SplideSlide key={i}>
                <ReviewCard review={review} i={i} />
              </SplideSlide>
            ))}
          </Splide>
        ) : (
          <div className="flex items-center justify-center w-full h-64 mb-10 text-4xl uppercase bg-purple-900">
            no reviews...
          </div>
        )}

        <h3 className="text-lg font-bold">Main casts</h3>
        <ul className="flex gap-5 mb-10">
          {movieCredits?.cast.map((c, i) => {
            if (i < 3)
              return (
                <li>
                  {c.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${c.profile_path}`}
                      alt="cast-image"
                      className="object-cover w-20 h-auto rounded-md"
                    />
                  ) : (
                    <img
                      src={avatar}
                      alt="avatar"
                      className="w-20 h-[7.5rem] rounded-md object-cover"
                    />
                  )}
                  <p className="text-sm font-bold">{c.name}</p>
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
