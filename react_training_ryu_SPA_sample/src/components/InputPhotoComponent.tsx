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
        return value == tempData.url
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
    onChange(d.url);
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
      <div
        className="flex flex-col justify-center w-full gap-1"
        onClick={() => setViewFlag(true)}
      >
        <img className="w-full h-auto object-contain" src={value} alt="" />
        <div className="form-input">画像を変更</div>
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
          <div className="w-full h-full flex flex-row flex-wrap gap-1 justify-center overflow-y-scroll">
            {editData.map((data: EditDataType) => (
              <div
                className={
                  "flex flex-col w-1/3 h-1/3 border border-white p-1 justify-between " +
                  (data.editFlag
                    ? " opacity-100 bg-green-400/50"
                    : " opacity-50")
                }
                key={data.id}
                onClick={() => onClickEditData(data)}
              >
                <img
                  src={data.url}
                  className="flex-grow w-full h-full object-contain"
                  loading="lazy"
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
});

InputPhotoComponent.displayName = "InputPhotoComponent";
