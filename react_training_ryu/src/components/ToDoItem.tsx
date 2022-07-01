import { Button, Checkbox, Grid } from "@mui/material";
import React from "react";
import { ToDoType } from "../types/ToDoType";

type Props = {
  todo: ToDoType;
  FunctionDone: (todo: ToDoType) => void;
  FunctionDelete: (todo: ToDoType) => void;
};

export const ToDoItem = (props: Props) => {
  const { todo, FunctionDone, FunctionDelete } = props;
  const spanStyle = {
    margin: "auto",
  };

  return (
    <Grid
      container
      xs={12}
      direction="row"
      justifyContent="space-around"
      alignContent="center"
      item
    >
      <Grid item xs={3}>
        <Checkbox
          onClick={() => FunctionDone(todo)}
          defaultChecked={todo.completed}
        />
      </Grid>
      <Grid item xs={3} display="flex">
        <span style={spanStyle}>{todo.title}</span>
      </Grid>
      <Grid item xs={3}>
        <Button
          onClick={() => FunctionDelete(todo)}
          variant="contained"
          color="secondary"
        >
          削除
        </Button>
      </Grid>
    </Grid>
  );
};
