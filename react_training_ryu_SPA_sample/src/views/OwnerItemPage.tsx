import React from "react";
import { useParams } from "react-router-dom";

export const OwnerItemPage = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <>
      <div>{id}</div>
    </>
  );
};
