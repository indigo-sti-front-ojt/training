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
    if (newData.length == 0) {
      const message = (
        <Grid item xs={12}>
          <span>指定されたタスクはありません</span>
        </Grid>
      );
      return message;
    }
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
    if (newData.length == 0) {
      const message = (
        <Grid item xs={12}>
          <span>指定されたタスクはありません</span>
        </Grid>
      );
      return message;
    }
    return newData;
  };

  return (
    <Grid container justifyContent="space-around">
      <Grid item xs={12} md={6}>
        <Chip label="未消化のToDo" color="secondary" />
        <Grid container>{DivUnCompleted()}</Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <Chip label="完了のToDo" color="primary" />
        <Grid container>{DivCompleted()}</Grid>
      </Grid>
    </Grid>
  );
};
