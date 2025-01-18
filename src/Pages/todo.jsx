import "../CSS/App.css";
import Navbar from "./navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import Card from "./todocard";
import { useEffect, useState } from "react";
function Todo() {
  const listhistory = JSON.parse(localStorage.getItem("lists") || "[]");
  const [lists, Setlist] = useState([]);
  const [show, SetVisible] = useState("hidden");
  const [title, SetTitle] = useState("");
  useEffect(() => {
    const arr = [];
    for (let i = 0; i < listhistory.length; i++) {
      const item = (
        <Card
          ids={listhistory[i].props.ids}
          titles={listhistory[i].props.titles}
          key={listhistory[i].props.key}
        />
      );
      arr.push(item);
    }
    Setlist(lists.concat(arr));
    if (localStorage.getItem("acc") == null) {
      localStorage.setItem("acc", 0);
    }
    if (localStorage.getItem("rej") == null) {
      localStorage.setItem("rej", 0);
    }
  }, []);
  const Show = () => {
    SetVisible("card");
  };
  const handleChange = (event) => {
    SetTitle(event.target.value);
  };
  const addCard = () => {
    const count = "card" + lists.length;
    const item = <Card ids={count} titles={title} key={count} />;
    Setlist(lists.concat(item));
    listhistory.push(item);
    localStorage.setItem("lists", JSON.stringify(listhistory));
  };

  return (
    <div className="Todo">
      <Navbar />
      <div>
        <div className="lists float-container space-between ">
          <div className="float-container space-even gap">
            <div className="counter acc">
              Completed: {localStorage.getItem("acc")}
            </div>
            <div className="counter rej">
              Canceled: {localStorage.getItem("rej")}
            </div>
          </div>
          <div className="toolkit" onClick={Show}>
            <FontAwesomeIcon className="add" icon={faAdd} />
          </div>
        </div>
        <div className={show}>
          <div className="card-header">Add Task</div>
          <div className="task-body">
            <input
              className="title"
              value={title}
              type="text"
              placeholder="List Name"
              onChange={handleChange}
            />
            <input
              type="submit"
              className="list-btn"
              onClick={addCard}
              placeholder="Add List"
            />
          </div>
        </div>

        <div id="cards">
          {lists.map((list_item,index) => {
            return <div key={index}>{list_item}</div>;
          })}
        </div>
      </div>
    </div>
  );
}

export default Todo;
