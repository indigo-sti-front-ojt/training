import React from "react";
import { Outlet } from "react-router-dom";

export const OwnerLayout = () => {
  return (
    <>
      <div>ownerlayout</div>
      <Outlet />
    </>
  );
};
