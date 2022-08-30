import React from "react";
import { Outlet } from "react-router-dom";

export const OutletLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};
