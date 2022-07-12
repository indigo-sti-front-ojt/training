import React from "react";
import { Outlet } from "react-router-dom";

export const OwnerItemLayout = () => {
  return (
    <>
      <div>item layout</div>
      <Outlet />
    </>
  );
};
