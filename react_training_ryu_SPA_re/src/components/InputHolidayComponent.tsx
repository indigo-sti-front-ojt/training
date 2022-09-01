import React, { memo, useEffect, useState } from "react";
type DaysTag = {
  id: number;
  text: string;
  click: boolean;
};

type Props = {
  value: number[] | undefined;
  onChange: (value: number[]) => void;
};

export const InputHolidayComponet = memo((props: Props) => {
  const { value, onChange } = props;
  const [firstFlag, setFirstFlag] = useState<boolean>(true);

  const [Days, setDays] = useState<DaysTag[]>([
    { id: 0, text: "日", click: false },
    { id: 1, text: "月", click: false },
    { id: 2, text: "火", click: false },
    { id: 3, text: "水", click: false },
    { id: 4, text: "木", click: false },
    { id: 5, text: "金", click: false },
    { id: 6, text: "土", click: false },
  ]);
  const onClickDay = (day: DaysTag) => {
    const tempDays = Days.map((temp: DaysTag) => {
      return temp.id == day.id ? { ...day, click: !day.click } : temp;
    });
    const tempResult = tempDays
      .filter((pre) => pre.click)
      .map((data) => data.id);
    setFirstFlag(false);

    setDays(tempDays);
    // console.log("holiday", tempResult);

    onChange(tempResult);
    // setTarget(tempResult);
  };
  useEffect(() => {
    // console.log("holiday", value);
    if (firstFlag) {
      const tempDays = Days.map((temp: DaysTag) => {
        return value?.includes(temp.id) ? { ...temp, click: true } : temp;
      });
      setDays(tempDays);
    }
  }, [value]);
  return (
    <>
      <div className="flex flex-row justify-between w-full">
        {Days.map((day) => (
          <div
            className={
              "w-10 h-10 flex justify-center items-center border-2 border-gray-500 rounded-md font-bold bg-gray-200/50" +
              (day.id == 0 ? " text-red-500" : "") +
              (day.id == 6 ? " text-blue-500" : "") +
              (day.click ? " opacity-100" : " opacity-25")
            }
            key={day.id}
            onClick={() => onClickDay(day)}
          >
            {day.text}
          </div>
        ))}
      </div>
    </>
  );
});

InputHolidayComponet.displayName = "InputHolidayComponet";
