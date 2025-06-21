import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { Draggable } from "../Assets/item";
import { Droppable } from "../Assets/board";

import Navbar from "../Assets/navbar";

function Todo() {
  const [items, setItems] = useState([]);
  const [boards, setBoards] = useState([]);
  const [parent, setParent] = useState(null);
  const draggable = <Draggable id="draggable">Go ahead, drag me.</Draggable>;
  function addBoard() {
    const newBoard = `droppable${boards.length + 1}`;
    setBoards([...boards, newBoard]);
  }
  function handleDragEnd({ over }) {
    setParent(over ? over.id : null);
  }
  return (
    <div className="bg-indigo-200">
      <Navbar />
      <div className="flex pt-24 pb-10 gap-10 px-20 h-screen">
        <DndContext onDragEnd={handleDragEnd}>
          <div className="bg-slate-100 p-10 rounded-lg ">
            <input
              type="button"
              placeholder="Add a new task"
              className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
            />
            {!parent ? draggable : null}
          </div>
          <div className="bg-slate-100 p-10 rounded-lg w-full">
            <div>
              <button onClick={addBoard}>Add Board</button>
            </div>
            <div className="flex gap-10 mt-4 overflow-auto flex-wrap">
              {boards.map((board, index) => (
                <Droppable id={`droppable${index + 1}`} key={index}>
                  {parent === `droppable${index + 1}` ? draggable : "Drop here"}
                </Droppable>
              ))}
            </div>
          </div>
        </DndContext>
      </div>
    </div>
  );
}

export default Todo;
