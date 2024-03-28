import "../CSS/App.css";
import Navbar from "./navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faAdd } from "@fortawesome/free-solid-svg-icons"
import Draggable, {DraggableCore} from "react-draggable";
function Card() {
    const addItem = () =>{
        const val = document.getElementById("item").value
        const item = document.createElement("li")
        const input = document.createElement("input")
        input.type = "text"
        input.disabled = true
        input.value = val
        item.appendChild(input)
        document.getElementById("list").appendChild(item)
    }
  return (
    <div className="todo-card">
      <Draggable>
          <div className="list">
            <div className="card-body"><div className="list-header"><input type="text" className="title"/></div>
            <div className="inputs float-container"><input type="text" id="item" className="list-item"/><FontAwesomeIcon className="add" icon={faAdd}  onClick={addItem}/></div>
           <div ><ul id="list" className="list-display"></ul></div> 
            </div>
          </div></Draggable>
    </div>
  );
}

export default Card;
