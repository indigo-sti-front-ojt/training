import React, { useState, ChangeEvent } from "react";

type Props = {
  onClick: (tagName: string) => void;
};

const [tag, setTag] = useState("");

const handleChangeTag = (e: ChangeEvent<HTMLInputElement>) => {
  setTag(e.target.value);
};

// タグのsuspence用コンポーネント
export const MakeTag = (props: Props) => {
  const { onClick } = props;

  return (
    <>
      <input onChange={handleChangeTag} value={tag} />
      <button onClick={() => onClick(tag)}>送信</button>
    </>
  );
};
