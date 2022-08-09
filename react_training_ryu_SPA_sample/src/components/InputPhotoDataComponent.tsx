import React, { memo, useEffect, useState } from "react";

type Props = {
  value: string[] | undefined;
  onChange: (value: string[]) => void;
};

type EditDataType = {
  id: number;
  text: string;
  editFlag: boolean;
};
export const InputPhotoDataComponent = memo((props: Props) => {
  const { value, onChange } = props;
  const [firstFlag, setFirstFlag] = useState<boolean>(false);

  const [editData, setEditData] = useState<EditDataType[]>([
    { id: 0, text: "aaaa", editFlag: false },
    { id: 1, text: "bbbb", editFlag: false },
    { id: 2, text: "cccc", editFlag: false },
    { id: 3, text: "dddd", editFlag: false },
  ]);
  useEffect(() => {
    if (!firstFlag && value) {
      const temp = editData.map((tempData: EditDataType) => {
        return value.includes(tempData.text)
          ? { ...tempData, editFlag: true }
          : tempData;
      });
      setEditData(temp);
    }
  }, [value]);

  const onClickEditData = (data: EditDataType) => {
    setFirstFlag(true);
    const temp = editData.map((tempData: EditDataType) => {
      return tempData.id == data.id
        ? { ...tempData, editFlag: !data.editFlag }
        : tempData;
    });
    if (value) {
      data.editFlag
        ? onChange(value.filter((value: string) => value != data.text))
        : onChange([...value, data.text]);
    }
    // console.log("photo", value);

    setEditData(temp);
  };
  return (
    <>
      <div>InputPhotoDataObject</div>
      <div>
        <span>view data</span>
        {value?.map((data: string) => (
          <div key={data}>{data}</div>
        ))}
      </div>
      <div>
        <span>add panel</span>
        {editData.map((data: EditDataType) => (
          <div key={data.id} onClick={() => onClickEditData(data)}>
            {data.text}
            {data.editFlag ? "true" : "false"}
          </div>
        ))}
      </div>
    </>
  );
});

InputPhotoDataComponent.displayName = "InputPhotoDataComponent";
