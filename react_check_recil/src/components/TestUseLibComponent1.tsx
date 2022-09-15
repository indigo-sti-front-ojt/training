import React, { useState } from "react";
import { useErrorHandler } from "react-error-boundary";

export const Test1 = () => {
  const [check, setCheck] = useState<boolean>(false);
  const handleError = useErrorHandler();

  const ErrorComponent = () => {
    const onClickButton = () => {
      setCheck(true);
      handleError(new Error("404"));
    };
    return (
      <>
        <button onClick={onClickButton}>ErrorButton</button>
      </>
    );
  };

  return (
    <>
      {check ? "true" : "false"}
      <ErrorComponent />
    </>
  );
};
