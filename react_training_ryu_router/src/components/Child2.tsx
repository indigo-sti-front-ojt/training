import React, { useContext } from "react";
import { UserContext } from "../provider/UserProvider";

export const Child2 = () => {
  const { userInfo } = useContext(UserContext);
  return (
    <>
      child2
      <div>{userInfo}</div>
    </>
  );
};
