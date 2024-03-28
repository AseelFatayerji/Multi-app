import "../CSS/App.css";
import Navbar from "./navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faAdd } from "@fortawesome/free-solid-svg-icons"
import Card from "./todocard";
import { useEffect, useState } from "react";

function Todo() {
  const listhistroy = JSON.parse(localStorage.getItem("lists")||"[]")
  const [lists, Setlist] = useState(listhistroy)
  const count = "card"+lists.length
  const addCard = () => {
    Setlist(lists.concat(<Card key={count}/>));
    //localStorage.setItem("lists",JSON.stringify(lists))
  };

  return (
    <div className="Todo">
      <Navbar />
      <div className=" lists ">
        <div className="toolkit position fixed" onClick={addCard}>
          <FontAwesomeIcon className="add" icon={faAdd}  />
        </div>
        <div id="cards">
          {lists.map((list_item)=>{
              return <div>{list_item}</div>
          })}
        </div>
      </div>
    </div>
  );
}

export default Todo;
