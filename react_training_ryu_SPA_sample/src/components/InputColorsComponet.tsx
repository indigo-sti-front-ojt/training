import React, { memo, useEffect, useState } from "react";

type Props = {
  onChange: (value: string) => void;
  value: string;
};

export const InputColorsComponent = memo((props: Props) => {
  const { value, onChange } = props;
  const [nowId, setNowId] = useState<string>("black");
  const colorPallet = [
    { id: 0, text: "black", color: "bg-black" },
    { id: 1, text: "white", color: "bg-gray-400" },
    { id: 2, text: "orange", color: "bg-orange-500" },
    { id: 3, text: "blue", color: "bg-blue-500" },
    { id: 4, text: "red", color: "bg-red-500" },
  ];
  const onClickColorPallet = (id: number) => {
    const temp =
      colorPallet.find((element) => element.id == id)?.text ?? "black";
    setNowId(temp);
    onChange(temp);
  };
  useEffect(() => {
    const temp =
      colorPallet.find((element) => element.text == value)?.text ?? "black";
    setNowId(temp);
  }, []);

  return (
    <>
      <div className="flex flex-row justify-between w-full gap-x-2">
        {colorPallet.map((data) => (
          <div
            key={data.id}
            className={
              "h-8 w-8 rounded-md shadow-md transition-all ease-in-out " +
              data.color +
              (nowId == data.text ? " opacity-100 shadow-xl" : " opacity-20")
            }
            onClick={() => onClickColorPallet(data.id)}
          ></div>
        ))}
      </div>
    </>
  );
});

InputColorsComponent.displayName = "InputColorsComponent";
