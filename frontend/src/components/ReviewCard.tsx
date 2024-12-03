import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const ReviewCard = ({ review, i }) => {
  const { author, content, author_details, created_at } = review;
  const { avatar_path, rating, username } = author_details;
  console.log(i);

  return (
    <div
      className={`bg-slate-300 p-8 mb-5 block w-full max-h-80 object-cover overflow-y-scroll`}
    >
      <div className="flex mb-5">
        <img
          src={
            `https://image.tmdb.org/t/p/w500${avatar_path}` ??
            "../assets/avatar-3814049_640.png"
          }
          alt="no image"
          className="w-10 h-10 rounded-full"
        />

        <p>@{author}</p>

        <p>
          {rating}
          <div>
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
          </div>
        </p>
      </div>
      <p>{content}</p>
    </div>
  );
};

export default ReviewCard;
