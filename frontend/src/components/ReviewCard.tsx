import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const ReviewCard = ({ review, i }) => {
  const { author, content, author_details, created_at } = review;
  const { avatar_path, rating, username } = author_details;

  const stars = Array(10).fill(0);

  return (
    <div
      className={`bg-slate-300 p-6 mb-5 block w-full max-h-80 object-cover overflow-y-scroll rounded-md`}
    >
      <div className="flex mb-3 justify-between items-center">
        <div className="flex flex-1 justify-center items-center">
          <div>
            {stars.map((_, i) => {
              return (
                <FontAwesomeIcon
                  icon={faStar}
                  key={i}
                  className={`${
                    rating > i ? "text-amber-400" : "text-stone-400"
                  } text-xl`}
                />
              );
            })}
          </div>
          <span className="ml-3">({rating ?? 0} Stars)</span>
        </div>
      </div>
      <p className="text-sm mb-5">{content}</p>

      <div className="flex items-center flex-10">
        <img
          src={
            avatar_path
              ? `https://image.tmdb.org/t/p/w500${avatar_path}`
              : "../../public/avatar-3814049_640.png"
          }
          alt="avatar icon"
          className="w-8 h-8 rounded-full"
        />

        <p className="text-sm ml-3">@{author}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
