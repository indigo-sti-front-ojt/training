import React from "react";
import { Link } from "react-router-dom";
export const ItemListPage = () => {
  const numbers = [...Array(5)].map((_: undefined, idx: number) => idx);
  return (
    <>
      <div>pages</div>
      {numbers.map((number) => (
        <li key={number}>
          <Link to={`/pages/${number}`}>{number}</Link>
        </li>
      ))}
    </>
  );
};
