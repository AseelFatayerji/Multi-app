import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";

function Item({ ids, item }) {
  let listhistory = JSON.parse(localStorage.getItem("info"));
  const [title, SetTitle] = useState(item);

  const handleChange = (event) => {
    SetTitle(event.target.value);
    for (let i = 0; i < listhistory.length; i++) {
      if (listhistory[i].props.item === item) {
        listhistory[i].props.item = title;
        break;
      }
    }
  };
  const complete = () => {
    let arr = [];
    let count = localStorage.getItem("acc");
    count++;
    localStorage.setItem("acc", count);
    console.log(listhistory);

    for (let i = 0; i < listhistory.length; i++) {
      if (listhistory[i].props.item !== item) {
        arr.push(listhistory[i]);
      }
    }
    let rem = document.getElementById("listcard" + ids);
    rem.remove();
    listhistory = arr;
    localStorage.setItem("info", JSON.stringify(listhistory));
  };
  const trash = () => {
    let count = localStorage.getItem("rej");
    count++;
    localStorage.setItem("rej", count);
    let arr = [];
    for (let i = 0; i < listhistory.length; i++) {
      if (listhistory[i].props.item !== item) {
        arr.push(listhistory[i]);
      }
    }
    let rem = document.getElementById("listcard" + ids);
    rem.remove();
    listhistory = arr;
    localStorage.setItem("info", JSON.stringify(listhistory));
  };
  return (
    <div id={"listcard" + ids}>
      <div className="task float-container space-between gap ">
        <input placeholder={title} className="title" onChange={handleChange} />
        <div className="float-container space-even gap">
          <div onClick={complete}>
            <FontAwesomeIcon className="check" icon={faCheck} />
          </div>
          <div onClick={trash}>
            <FontAwesomeIcon className="trash" icon={faTrash} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Item;
