import { useCallback } from "react";
import { axiosClient } from "../axiosClient";

import { TodoType } from "../Types/TodoType";

export const useTodoData = () => {
  const API_AUTH_KEY = process.env.REACT_APP_API_KEY;
  const requestTemplate = {
    accessToken: API_AUTH_KEY,
    path: "todo",
  }

  const readDataTags = useCallback(async () => {
    const session = axiosClient.post("", {
      ...requestTemplate,
      method: "GET",
    });
    const result = (await session).data;
    const data: string[] = result.data as string[];
    return data;
  }, []);

  const readData = useCallback(async (tagName: string) => {
    const session = axiosClient.post("", {
      ...requestTemplate,
      method: "GET",
      postData: {
        "tag-name": tagName,
      },
    });
    const result = (await session).data;
    const data: TodoType[] = result.data.data as TodoType[];
    return data;
  }, []);

  const addData = useCallback(async (tagName: string) => {
    const session = axiosClient.post("", {
      ...requestTemplate,
      method: "POST",
      postData: {
        "tag-name": tagName,
        data: [],
      },
    });
    const result = (await session).data;
    const data: boolean = result.data as boolean;
    return data;
  }, []);

  const editData = useCallback(
    async (tagName: string, postData: TodoType[]) => {
      const session = axiosClient.post("", {
        ...requestTemplate,
        method: "PUT",
        postData: {
          "tag-name": tagName,
          data: postData,
        },
      });
      const result = (await session).data;
      const data: boolean = result.data as boolean;
      return data;
    },
    []
  );

  const deleteData = useCallback(async (tagName: string) => {
    const session = axiosClient.post("", {
      ...requestTemplate,
      method: "DELETE",
      postData: {
        "tag-name": tagName,
      },
    });
    const result = (await session).data;
    const data: boolean = result.data as boolean;
    return data;
  }, []);

  return { readDataTags, readData, addData, deleteData, editData };
};
