import React from "react";
import { Link } from "react-router-dom";
import { ShopDBContainer } from "../provider/ShopDBProvider";
export const ItemListPage = () => {
  const { shopDataAll } = ShopDBContainer.useContainer();
  return (
    <>
      <div>pages</div>
      {shopDataAll.map((data) => (
        <li key={data.uid}>
          <Link to={`/pages/${data.uid}`}>{data.name}</Link>
        </li>
      ))}
    </>
  );
};
