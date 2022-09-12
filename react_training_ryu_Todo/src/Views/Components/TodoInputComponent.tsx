import React, { useState } from "react";

type Props = {
  onClickAdd: (text: string, color: string) => void;
};

export const TodoInputComponent = (props: Props) => {
  const { onClickAdd } = props;
  const [text, setText] = useState<string>("");
  const [color, setColor] = useState<string>("");

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const onChangeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };
  const onClickAddButton = () => {
    onClickAdd(text, color);
    setText("");
    setColor("");
  };
  //   react-hook-formとマテリアルUIの融合を試したい
  return (
    <>
      <input type="text" value={text} onChange={onChangeText} />
      <input type="text" value={color} onChange={onChangeColor} />
      <button onClick={onClickAddButton}>追加</button>
    </>
  );
};
