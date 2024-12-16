import { NavLink } from "react-router-dom";
import SearchBar from "../components/SearchBar";

const Header: React.FC = () => {
  return (
    <div className="fixed z-10 w-screen">
      <nav className="items-center justify-around hidden h-12 bg-opacity-0 lg:flex backdrop-blur-md">
        <NavLink to={`/`}>
          <img
            src="../../public/logo.svg"
            alt="movie-picker-logo"
            className="w-auto h-10"
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
