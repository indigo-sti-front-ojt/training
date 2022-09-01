import axios from "axios";
import React, { Suspense, useState } from "react";

export const TestView1 = () => {
  const URL =
    "https://script.google.com/macros/s/AKfycbzHtfUEjj8XADR7ts9DDcmliGS8tUPkdCrtwfyqffUYa9CZkM3ffcEPttCBI3_2AAON1Q/exec?";
  const [data1, setData1] = useState<string>();
  const [data2, setData2] = useState<string>();

  const dataReadGet1 = async () => {
    const result = axios.get(URL);
    const resultData = (await result).data["message"];
    setData1(resultData);
  };
  const dataReadGet2 = async () => {
    const result = axios.get(URL + "text=pon pon pon");
    const resultData = (await result).data["message"];
    setData2(resultData);
  };

  const DataView = () => {
    if (!data1 || !data2) throw Promise.all([dataReadGet1(), dataReadGet2()]);
    return (
      <>
        <div>{data1}</div>
        <div>{data2}</div>
      </>
    );
  };

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
};
