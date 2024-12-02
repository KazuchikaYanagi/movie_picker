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
        className="border p-1 rounded-full pl-8"
      />
      <FontAwesomeIcon
        icon={faSearch}
        className="absolute left-3 text-stone-400"
      />
    </div>
  );
};

export default SearchBar;
