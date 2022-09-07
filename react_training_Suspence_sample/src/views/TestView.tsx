import React, { Suspense, useCallback } from "react";

export const TestView = () => {
  const sleep = useCallback((ms: number) => {
    return new Promise((resolve) => {
      // console.log(ms);
      setTimeout(resolve, ms);
    });
  }, []);
  const dash = useCallback(async () => {
    console.log("data");
    return "data";
  }, []);

  const AlwaysSuspend = () => {
    if (Math.random() > 0.2) {
      throw Promise.all([sleep(100), sleep(5), dash()]);
    }
    console.log("loading...");
    return <p>Hello, world!</p>;
  };
  console.log("reeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");

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
