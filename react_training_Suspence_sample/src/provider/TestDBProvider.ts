import { useState } from "react";
import { createContainer } from "unstated-next";

const useTestDBProvider = () => {
  const [data1, setData1] = useState<string>();
  const [data2, setData2] = useState<string>();
  return {
    data1,
    setData1,
    data2,
    setData2,
  };
};

export const TestDBContainer = createContainer(useTestDBProvider);
