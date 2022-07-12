import React from "react";
import { Outlet } from "react-router-dom";

export const ItemLayout = () => {
  return (
    <>
      <div>item layout</div>
      <Outlet />
    </>
  );
};
