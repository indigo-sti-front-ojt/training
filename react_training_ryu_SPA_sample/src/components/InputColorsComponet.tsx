import React, { useEffect, useState } from "react";

type Props = {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
};
export const InputColorsComponent = (props: Props) => {
  const { text, setText } = props;
  const [nowId, setNowId] = useState<string>("#FFFFFF");
  const colorPallet = [
    { id: 0, text: "black", color: "#000000" },
    { id: 1, text: "white", color: "#EEEEEE" },
    { id: 2, text: "orange", color: "#FFA500" },
    { id: 3, text: "blue", color: "#0000FF" },
    { id: 4, text: "red", color: "#FF0000" },
  ];
  const onClickColorPallet = (id: number) => {
    const temp =
      colorPallet.find((element) => element.id == id)?.color ?? "#000000";
    setText(temp);
  };
  useEffect(() => {
    const temp =
      colorPallet.find((element) => element.color == text)?.color ?? "#FF0000";
    setNowId(temp);
  }, [text]);
  return (
    <>
      <div>
        <h2 style={{ color: nowId }}>{nowId}</h2>
        {colorPallet.map((data) => (
          <div key={data.id} onClick={() => onClickColorPallet(data.id)}>
            {data.text}
          </div>
        ))}
      </div>
    </>
  );
};
