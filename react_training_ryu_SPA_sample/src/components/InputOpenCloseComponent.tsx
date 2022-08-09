import React, { memo, useEffect, useState } from "react";

type Props = {
  value: { open: string; close: string } | undefined;
  onChange: (value: { open: string; close: string }) => void;
};

export const InputOpenCloseComponent = memo((props: Props) => {
  const { value, onChange } = props;
  const [open, setOpen] = useState<{ h: string; m: string }>({
    h: "00",
    m: "00",
  });
  const [close, setClose] = useState<{ h: string; m: string }>({
    h: "00",
    m: "00",
  });
  const [flag, setFlag] = useState<boolean>(false);
  const [editFlag, setEditFlag] = useState<boolean>(false);

  const hList = [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
  ];
  const mList = ["00", "10", "20", "30", "40", "50"];
  const stateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFlag(!flag);
    setEditFlag(true);
    switch (e.target.name) {
      case "open_h":
        setOpen({ h: value, m: open.m });
        break;
      case "open_m":
        setOpen({ h: open.h, m: value });
        break;
      case "close_h":
        setClose({ h: value, m: close.m });
        break;
      case "close_m":
        setClose({ h: close.h, m: value });
        break;
    }
  };
  useEffect(() => {
    if (editFlag) {
      console.log("chnage data");
      onChange({
        open: open.h + ":" + open.m,
        close: close.h + ":" + close.m,
      });
    } else if (value) {
      console.log("initialize");
      const tempOpen = value.open.split(":");
      const tempClose = value.close.split(":");
      console.log(tempOpen, tempClose);

      tempOpen.length > 0
        ? setOpen({ h: tempOpen[0], m: tempOpen[1] })
        : setOpen({ h: "01", m: "00" });
      tempClose.length > 0
        ? setClose({ h: tempClose[0], m: tempClose[1] })
        : setClose({ h: "00", m: "00" });
    }
  }, [flag]);
  useEffect(() => {
    if (!editFlag && value) {
      console.log("initialize");
      const tempOpen = value.open.split(":");
      const tempClose = value.close.split(":");
      console.log(tempOpen, tempClose);

      tempOpen.length > 0
        ? setOpen({ h: tempOpen[0], m: tempOpen[1] })
        : setOpen({ h: "01", m: "00" });
      tempClose.length > 0
        ? setClose({ h: tempClose[0], m: tempClose[1] })
        : setClose({ h: "00", m: "00" });
    }
  }, [value]);

  return (
    <>
      <div>input open close component</div>
      <div>
        <span>open</span>
        <select onChange={stateChange} value={open.h} name="open_h">
          {hList.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>
        <span>:</span>
        <select onChange={stateChange} value={open.m} name="open_m">
          {mList.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <div>
        <span>close</span>
        <select onChange={stateChange} value={close.h} name="close_h">
          {hList.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>
        <span>:</span>
        <select onChange={stateChange} value={close.m} name="close_m">
          {mList.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>
    </>
  );
});

InputOpenCloseComponent.displayName = "InputOpenCloseComponent";
