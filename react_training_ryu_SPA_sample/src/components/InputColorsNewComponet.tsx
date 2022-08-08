import React, { memo, useEffect, useState } from "react";

type Props = {
  onChange: (value: string) => void;
  value: string;
};

export const InputColorsNewComponent = memo((props: Props) => {
  const { value, onChange } = props;

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
    setNowId(temp);
    onChange(temp);
  };
  useEffect(() => {
    const temp =
      colorPallet.find((element) => element.color == value)?.color ?? "#000000";
    setNowId(temp);
  }, []);
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
});

InputColorsNewComponent.displayName = "InputColorsNewComponent";
