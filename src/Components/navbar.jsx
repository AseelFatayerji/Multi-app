import "../CSS/App.css";
import image from "../Assets/image.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const [select, setSelect] = useState(3);
  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/Multi-app") {
      setSelect(0);
    } else if (path === "/Multi-app/Todo") {
      setSelect(1);
    } else if (path === "/Multi-app/Calculator") {
      setSelect(2);
    }
  }, []);
  return (
    <div className=" fixed z-10 shadow-[0px_3px_3px_4px_rgba(0,0,0,0.5)] rounded-r-lg backdrop-blur-sm bg-white/50 flex items-center justify-end p-2">
      <header className="">
        <nav className="flex items-center justify-center gap-2">
          <img src={image} className="w-14 h-14" alt="logo"/>
          <Link
            to="/"
            className={select === 0 ? "selected" : ""}
            onClick={() => setSelect(0)}
          >
            Weather
          </Link>
          <Link
            to="/Todo"
            className={select === 1 ? "selected" : ""}
            onClick={() => setSelect(1)}
          >
            Todo List
          </Link>
          <Link
            to="/Calculator"
            className={select === 2 ? "selected" : ""}
            onClick={() => setSelect(2)}
          >
            Calculator
          </Link>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
