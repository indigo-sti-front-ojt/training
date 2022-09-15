import React, { Suspense } from "react";

import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
  useResetRecoilState,
} from "recoil";
import { userStateString, userState, suspenseTest } from "../store/userState";
import ErrorBoundary from "./ErrorBoundary";

export const Test1 = () => {
  const [admin, setAdmin] = useRecoilState(userState);
  const onClickButton = () => {
    setAdmin(!admin);
  };
  return (
    <>
      <div>{admin ? "login" : "nologin"}</div>
      <button onClick={onClickButton}>change state</button>
      <ChangeState />
      <RestState />
      <Suspense fallback={<p>loading...</p>}>
        <SuspenseState />
      </Suspense>

      {/* 一度出たエラーを解消することができない */}
      <ErrorBoundary>
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
const ChangeState = () => {
  const setAdmin = useSetRecoilState(userState);
  return <button onClick={() => setAdmin((pre) => !pre)}>change state</button>;
};
const RestState = () => {
  const resetAdmin = useResetRecoilState(userState);
  return <button onClick={resetAdmin}>reset state</button>;
};

const SuspenseState = () => {
  const data = useRecoilValue(suspenseTest);
  return (
    <>
      <div>{data}</div>
    </>
  );
};
