import React from "react";
import { useSampleDB } from "../hocks/SampleDB";
import { SampleDBContainer } from "../provider/SampleDBProvider";
import { SampleDBType } from "../types/SampleDBType";
export const SampleDBListItem = (props: SampleDBType) => {
  const { uid, text, color } = props;
  const { TestDataDelete } = useSampleDB();
  const { setEditFlag, setEditData } = SampleDBContainer.useContainer();
  const onClickDelete = () => {
    TestDataDelete(uid);
    setEditFlag(false);
  };
  const onClickEdit = () => {
    setEditData(props);
    setEditFlag(true);
  };
  return (
    <>
      <div>
        <span>{uid}</span>
        <span>/</span>
        <span>{text}</span>
        <span>/</span>
        <span>{color}</span>
        <button onClick={onClickDelete}>削除</button>
        <button onClick={onClickEdit}>編集</button>
      </div>
    </>
  );
};
