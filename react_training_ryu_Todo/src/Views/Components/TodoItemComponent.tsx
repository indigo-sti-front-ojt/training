import React from "react";
import { TodoViewDataType } from "../../Types/TodoViewDataType";

type Props = {
  onClickFin: (uuid: string) => void;
  onClickDelete: (uuid: string) => void;
  value: TodoViewDataType;
};

export const TodoItemComponent = (props: Props) => {
  const { value, onClickFin, onClickDelete } = props;
  return (
    <>
      <div>{value.text}</div>
      <button onClick={() => onClickDelete(value.uuid)}>削除</button>
      <button onClick={() => onClickFin(value.uuid)}>完了</button>
    </>
  );
};
