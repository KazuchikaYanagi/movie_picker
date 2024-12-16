import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { MovieData } from "../types/MovieContext";

const SearchBar: React.FC = () => {
  const context = useContext(MovieData);

  if (!context) throw new Error("MovieData context is not provided");

  const { search, setSearch } = context;

  return (
    <div className="relative flex items-center">
      <input
        type="search"
        placeholder=""
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        className="p-1 pl-8 font-semibold text-orange-700 bg-orange-200 rounded-full outline-none"
      />
      <FontAwesomeIcon
        icon={faSearch}
        className="absolute text-orange-400 left-3"
      />
    </div>
  );
};

export default SearchBar;
