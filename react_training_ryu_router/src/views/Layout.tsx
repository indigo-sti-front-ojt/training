import React from "react";
import { Link, Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="page1">page1</Link>
        </li>
        <li>
          <Link to="page2">page2</Link>
        </li>
      </ul>
      <Outlet></Outlet>
    </>
  );
};
