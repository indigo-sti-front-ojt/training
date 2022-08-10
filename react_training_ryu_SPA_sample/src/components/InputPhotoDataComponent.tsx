import React, { memo, useEffect, useState } from "react";
import { ImagesDBType } from "../types/ImagesDBType";

type Props = {
  value: string[] | undefined;
  onChange: (value: string[]) => void;
  data: ImagesDBType[];
};

type EditDataType = {
  id: string;
  url: string;
  fullPath: string;
  editFlag: boolean;
};
export const InputPhotoDataComponent = memo((props: Props) => {
  const { value, onChange, data } = props;
  const [firstFlag, setFirstFlag] = useState<boolean>(false);
  const [editData, setEditData] = useState<EditDataType[]>([]);

  useEffect(() => {
    if (!firstFlag && value) {
      const temp = data.map((tempData: ImagesDBType) => {
        return value.includes(tempData.uid)
          ? {
              id: tempData.uid,
              url: tempData.url,
              fullPath: tempData.fullPath,
              editFlag: true,
            }
          : {
              id: tempData.uid,
              url: tempData.url,
              fullPath: tempData.fullPath,
              editFlag: false,
            };
      });
      setEditData(temp);
    }
  }, [value, data]);

  const onClickEditData = (d: EditDataType) => {
    setFirstFlag(true);
    const temp = editData.map((tempData: EditDataType) => {
      return tempData.id == d.id
        ? { ...tempData, editFlag: !d.editFlag }
        : tempData;
    });
    if (value) {
      d.editFlag
        ? onChange(value.filter((value: string) => value != d.id))
        : onChange([...value, d.id]);
    }
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
            {data.fullPath}
            {data.editFlag ? "true" : "false"}
          </div>
        ))}
      </div>
    </>
  );
});

InputPhotoDataComponent.displayName = "InputPhotoDataComponent";
