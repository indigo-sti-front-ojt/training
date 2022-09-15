import React from "react";
import { FallbackProps } from "react-error-boundary";

export const onError = (error: Error, info: { componentStack: string }) => {
  console.log("error.message", error.message);
  console.log("info.componentStack:", info.componentStack);
};

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  console.log("error message", error.message);

  return (
    <div>
      <h2>エラーが発生しました。</h2>
      <button onClick={resetErrorBoundary}>reset</button>
    </div>
  );
};
