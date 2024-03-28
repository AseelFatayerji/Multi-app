import "../CSS/App.css";
import Navbar from "./navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faClipboard,faCloud,faCalculator } from "@fortawesome/free-solid-svg-icons"
import Draggable, {DraggableCore} from "react-draggable";
function Todo() {
  return (
    <div className="Todo">
      <Navbar />
      <div className="float-container space-even">
        <div className="toolkit">
          <Draggable>
          <div className="list">
            <label>New card</label>
            <input type="text" />
          </div></Draggable>
        </div>
        <div className="list"></div>
      </div>
    </div>
  );
}

export default Todo;
