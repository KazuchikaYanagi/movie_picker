import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import axios from "axios";
import { MovieData } from "../App";

const SearchBar = () => {
  const { search, setSearch } = useContext(MovieData);

  return (
    <div className="relative flex items-center">
      <input
        type="search"
        placeholder=""
        // onChange={(e) => handleFetchData(e.target.value)}
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        className="p-1 pl-8 bg-orange-200 rounded-full outline-none"
      />
      <FontAwesomeIcon
        icon={faSearch}
        className="absolute text-orange-400 left-3"
      />
    </div>
  );
};

export default SearchBar;
