import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import avatar from "../../public/avatar-3814049_640.png";

export interface AuthorDetails {
  avatar_path: string;
  rating: number;
  review: string;
}

export interface Review {
  author: string;
  content: string;
  author_details: AuthorDetails;
}

export interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const { author, content, author_details } = review;
  const { avatar_path, rating } = author_details;

  const stars = Array(10).fill(0);

  return (
    <div
      className={`bg-slate-300 p-6 mb-10 block w-full max-h-80 object-cover overflow-y-scroll rounded-md`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center justify-center flex-1">
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
      <p className="mb-5 text-sm">{content}</p>

      <div className="flex items-center flex-10">
        <img
          src={
            avatar_path
              ? `https://image.tmdb.org/t/p/w500${avatar_path}`
              : avatar
          }
          alt="avatar icon"
          className="w-8 h-8 rounded-full"
        />

        <p className="ml-3 text-sm">@{author}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
