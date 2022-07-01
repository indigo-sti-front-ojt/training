import React from "react";
import { ToDoType } from "../types/ToDoType";

type Props = {
  todo: ToDoType;
  FunctionDone: (todo: ToDoType) => void;
  FunctionDelete: (todo: ToDoType) => void;
};

export const ToDoItem = (props: Props) => {
  const { todo, FunctionDone, FunctionDelete } = props;

  return (
    <div>
      <input
        type="checkbox"
        onClick={() => FunctionDone(todo)}
        defaultChecked={todo.completed}
      />
      <span>{todo.title}</span>
      <button onClick={() => FunctionDelete(todo)}>削除</button>
    </div>
  );
};
