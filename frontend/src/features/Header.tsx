import { NavLink } from "react-router-dom";
import logo from "../../public/logo.svg";
import SearchBar from "../components/SearchBar";

const Header: React.FC = () => {
  return (
    <header className="fixed z-10 w-screen font-bold">
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
    </header>
  );
};

export default Header;
