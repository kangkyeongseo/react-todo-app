import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { toDoSelector, toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import Selector from "./Selector";
import ToDo from "./ToDo";

function ToDoList() {
  const [toDoList, setToDoList] = useRecoilState(toDoState);
  const toDos = useRecoilValue(toDoSelector);
  useEffect(() => {
    localStorage.setItem("ToDo", JSON.stringify(toDoList));
  }, [toDoList]);
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <Selector />
      <CreateToDo />
      {toDos.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;
