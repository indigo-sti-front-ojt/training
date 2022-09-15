import React from "react";
import { ErrorBoundary } from "react-error-boundary";

import { useRecoilState, useRecoilValue } from "recoil";
import { userStateString, userState } from "../store/userState";
import { ErrorFallback, onError } from "./ErrorBoundaryLib";

export const Test1 = () => {
  const [admin, setAdmin] = useRecoilState(userState);
  const onClickButton = () => {
    setAdmin(!admin);
  };
  const ResetFunction = () => {
    setAdmin(true);
  };

  return (
    <>
      <div>{admin ? "login" : "nologin"}</div>
      <div>
        <button onClick={onClickButton}>change state</button>
      </div>
      {/* 一度出たエラーを解消することができない */}
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={ResetFunction}
        onError={onError}
      >
        <ErrorComponent />
      </ErrorBoundary>
    </>
  );
};

const ErrorComponent = () => {
  const message = useRecoilValue(userStateString);
  if (!message) throw new Error("no login");
  return <></>;
};
