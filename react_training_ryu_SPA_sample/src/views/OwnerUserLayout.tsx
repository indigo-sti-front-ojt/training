import React from "react";
import { Outlet } from "react-router-dom";

export const OwnerUserLayout = () => {
  return (
    <>
      <div>owner user layout</div>
      <Outlet />
    </>
  );
};
