import { useCallback } from "react";
import { ApiClient } from "../apiClient";
import { ApiClientMock } from "../apiClient";
import { typeTodo } from "../types/typeTodo";

export const useTodoApi = () => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const reqestIni = {
    accessToken: API_KEY,
    path: "todo",
  };

  // タグの全取得(mock)
  const getTagsMock = useCallback(async () => {
    const res = await ApiClientMock.get("tag-name");
    console.log("tags", res.data);

    const data: string[] = res.data as string[];
    return data;
  }, []);

  // タグの全取得
  const getTags = useCallback(async () => {
    const res = await ApiClient.post("", {
      ...reqestIni,
      method: "GET",
    });
    console.log("tags", res.data);

    const data: string[] = res.data.data as string[];
    return data;
  }, []);

  // 特定のタグのデータを取得
  const getTagTodos = useCallback(async (tagName: string) => {
    const res = await ApiClient.post("", {
      ...reqestIni,
      method: "GET",
      postData: {
        "tag-name": tagName,
      },
    });
    const data: typeTodo[] = res.data.data.data as typeTodo[];
    return data;
  }, []);

  // タグの作成（特定のタグのデータにTODOを作成）
  const createTagTodos = useCallback(async (tagName: string) => {
    const res = await ApiClient.post("", {
      ...reqestIni,
      method: "POST",
      postData: {
        "tag-name": tagName,
        data: [],
      },
    });

    const data: boolean = res.data as boolean;
    return data;
  }, []);

  // 特定のタグ内ののデータのTODOを編集/削除
  const editTagTodos = useCallback(
    async (tagName: string, newData: typeTodo[]) => {
      const res = await ApiClient.post("", {
        ...reqestIni,
        method: "PUT",
        postData: {
          "tag-name": tagName,
          data: newData,
        },
      });

      const data: boolean = res.data as boolean;
      return data;
    },
    []
  );

  // 特定のタグをTODOごと削除
  const deleteTag = useCallback(async (tagName: string) => {
    const res = await ApiClient.post("", {
      ...reqestIni,
      method: "DELETE",
      postData: {
        "tag-name": tagName,
      },
    });

    const data: boolean = res.data as boolean;
    return data;
  }, []);

  return { getTagsMock, getTags, getTagTodos, createTagTodos, editTagTodos, deleteTag };
};
