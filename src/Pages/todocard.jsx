import "../CSS/App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faPencil,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import ListCrad from "./listcard";

function Card({ ids }) {
  const [cards,SetCards] = useState([])
  const listhistroy = JSON.parse(localStorage.getItem("info") || "[]");
  const displayHistory = () =>{
    const arr =[];
    for (let i = 0; i < listhistroy.length; i++) {
      if (ids === listhistroy[i].id) {
        const check = (
          <FontAwesomeIcon
            icon={faCircleCheck}
            className="check"
            onClick={() => {
              console.log("checked")
            }}
          />
        );
        const edit = (
          <FontAwesomeIcon
            icon={faPencil}
            className="edit"
            onClick={() => {
            }}
          />
        );
        const trash = (
          <FontAwesomeIcon
            icon={faTrashCan}
            className="trash"
            onClick={() => {
            }}
          />
        );
        const card = <ListCrad ids={ids} header={listhistroy[i].head} items={listhistroy[i].info} check={check} trash={trash} edit={edit}/>
        arr.push(card)
      }
    }
    SetCards(arr)
  }
  useEffect(() => {
      displayHistory()
  });

  return (
    <div className="todo-card">
      {cards.map((item)=>{
        return item
      })}
    </div>
  );
}

export default Card;
