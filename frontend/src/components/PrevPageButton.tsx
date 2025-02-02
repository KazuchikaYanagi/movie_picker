type Props = {
  onPrevPage: () => void;
};

const PrevPageButton = ({ onPrevPage }: Props) => {
  return (
    <button
      type="button"
      onClick={onPrevPage}
      className="flex items-center px-2 text-4xl bg-orange-500 rounded-full text-opacity-10"
    >
      &larr; <span className="pl-2 text-lg">Prev</span>
    </button>
  );
};

export default PrevPageButton;
