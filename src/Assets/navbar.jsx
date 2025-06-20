import "../CSS/App.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboard,
  faCloud,
  faCalculator,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

function Navbar() {
  const [select, setSelect] = useState(3);
  useEffect(() => {
    const path = window.location.pathname;
    console.log(path);
    if (path === "/Multi-app") {
      setSelect(0);
    } else if (path === "/Multi-app/Todo") {
      setSelect(1);
    } else if (path === "/Multi-app/Calculator") {
      setSelect(2);
    }
  }, []);
  return (
    <div className=" fixed z-10 shadow-[0px_3px_3px_4px_rgba(0,0,0,0.5)] rounded-r-lg backdrop-blur-sm bg-white/30 flex justify-end gap-10 p-5">
      <header className="">
        <nav>
          <Link to="/" className={select === 0 ? "selected" : ""} onClick={() => setSelect(0)}>
            <FontAwesomeIcon icon={faCloud} /> Weather
          </Link>
          <Link to="/Todo" className={select === 1 ? "selected" : ""} onClick={() => setSelect(1)}>
            <FontAwesomeIcon icon={faClipboard} /> Todo List
          </Link>
          <Link to="/Calculator" className={select === 2 ? "selected" : ""} onClick={() => setSelect(2)}>
            <FontAwesomeIcon icon={faCalculator} /> Calculator
          </Link>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
