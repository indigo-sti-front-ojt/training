import { Container } from "@mui/material";
import React, { useState } from "react";
import { ToDoInput } from "../components/ToDoInput";
import { ToDoList } from "../components/ToDoList";
import { ToDoType } from "../types/ToDoType";

const FirstDataTodo: ToDoType[] = [];

export const ToDoView = () => {
  const [todos, setTodos] = useState(FirstDataTodo);

  return (
    <Container maxWidth="lg">
      <ToDoInput todos={todos} setTodos={setTodos} />
      <ToDoList todos={todos} setTodos={setTodos} />
    </Container>
  );
};
