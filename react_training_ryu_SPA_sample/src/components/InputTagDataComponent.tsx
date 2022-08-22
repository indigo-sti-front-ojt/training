import React, { memo, useEffect, useState } from "react";
import { TagComponent } from "../designComponents/TagComponent";
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
        ? onChange(value.filter((v: number) => v != d.id))
        : onChange([...value, d.id]);
    }

    setEditData(temp);
  };

  const [viewFlag, setViewFlag] = useState<boolean>(false);

  const onClickParent = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.currentTarget === e.target) {
      setViewFlag(false);
    }
  };
  const onClickCross = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setViewFlag(false);
  };

  return (
    <>
      <div className="w-full flex flex-row flex-wrap gap-y-2">
        {value?.map((number: number) => (
          <TagComponent key={number} data={data[number]} />
        ))}
        <div className="form-input" onClick={() => setViewFlag(true)}>
          タグを編集
        </div>
      </div>

      <div
        className={
          "fixed overflow-hidden flex justify-center items-center bg-gray-600/50 transition-all " +
          (viewFlag
            ? "w-screen h-screen top-0 left-0"
            : "w-0 h-0 top-1/2 left-1/2")
        }
        onClick={onClickParent}
      >
        <div className="w-4/5 max-w-4xl h-3/4 shadow-md bg-white relative flex flex-col py-2">
          <div
            className="absolute -top-10 right-0 w-10 h-10 text-white"
            onClick={onClickCross}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <div className="w-full h-full flex flex-row flex-wrap justify-center overflow-y-scroll">
            <div className="flex flex-col w-full">
              <div className="flex flex-col items-start">
                <span className="">add panel</span>
                <div className="w-full flex flex-row flex-wrap gap-y-2">
                  {value?.map((number: number) => (
                    <div
                      key={number}
                      onClick={() => onClickEditData(editData[number])}
                    >
                      <TagComponent data={data[number]} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-start flex-grow overflow-y-scroll">
                <span>view panel</span>
                <div className="w-full flex flex-row flex-wrap gap-y-2">
                  {editData.map((data: EditDataType) => (
                    <div key={data.id} onClick={() => onClickEditData(data)}>
                      <TagComponent data={data} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

InputTagDataComponent.displayName = "InputPhotoDataComponent";
