import React from "react";

const ReviewCard = ({ review }) => {
  const { author, content, author_details, created_at } = review;
  const { avatar_path, rating, username } = author_details;

  return (
    <li className="bg-slate-300 mb-5 w-screen h-52">
      <div className="flex">
        <img
          src={
            `https://image.tmdb.org/t/p/w500${avatar_path}` ??
            "../assets/avatar-3814049_640.png"
          }
          alt="no image"
          className="w-14 h-14 rounded-full"
        />

        <p>@{author}</p>
      </div>
      <p>{content}</p>
    </li>
  );
};

export default ReviewCard;
