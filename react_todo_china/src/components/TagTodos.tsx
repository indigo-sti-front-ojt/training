import React from "react";
import { typeTodo } from "../types/typeTodo";

type Props = {
  val: typeTodo[] | null;
  setState: React.Dispatch<React.SetStateAction<typeTodo[] | null>>;
  getTagTodos: (tagName: string) => Promise<typeTodo[]>;
};

// 特定のタグのTodoリストを取得 suspence対応コンポーネント
export const TagTodos = (props: Props) => {
  const { val, setState, getTagTodos } = props;
  if (val === null) {
    if (setState) {
      throw getTagTodos("testt")
        .then((res) => {
          setState(res);
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  return <>{val?.map((val) => val.color)}</>;
};
