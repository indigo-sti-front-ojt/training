import React from "react";
import { ToDoType } from "../types/ToDoType";
import { ToDoItem } from "./ToDoItem";

type Props = {
  todos: ToDoType[];
  setTodos: React.Dispatch<React.SetStateAction<ToDoType[]>>;
};

export const ToDoList: React.FC<Props> = ({ todos, setTodos }) => {
  const FunctionDelete = (todo: ToDoType) => {
    const newTodo = todos.filter((pre) => {
      return pre.id !== todo.id;
    });
    setTodos([...newTodo]);
  };

  const FunctionDone = (todo: ToDoType) => {
    setTodos((ToDo) =>
      ToDo.map((t) =>
        t.id == todo.id ? { ...todo, completed: !todo.completed } : t
      )
    );
  };

  return (
    <div>
      <div>uncompleted</div>
      {todos
        .filter((todo) => !todo.completed)
        .map((todo) => (
          <ToDoItem
            key={todo.id}
            todo={todo}
            FunctionDelete={FunctionDelete}
            FunctionDone={FunctionDone}
          />
        ))}
      <div>completed</div>
      {todos
        .filter((todo) => todo.completed)
        .map((todo) => (
          <ToDoItem
            key={todo.id}
            todo={todo}
            FunctionDelete={FunctionDelete}
            FunctionDone={FunctionDone}
          />
        ))}
    </div>
  );
};
