import React from "react";
import { Link } from "react-router-dom";

export const LinkToEventSearch = () => {
  return (
    <>
      <div style={{ margin: "50px 0" }}>
        <h2>イベントを検索</h2>
        <p>サブタイトルサブタイトルサブタイトルサブタイトル</p>
        <Link to={"/events"}>イベント検索する</Link>
      </div>
    </>
  );
};
