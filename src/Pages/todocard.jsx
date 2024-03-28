import "../CSS/App.css";
import { createRoot } from 'react-dom/client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faPencil,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import Draggable, { DraggableCore } from "react-draggable";

function Card({ids}) {
  const removeDisable = (id) => {
    document.getElementById(id).disabled = false;
  };
  const deleteItem = (id) => {
    document.getElementById(id).remove();
  };
  const addItem = () => {
    const val = document.getElementById("item"+ids).value;
    const item = document.createElement("li");
    const input = document.createElement("input");
    const button = document.createElement("i");
    const button2 = document.createElement("i");

    input.className = "list-item";
    input.type = "text";
    input.disabled = true;
    input.value = val;
    input.id = document.getElementById(ids).children.length + "input" +ids;
    item.id = document.getElementById(ids).children.length+""+ids;

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
          deleteItem(item.id);
        }}
      />
    );
    const editbtn = createRoot(button)
    editbtn.render(edit)
    const trashbtn = createRoot(button2)
    trashbtn.render(trash)
    item.className = "float-container space-even gap";
    item.appendChild(input);
    item.appendChild(button);
    item.appendChild(button2);
    document.getElementById(ids).appendChild(item);
  };
  return (
    <div className="todo-card">
      <Draggable>
        <div className="list">
          <div className="card-body">
            <div className="list-header">
              <input type="text" className="title" />
            </div>
            <div className="inputs float-container">
              <input type="text" id={"item"+ids} className="list-item" />
              <FontAwesomeIcon className="add" icon={faAdd} onClick={addItem} />
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
