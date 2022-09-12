import { useState } from "react";
import { createContainer } from "unstated-next";
import { TodoType } from "../Types/TodoType";

const useTodoList = () => {
  const [load, setLoad] = useState<boolean>(false);
  const [tags, setTags] = useState<string[]>([]);
  return { load, setLoad, tags, setTags };
};

export const TodoContainer = createContainer(useTodoList);
