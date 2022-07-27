import React from "react";
import { Link } from "react-router-dom";
import { ShopDBContainer } from "../provider/ShopDBProvider";
export const OwnerItemListPage = () => {
  const { shopDataList } = ShopDBContainer.useContainer();

  // const numbers = [...Array(5)].map((_: undefined, idx: number) => idx);
  return (
    <>
      <Link to="/owner/pages-create">create</Link>
      <div>pages</div>
      {shopDataList.map((data) => (
        <li key={data.uid}>
          <Link to={`${data.uid}`}>{data.uid}</Link>
        </li>
      ))}
    </>
  );
};
