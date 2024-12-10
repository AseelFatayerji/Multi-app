import "../CSS/App.css";
import { createRoot } from "react-dom/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faCircleCheck,
  faPencil,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import Draggable, { DraggableCore } from "react-draggable";
import { useEffect, useState } from "react";
import ListCrad from "./listcard";

function Card({ ids }) {
  const [cards,SetCards] = useState([])
  const listhistroy = JSON.parse(localStorage.getItem("info") || "[]");
  const updateItem = (old,newValue) => {
    for (let i = 0; i < listhistroy.length; i++) {
      if (listhistroy[i].info === old) {
        listhistroy[i].info = newValue;        
      }
    }
    localStorage.setItem("info", JSON.stringify(listhistroy));
  };
  
  const deleteList = (id) => {
    const updateHistory = [];
    const org = JSON.parse(localStorage.getItem("lists") || "[]");
    for (let i = 0; i < org.length; i++) {
      if (org[i].props.ids !== id) {
        updateHistory.push(org[i]);
      }
    }
    localStorage.setItem("lists", JSON.stringify(updateHistory));
    document.getElementById("list" + id).remove();
    let rej = JSON.parse(localStorage.getItem("rej") || 0);
    rej++;
    localStorage.setItem("rej", rej);
  };
  const removeDisable = (id) => {
    const val = document.getElementById(id);
    document.getElementById(id).disabled = false;
  };
  const deleteItem = (id) => {
    document.getElementById(id).remove();
    let rej = JSON.parse(localStorage.getItem("rej") || 0);
    rej++;
    localStorage.setItem("rej", rej);
  };
  const completeItem = (id) => {
    document.getElementById(id).remove();
    let acc = JSON.parse(localStorage.getItem("acc") || 0);
    acc++;
    localStorage.setItem("acc", acc);
  };
  const updateHistory = (id) => {
    const updatelisthistroy = [];
    for (let i = 0; i < listhistroy.length; i++) {
      console.log(document.getElementById(id).value);
      if (listhistroy[i].info !== document.getElementById(id).value) {
        updatelisthistroy.push(listhistroy[i]);
      }
    }
    localStorage.setItem("info", JSON.stringify(updatelisthistroy));
  };
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
  const addItem = () => {
    const arr = []
    const val = document.getElementById("item" + ids).value;
    const inputID = document.getElementById(ids).children.length + "input" + ids;
    const itemID = document.getElementById(ids).children.length + "" + ids;
    const check = (
      <FontAwesomeIcon
        icon={faCircleCheck}
        className="check"
        onClick={() => {
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
    const card = <ListCrad ids={ids} header={val} items={[]} check={check} trash={trash} edit={edit}/>
    arr.push(card)
    SetCards(cards.concat(arr))
  };
  return (
    <div className="todo-card">
      {cards.map((item)=>{
        return item
      })}
    </div>
  );
}

export default Card;
