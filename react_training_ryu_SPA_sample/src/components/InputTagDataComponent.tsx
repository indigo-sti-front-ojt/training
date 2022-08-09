import React, { memo, useEffect, useState } from "react";
import { TagDBType } from "../types/TagDBType";

type Props = {
  value: number[] | undefined;
  onChange: (value: number[]) => void;
  data: TagDBType[];
};

type EditDataType = {
  id: number;
  text: string;
  color: string;
  editFlag: boolean;
};
export const InputTagDataComponent = memo((props: Props) => {
  const { value, onChange, data } = props;
  const [firstFlag, setFirstFlag] = useState<boolean>(false);
  const [editData, setEditData] = useState<EditDataType[]>([]);

  useEffect(() => {
    // console.log(data);
    // console.log(value);

    if (!firstFlag && value) {
      const temp = data.map((tempData: TagDBType) => {
        return value.includes(tempData.id)
          ? { ...tempData, editFlag: true }
          : { ...tempData, editFlag: false };
      });
      setEditData(temp);
    }
  }, [value]);

  const onClickEditData = (d: EditDataType) => {
    setFirstFlag(true);
    const temp = editData.map((tempData: EditDataType) => {
      return tempData.id == d.id
        ? { ...tempData, editFlag: !d.editFlag }
        : tempData;
    });
    if (value) {
      d.editFlag
        ? onChange(value.filter((v: number) => v != d.id))
        : onChange([...value, d.id]);
    }

    setEditData(temp);
  };
  return (
    <>
      <div>InputTagDataObject</div>
      <div>
        <span>view data</span>
        {value?.map((number: number) => (
          <div key={number} style={{ color: `${data[number].color}` }}>
            {data[number].text}
          </div>
        ))}
      </div>
      <div>
        <span>add panel</span>
        {editData.map((data: EditDataType) => (
          <div
            key={data.id}
            onClick={() => onClickEditData(data)}
            style={{ color: `${data.color}` }}
          >
            {data.text}
            {data.editFlag ? "true" : "false"}
          </div>
        ))}
      </div>
    </>
  );
});

InputTagDataComponent.displayName = "InputPhotoDataComponent";
