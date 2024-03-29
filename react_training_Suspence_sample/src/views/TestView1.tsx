import axios from "axios";
import React, { memo, Suspense, useCallback, useState } from "react";

export const TestView1 = memo(() => {
  const URL =
    "https://script.google.com/macros/s/AKfycbznt5MYiWRqIuBv_R2dtZudVw2WUtZFBywyfuHKr5-CqdUPgFpwa7HG1izHsaANxT0qAg/exec?";

  const [data1, setData1] = useState<string>();
  const [data2, setData2] = useState<string>();

  const dataReadGet1 = useCallback(async () => {
    const result = axios.get(URL);
    const resultData = (await result).data["message"];
    console.log("data get1", resultData);
    setData1(resultData);
  }, []);
  const dataReadGet2 = useCallback(async () => {
    const result = axios.get(URL + "text=pon pon pon");
    const resultData = (await result).data["message"];
    console.log("data get2", resultData);
    setData2(resultData);
  }, []);

  const data = useCallback(async () => {
    console.log("data");
  }, []);

  const DataView = () => {
    if (!data1 || !data2) {
      throw Promise.all([dataReadGet1(), dataReadGet2(), data()]);
    }
    return (
      <>
        <div>{data1}</div>
        <div>{data2}</div>
      </>
    );
  };
  console.log("renda");

  return (
    <>
      <div>
        <Suspense fallback={<p>Loading...</p>}>
          <div>
            <DataView />
          </div>
        </Suspense>
      </div>
    </>
  );
});
TestView1.displayName = "testview1";
