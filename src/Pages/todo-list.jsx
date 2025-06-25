import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { Draggable } from "../Components/item";
import { Board } from "../Components/board";

import Navbar from "../Components/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faTrash } from "@fortawesome/free-solid-svg-icons";

function Todo() {
  const [items, setItems] = useState(
    localStorage.getItem("items")
      ? JSON.parse(localStorage.getItem("items"))
      : []
  );
  const [boards, setBoards] = useState(
    localStorage.getItem("boards")
      ? JSON.parse(localStorage.getItem("boards"))
      : []
  );
  const [parent, setParent] = useState(null);
  const [boardName, setBoardName] = useState(
    localStorage.getItem("boardName")
      ? JSON.parse(localStorage.getItem("boardName"))
      : []
  );
  const [title, setTitle] = useState("");
  const draggable = <Draggable id="draggable">Go ahead, drag me.</Draggable>;
  const addBoard = () => {
    const newBoard = `board${boards.length + 1}`;
    setBoardName([...boardName, title]);
    setBoards([...boards, newBoard]);
    localStorage.setItem("boards", JSON.stringify([...boards, newBoard]));
    localStorage.setItem("boardName", JSON.stringify([...boardName, title]));
  };
  const removeBoard = (index) => {
    const newBoard = boards.filter((_, i) => i !== index);
    const newTitles = boardName.filter((_, i) => i !== index);
    setBoardName(newTitles);
    setBoards(newBoard);
    localStorage.setItem("boards", JSON.stringify(newBoard));
    localStorage.setItem("boardName", JSON.stringify(newTitles));
  };
  function handleDragEnd({ over }) {
    setParent(over ? over.id : null);
  }
  return (
    <div className="bg-indigo-200">
      <Navbar />
      <div className="flex pt-24 pb-10 gap-10 px-20 h-screen font-mono">
        <DndContext onDragEnd={handleDragEnd}>
          <div className="bg-white p-10 rounded-lg ">
            <input
              type="button"
              placeholder="Add a new task"
              className="border border-gray-300 rounded-lg p-2 mb-2 w-full"
            />
            {!parent ? draggable : null}
          </div>
          <div className="bg-white p-6 rounded-lg w-full">
            <div className="flex justify-left gap-5 items-center mb-2">
              <span>
                <input
                  type="text"
                  placeholder="New board"
                  className=" bg-white text-left border-2 border-gray-300 rounded-lg w-full"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </span>
              <span>
                <button
                  onClick={addBoard}
                  className="rounded-lg text-white bg-indigo-500 py-2 px-3"
                >
                  <FontAwesomeIcon icon={faAdd} />
                </button>
              </span>
            </div>
            <div className="flex gap-10 mt-4 overflow-auto flex-wrap">
              {boards.map((board, index) => (
                <div
                  key={index}
                  className="w-1/4 border-2 border-gray-300 rounded-lg"
                >
                  <div className="bg-neutral-200 border-b-2 text-slate-800 text-center p-2 rounded-t-lg flex justify-between">
                    {boardName[index]}
                    <FontAwesomeIcon
                      className="hover:text-red-700 cursor-pointer"
                      icon={faTrash}
                      onClick={() => removeBoard(index)}
                    />
                  </div>
                  <div className="bg-white p-4 rounded-b-lg">
                    <Board id={`board${index + 1}`}>
                      {parent === `board${index + 1}` ? draggable : "Drop here"}
                    </Board>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DndContext>
      </div>
    </div>
  );
}

export default Todo;
