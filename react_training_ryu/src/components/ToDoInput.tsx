import React, { useState } from "react";
import { ToDoType } from "../types/ToDoType";

type Props = {
  todos: ToDoType[];
  setTodos: React.Dispatch<React.SetStateAction<ToDoType[]>>;
};

export const ToDoInput = (props: Props) => {
  const { todos, setTodos } = props;

  const [inputText, setInputText] = useState("");
  const [count, setCount] = useState(
    todos.length != 0 ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1
  );

  const OnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const FunctionSubmit = () => {
    const newTodo: ToDoType = {
      id: count,
      title: inputText,
      completed: false,
    };
    setCount(count + 1);
    setInputText("");
    setTodos([...todos, newTodo]);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="todo plz input"
        value={inputText}
        onChange={OnChangeInput}
      />
      <button onClick={FunctionSubmit}>追加</button>
    </div>
  );
};
