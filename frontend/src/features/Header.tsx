import { NavLink } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import logo from "../../public/logo.svg";

const Header: React.FC = () => {
  return (
    <div className="fixed z-10 w-screen">
      <nav className="flex items-center justify-around h-12 bg-opacity-0 backdrop-blur-md">
        <NavLink to={`/`}>
          <img
            src={logo}
            alt="movie-picker-logo"
            className="w-auto h-6 md:h-10"
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
