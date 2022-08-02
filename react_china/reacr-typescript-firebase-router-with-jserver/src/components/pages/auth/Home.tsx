import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <div>
        <Link to={"/events"}>イベント検索する</Link>
      </div>
      <Link to={"/events"}>お酒 </Link>
      <Link to={"/events"}>ゲーム </Link>
      <Link to={"/events"}>アウトドア </Link>
      <Link to={"/events"}>勉強</Link>
    </>
  );
};
