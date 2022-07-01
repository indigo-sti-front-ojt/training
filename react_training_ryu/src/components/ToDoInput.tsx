import { Box, Button, TextField } from "@mui/material";
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
  const OnKeyPressEnterInput = (e: {
    key: string;
    preventDefault: () => void;
  }) => {
    if (e.key == "Enter") {
      e.preventDefault();
      FunctionSubmit();
    }
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
    <Box
      display="flex"
      justifyContent="center"
      alignContent="center"
      margin={4}
    >
      <TextField
        id="standard-basic"
        label="ToDoタスク"
        value={inputText}
        onChange={OnChangeInput}
        onKeyDown={OnKeyPressEnterInput}
      />
      <Button variant="contained" color="primary" onClick={FunctionSubmit}>
        追加
      </Button>
    </Box>
  );
};
