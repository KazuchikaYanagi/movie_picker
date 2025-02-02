import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className="p-2 text-xl text-black bg-orange-500 rounded-full"
    >
      &larr; Back
    </button>
  );
};

export default BackButton;
