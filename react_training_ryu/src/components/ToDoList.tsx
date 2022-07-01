import { Chip, Grid } from "@mui/material";
import React from "react";
import { ToDoType } from "../types/ToDoType";
import { ToDoItem } from "./ToDoItem";

type Props = {
  todos: ToDoType[];
  setTodos: React.Dispatch<React.SetStateAction<ToDoType[]>>;
};

export const ToDoList = (props: Props) => {
  const { todos, setTodos } = props;

  const FunctionDelete = (todo: ToDoType) => {
    const newTodo = todos.filter((pre) => {
      return pre.id !== todo.id;
    });
    setTodos(newTodo);
  };

  const FunctionDone = (todo: ToDoType) => {
    const newTodo = todos.map((t) =>
      t.id == todo.id ? { ...todo, completed: !todo.completed } : t
    );
    setTodos(newTodo);
  };

  const DivUnCompleted = () => {
    const newData = todos
      .filter((todo) => !todo.completed)
      .map((todo) => (
        <ToDoItem
          key={todo.id}
          todo={todo}
          FunctionDelete={FunctionDelete}
          FunctionDone={FunctionDone}
        />
      ));
    return newData;
  };

  const DivCompleted = () => {
    const newData = todos
      .filter((todo) => todo.completed)
      .map((todo) => (
        <ToDoItem
          key={todo.id}
          todo={todo}
          FunctionDelete={FunctionDelete}
          FunctionDone={FunctionDone}
        />
      ));
    return newData;
  };

  return (
    <Grid container>
      <Grid item xs={6}>
        <Chip label="未消化のToDo" color="secondary" />
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
        >
          {DivUnCompleted()}
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Chip label="完了のToDo" color="primary" />
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
        >
          {DivCompleted()}
        </Grid>
      </Grid>
    </Grid>
  );
};
