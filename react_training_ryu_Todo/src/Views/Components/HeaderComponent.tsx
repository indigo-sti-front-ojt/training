import React from "react";
import { Link } from "react-router-dom";

export const HeaderComponent = () => {
  return (
    <>
      <Link to={"/"}>home</Link>
      <Link to={"/listTodo"}>list</Link>
    </>
  );
};
