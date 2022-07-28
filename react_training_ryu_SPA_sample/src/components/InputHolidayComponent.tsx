import React, { memo, useEffect, useState } from "react";
type DaysTag = {
  id: number;
  text: string;
  click: boolean;
};

type Props = {
  target: number[];
  setTarget: React.Dispatch<React.SetStateAction<number[]>>;
};

export const InputHolidayComponet = memo((props: Props) => {
  const { target, setTarget } = props;
  const [Days, setDays] = useState<DaysTag[]>([
    { id: 0, text: "日曜日", click: false },
    { id: 1, text: "月曜日", click: false },
    { id: 2, text: "火曜日", click: false },
    { id: 3, text: "水曜日", click: false },
    { id: 4, text: "木曜日", click: false },
    { id: 5, text: "金曜日", click: false },
    { id: 6, text: "土曜日", click: false },
  ]);
  const onClickDay = (day: DaysTag) => {
    const tempDays = Days.map((temp: DaysTag) => {
      return temp.id == day.id ? { ...day, click: !day.click } : temp;
    });
    const tempResult = tempDays
      .filter((pre) => pre.click)
      .map((data) => data.id);

    setDays(tempDays);
    setTarget(tempResult);
  };
  useEffect(() => {
    console.log(target);
    if (target.length != 0) {
      const tempDays = Days.map((temp: DaysTag) => {
        return target.includes(temp.id) ? { ...temp, click: true } : temp;
      });
      setDays(tempDays);
    }
  }, []);
  return (
    <>
      <div>inputDasysCompnents</div>
      <div>
        {Days.map((day) => (
          <div key={day.id} onClick={() => onClickDay(day)}>
            {day.text}
            {day.click ? <>click</> : <>no click</>}
          </div>
        ))}
      </div>
    </>
  );
});

InputHolidayComponet.displayName = "InputHolidayComponet";
