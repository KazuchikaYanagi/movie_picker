type Props = {
  onNextPage: () => void;
};

const NextPageButton = ({ onNextPage }: Props) => {
  return (
    <button
      type="button"
      onClick={onNextPage}
      className="flex items-center px-2 text-4xl bg-orange-500 rounded-full text-opacity-10"
    >
      <span className="pr-2 text-lg">Next</span> &rarr;
    </button>
  );
};

export default NextPageButton;
