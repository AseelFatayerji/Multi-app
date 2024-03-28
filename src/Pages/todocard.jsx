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

function Card({ ids }) {
  const listhistroy = JSON.parse(localStorage.getItem("info") || "[]");
  const updateItem = (old,newValue) => {
    for (let i = 0; i < listhistroy.length; i++) {
      if (listhistroy[i].info === old) {
        listhistroy[i].info = newValue;        
      }
    }
    localStorage.setItem("info", JSON.stringify(listhistroy));
  };
  useEffect(() => {
    for (let i = 0; i < listhistroy.length; i++) {
      if (ids === listhistroy[i].id) {
        document.getElementById("title" + ids).value = listhistroy[i].head;
        const val = listhistroy[i].info;
        const item = document.createElement("li");
        const input = document.createElement("input");
        const button = document.createElement("i");
        const button2 = document.createElement("i");
        const button3 = document.createElement("i");

        input.className = "list-item";
        input.type = "text";
        input.disabled = true;
        input.value = val;
        input.id = document.getElementById(ids).children.length + "input" + ids;
        input.onchange = (e) => {
          updateItem(val,e.target.value);
        };
        item.id = document.getElementById(ids).children.length + "item" + ids;

        const check = (
          <FontAwesomeIcon
            icon={faCircleCheck}
            className="check"
            onClick={() => {
              updateHistory(input.id);
              completeItem(item.id);
            }}
          />
        );
        const edit = (
          <FontAwesomeIcon
            icon={faPencil}
            className="edit"
            onClick={() => {
              removeDisable(input.id);
            }}
          />
        );
        const trash = (
          <FontAwesomeIcon
            icon={faTrashCan}
            className="trash"
            onClick={() => {
              updateHistory(input.id);
              deleteItem(item.id);
            }}
          />
        );
        const editbtn = createRoot(button);
        editbtn.render(edit);
        const trashbtn = createRoot(button2);
        trashbtn.render(trash);
        const checkbtn = createRoot(button3);
        checkbtn.render(check);

        item.className = "float-container space-even gap";
        item.appendChild(button3);
        item.appendChild(input);
        item.appendChild(button);
        item.appendChild(button2);
        document.getElementById(ids).appendChild(item);
      }
    }
  });
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
    console.log(updatelisthistroy);
  };
  const addItem = () => {
    const val = document.getElementById("item" + ids).value;
    const item = document.createElement("li");
    const input = document.createElement("input");
    const button = document.createElement("i");
    const button2 = document.createElement("i");
    const button3 = document.createElement("i");

    input.className = "list-item";
    input.type = "text";
    input.disabled = true;
    input.value = val;
    input.id = document.getElementById(ids).children.length + "input" + ids;
    input.onchange = (e) => {
      updateItem(val,e.target.value);
      console.log(e.target.value);
    };
    item.id = document.getElementById(ids).children.length + "" + ids;

    const check = (
      <FontAwesomeIcon
        icon={faCircleCheck}
        className="check"
        onClick={() => {
          updateHistory(input.id);
          completeItem(item.id);
        }}
      />
    );
    const edit = (
      <FontAwesomeIcon
        icon={faPencil}
        className="edit"
        onClick={() => {
          removeDisable(input.id);
        }}
      />
    );
    const trash = (
      <FontAwesomeIcon
        icon={faTrashCan}
        className="trash"
        onClick={() => {
          updateHistory(input.id);
          deleteItem(item.id);
        }}
      />
    );
    const editbtn = createRoot(button);
    editbtn.render(edit);
    const trashbtn = createRoot(button2);
    trashbtn.render(trash);
    const checkbtn = createRoot(button3);
    checkbtn.render(check);

    item.className = "float-container space-even gap";
    item.appendChild(button3);
    item.appendChild(input);
    item.appendChild(button);
    item.appendChild(button2);
    document.getElementById(ids).appendChild(item);
    const title = document.getElementById("title" + ids).value;
    const obj = { id: ids, info: val, head: title };
    listhistroy.push(obj);
    localStorage.setItem("info", JSON.stringify(listhistroy));
  };
  return (
    <div className="todo-card">
      <Draggable>
        <div className="list" id={"list" + ids}>
          <div className="card-body">
            <div className="list-header float-container space-even gap">
              <div>
                <input
                  type="text"
                  id={"title" + ids}
                  className="title"
                  placeholder="List Title"
                />
              </div>
              <div>
                <FontAwesomeIcon
                  icon={faTrashCan}
                  className="trash"
                  onClick={() => {
                    deleteList(ids);
                  }}
                />
              </div>
            </div>
            <div className="inputs float-container space-between gap">
              <div>
                <input
                  type="text"
                  id={"item" + ids}
                  className="list-item"
                  placeholder="List Item"
                />
              </div>
              <div>
                <FontAwesomeIcon
                  className="add"
                  icon={faAdd}
                  onClick={addItem}
                />
              </div>
            </div>
            <div>
              <ul id={ids} className="list-display"></ul>
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
}

export default Card;
