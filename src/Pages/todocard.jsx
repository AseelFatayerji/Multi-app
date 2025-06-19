import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Draggable from "react-draggable";
import Item from "./list-item";

function Card({ ids, titles }) {
  const listhistory = JSON.parse(localStorage.getItem("info") || "[]");
  const [tasks, SetTasks] = useState([]);
  const [task, SetTask] = useState("");
  const handleChange = (event) => {
    SetTask(event.target.value);
  };
  useEffect(() => {
    const arr = [];
    for (let i = 0; i < listhistory.length; i++) {
      const item = (
        <Item ids={listhistory[i].props.ids} key={listhistory[i].props.key} item={listhistory[i].props.item} />
      );
      arr.push(item);
    }
    SetTasks(tasks.concat(arr));
  }, [listhistory, tasks]);
  const addTask = () => {
    const count = "item" + tasks.length;
    const items = <Item ids={count} item={task} key={count} />;
    SetTasks(tasks.concat(items));
    listhistory.push(items);
    localStorage.setItem("info", JSON.stringify(listhistory));
  };
  return (
    <Draggable>
      <div id={"listcard" + ids}>
        <div className="card-body">
          <div className="list-header">{titles}</div>
          <div className="task float-container space-even gap">
            <input
              type="text"
              className="title"
              value={task}
              placeholder="Add Task"
              onChange={handleChange}
            />
            <div className="toolkit" onClick={addTask}>
              <FontAwesomeIcon className="add" icon={faAdd} />
            </div>
          </div>
          <div>
            {tasks.map((task_item,index) => {
              return <div key={index}>{task_item}</div>;
            })}
          </div>
        </div>
      </div>
    </Draggable>
  );
}
export default Card;
