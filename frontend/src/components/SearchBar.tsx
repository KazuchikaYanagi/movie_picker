import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
  const [search, setSearch] = useState<string>("");

  return (
    <div className="relative flex items-center">
      <input
        type="search"
        placeholder=""
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
