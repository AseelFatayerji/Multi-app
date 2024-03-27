import "../CSS/App.css";
import Navbar from "./navbar";

function Todo() {
  return (
    <div className="Todo">
      <Navbar />
      <div className="float-container space-even">
        <div className="toolkit"></div>
        <div className="list"></div>
      </div>
    </div>
  );
}

export default Todo;
