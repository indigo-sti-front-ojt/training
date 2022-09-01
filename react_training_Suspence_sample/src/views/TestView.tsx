import React, { Suspense } from "react";

export const TestView = () => {
  const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const AlwaysSuspend = () => {
    const slash = Math.random();
    console.log("loading...");
    if (slash > 0.2) {
      throw sleep(1000);
    }
    return <p>Hello, world!</p>;
  };
  return (
    <>
      <div>
        <Suspense fallback={<p>Loading...</p>}>
          <AlwaysSuspend />
        </Suspense>
      </div>
    </>
  );
};
