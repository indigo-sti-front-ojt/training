import React from "react";
import { Link, Outlet, useParams } from "react-router-dom";

export const OwnerItemPage = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <>
      <div>{id}</div>
      <Link to={"edit"}>edit</Link>
      <Outlet />
    </>
  );
};
