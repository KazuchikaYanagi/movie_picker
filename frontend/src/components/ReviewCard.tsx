import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const ReviewCard = ({ review }) => {
  const { author, content, author_details, created_at } = review;
  const { avatar_path, rating, username } = author_details;

  return (
    <li className="bg-slate-300 mb-5 w-screen h-52 p-3">
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
    </li>
  );
};

export default ReviewCard;
