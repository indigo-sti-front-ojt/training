import { useCallback } from "react";
import { ApiClient } from "../apiClient";
import { typeTagTodos } from "../types/typeTagTodos";

export const useTodoData = () => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const reqestIni = {
    accessToken: API_KEY,
    path: "todo",
  };

  // タグの全取得
  const getTags = useCallback(async () => {
    const res = await ApiClient.post("", {
      ...reqestIni,
      method: "GET",
    });
    console.log("tags", res.data);

    const data: string[] = res.data as string[];
    return data;
  }, []);

  // 特定のタグのデータを取得
  const getTagTodos = () => {
    useCallback(async (tagName: string) => {
      const res = await ApiClient.post("", {
        ...reqestIni,
        method: "GET",
        postData: {
          tag: tagName,
        },
      });
      const data: typeTagTodos = res.data;
      return data;
    }, []);
  };

  return { getTags, getTagTodos };
};
