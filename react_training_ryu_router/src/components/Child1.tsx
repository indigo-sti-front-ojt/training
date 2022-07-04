import React, { useContext, useState } from "react";
import { UserContext } from "../provider/UserProvider";

export const Child1 = () => {
  const { setUserInfo } = useContext(UserContext);
  const [inputValue, setInputValue] = useState("");

  const ChangeMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const InputMethod = () => {
    setUserInfo(inputValue);
  };

  return (
    <>
      <input type="text" onChange={ChangeMethod} />
      <button onClick={InputMethod}>送信</button>
    </>
  );
};
