import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuthUser } from "../hocks/AuthUser";

export const Layout = () => {
  const { changeUserState } = useAuthUser();
  useEffect(() => {
    changeUserState();
  }, []);
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
          <Link to="/login">login</Link>
        </li>
      </ul>

      <Outlet />
    </>
  );
};
