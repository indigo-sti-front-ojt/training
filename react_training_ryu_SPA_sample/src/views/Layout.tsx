import React from "react";
import { Link, Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <div>layout</div>
      <ul>
        <li>
          <Link to="/">home</Link>
        </li>
        <li>
          <Link to="/about">about</Link>
        </li>
        <li>
          <Link to="/pages">pages</Link>
        </li>
        <li>
          <Link to="/notfond">not found</Link>
        </li>
      </ul>

      <Outlet />
    </>
  );
};
