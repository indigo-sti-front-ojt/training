import { useState } from "react";
import { createContainer } from "unstated-next";

const useTodoList = () => {
  const [load, setLoad] = useState<boolean>(false);
  const [tags, setTags] = useState<string[]>([]);
  return { load, setLoad, tags, setTags };
};

export const TodoContainer = createContainer(useTodoList);
