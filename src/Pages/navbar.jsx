import "../CSS/App.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboard,
  faCloud,
  faCalculator,
} from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  return (
    <div className=" fixed shadow-[0px_3px_3px_4px_rgba(0,0,0,0.5)] rounded-r-lg backdrop-blur-sm bg-white/30 flex justify-end gap-10 p-5">
      <header className="">
        <nav>
          <Link to="/">
            <FontAwesomeIcon icon={faCloud} /> Weather
          </Link>
          <Link to="/Todo">
            <FontAwesomeIcon icon={faClipboard} /> Todo List
          </Link>
          <Link to="/Calculator">
            <FontAwesomeIcon icon={faCalculator} /> Calculator
          </Link>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
