import React, { memo, useEffect, useState } from "react";
import { ImagesDBType } from "../types/ImagesDBType";

type Props = {
  value: string | undefined;
  onChange: (value: string) => void;
  data: ImagesDBType[];
};

type EditDataType = {
  id: string;
  url: string;
  fullPath: string;
  editFlag: boolean;
};
export const InputPhotoComponent = memo((props: Props) => {
  const { value, onChange, data } = props;
  const [firstFlag, setFirstFlag] = useState<boolean>(false);
  const [editData, setEditData] = useState<EditDataType[]>([]);

  useEffect(() => {
    if (!firstFlag) {
      const temp = data.map((tempData: ImagesDBType) => {
        return value == tempData.uid
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
        ? { ...tempData, editFlag: true }
        : { ...tempData, editFlag: false };
    });
    onChange(d.id);
    setEditData(temp);
  };
  return (
    <>
      <div>InputPhotoDataObject</div>
      <div>
        <span>view data</span>
        {value}
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

InputPhotoComponent.displayName = "InputPhotoComponent";
