import "../CSS/App.css";
import Navbar from "./navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import Card from "./todocard";
import { useEffect, useState } from "react";

function Todo() {
  const listhistroy = JSON.parse(localStorage.getItem("lists") || "[]");
  const [lists, Setlist] = useState([]);
  useEffect(() => {
    const arr = [];
    for (let i = 0; i < listhistroy.length; i++) {
      const item = <Card ids={listhistroy[i].props.ids} />;
      arr.push(item);
    }
    Setlist(lists.concat(arr));
  }, []);
  const addCard = () => {
    const count = "card" + lists.length;
    const item = <Card ids={count} />;
    Setlist(lists.concat(item));
    listhistroy.push(item);
    localStorage.setItem("lists", JSON.stringify(listhistroy));
  };

  return (
    <div className="Todo">
      <Navbar />
      <div>
        <div className="lists float-container space-between ">
          <div className="float-container space-even gap">
            <div className="counter acc">
              Completed:{localStorage.getItem("acc")}
            </div>
            <div className="counter rej">
              Canceled:{localStorage.getItem("rej")}
            </div>
          </div>
          <div className="toolkit" onClick={addCard}>
            <FontAwesomeIcon className="add" icon={faAdd} />
          </div>
        </div>

        <div id="cards">
          {lists.map((list_item) => {
            return <div>{list_item}</div>;
          })}
        </div>
      </div>
    </div>
  );
}

export default Todo;
