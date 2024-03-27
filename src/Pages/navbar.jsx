import "../CSS/App.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faClipboard,faCloud,faCalculator } from "@fortawesome/free-solid-svg-icons"

function Navbar() {
  return (
    <div className="Navbar">
      <header className="Navbar-header">
        <nav>
          <Link to="/"><FontAwesomeIcon icon={faCloud} /> Weather</Link>
          <Link to="/Todo"><FontAwesomeIcon icon={faClipboard} /> Todo List</Link>
          <Link to="/Calculator"><FontAwesomeIcon icon={faCalculator}/> Calculator</Link>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
