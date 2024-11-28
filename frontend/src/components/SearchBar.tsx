import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const SearchBar = () => {
  const [search, setSearch] = useState<string>("");

  // useEffect(() => {
  //   const searchMovies = async () => {
  //     await axios.post(`http://localhost:3003/find/${title}`, {
  //       title: search,
  //     });
  //   };
  //   searchMovies();
  // }, []);

  const handleFetchData = async (title) => {
    setSearch(title);
    await axios.post(`http://localhost:3003/find/`, {
      title: search,
    });
  };

  return (
    <div className="relative flex items-center">
      <input
        type="search"
        placeholder=""
        onChange={(e) => handleFetchData(e.target.value)}
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
