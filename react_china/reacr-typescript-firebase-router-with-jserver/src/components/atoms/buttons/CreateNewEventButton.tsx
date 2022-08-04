import React from "react";
import { Link } from "react-router-dom";

export const CreateNewEventButton = () => {
  return (
    <>
      <Link to={"/events/event/create"}>イベント作成</Link>
    </>
  );
};
