import React from "react";
import { axiosClient } from "../axios/axiosClient";

export const TestViewAxios = () => {
  const onClickMethodTest_0 = async () => {
    try {
      const result = await axiosClient.get("/posts");
      console.log(result);
    } catch (error: unknown) {
      console.log(error);
    }
  };
  const onClickMethodTest_1 = async () => {
    try {
      const result = await axiosClient.get("/posts", {
        params: {
          id: 0,
        },
      });
      console.log(result);
    } catch (error: unknown) {
      console.log(error);
    }
  };
  const onClickMethodTest_2 = async () => {
    try {
      const result = await axiosClient.post("/posts", {
        title: "foo",
        body: "bar",
        userId: 1,
      });
      console.log(result);
    } catch (error: unknown) {
      console.log(error);
    }
  };
  return (
    <>
      <button onClick={onClickMethodTest_0}>all get</button>
      <button onClick={onClickMethodTest_1}>get</button>
      <button onClick={onClickMethodTest_2}>post</button>
    </>
  );
};
