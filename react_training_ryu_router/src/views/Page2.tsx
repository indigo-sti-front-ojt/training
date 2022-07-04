import React from "react";
import { Link, Outlet } from "react-router-dom";

export const Page2 = () => {
  return (
    <>
      <ul>
        <li>
          <Link to="child1">child1</Link>
        </li>
        <li>
          <Link to="child2">child2</Link>
        </li>
      </ul>
      <Outlet></Outlet>
    </>
  );
};
