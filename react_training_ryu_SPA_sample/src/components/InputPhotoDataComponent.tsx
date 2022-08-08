import React, { memo, useEffect, useState } from "react";

type Props = {
  target: string[];
  setTarget: React.Dispatch<React.SetStateAction<string[]>>;
};

type EditDataType = {
  id: number;
  text: string;
  editFlag: boolean;
};
export const InputPhotoDataComponent = memo((props: Props) => {
  const { target, setTarget } = props;
  const [firstFlag, setFirstFlag] = useState<boolean>(false);

  const [editData, setEditData] = useState<EditDataType[]>([
    { id: 0, text: "aaaa", editFlag: false },
    { id: 1, text: "bbbb", editFlag: false },
    { id: 2, text: "cccc", editFlag: false },
    { id: 3, text: "dddd", editFlag: false },
  ]);
  useEffect(() => {
    if (!firstFlag) {
      const temp = editData.map((tempData: EditDataType) => {
        return target.includes(tempData.text)
          ? { ...tempData, editFlag: true }
          : tempData;
      });
      setEditData(temp);
    }
  }, []);

  const onClickEditData = (data: EditDataType) => {
    setFirstFlag(true);
    const temp = editData.map((tempData: EditDataType) => {
      return tempData.id == data.id
        ? { ...tempData, editFlag: !data.editFlag }
        : tempData;
    });
    data.editFlag
      ? setTarget(target.filter((value: string) => value != data.text))
      : setTarget([...target, data.text]);

    setEditData(temp);
  };
  return (
    <>
      <div>InputPhotoDataObject</div>
      <div>
        <span>view data</span>
        {target.map((data: string) => (
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
