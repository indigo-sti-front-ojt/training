import React from "react";
import { Outlet } from "react-router-dom";

export const UserLayout = () => {
  return (
    <>
      <div>owner user layout</div>
      <Outlet />
    </>
  );
};
