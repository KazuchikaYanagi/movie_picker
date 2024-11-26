import { NavLink } from "react-router-dom";
import SearchBar from "../components/SearchBar";

const Header = () => {
  return (
    <div className="sticky top-0 z-10">
      <nav className="flex items-center justify-around bg-opacity-0 backdrop-blur-md h-12">
        <NavLink to={`/`}>
          <img
            src="../../public/movie_picker_org.png"
            alt="movie-picker-logo"
            className="h-10 w-auto"
          />
        </NavLink>
        <SearchBar />
        <NavLink to={`/about`} className="text-orange-500">
          About
        </NavLink>
      </nav>
    </div>
  );
};

export default Header;
