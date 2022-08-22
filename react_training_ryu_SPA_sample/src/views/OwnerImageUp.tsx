import React, { useEffect, useState } from "react";
import { useImage } from "../hocks/Image";
import { v4 } from "uuid";
import { ImageContainer } from "../provider/ImageProvider";
import { ImagesDBType } from "../types/ImagesDBType";
export const OwnerImageUp = () => {
  const { imageDataList } = ImageContainer.useContainer();
  const { imageUpload, imageDelete } = useImage();
  const [imageData, setImageData] = useState<File>();
  const [preview, setPreview] = useState<string>(
    "https://placehold.jp/200x200.png"
  );

  const [upFlag, setUpFlag] = useState<boolean>(false);
  const [first, setFirst] = useState<boolean>(true);

  const [targetData, setTargetData] = useState<ImagesDBType>({
    uid: "",
    fullPath: "",
    url: "",
  });
  const [viewFlag, setViewFlag] = useState<boolean>(false);

  const buttonImageUp = async () => {
    if (!imageData) return;
    if (!imageData.name) return;
    const result = await imageUpload(imageData.name + v4(), imageData);
    console.log(result);
    window.location.reload();
  };
  const onChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirst(false);
    if (event.target.files?.length != 0 && event.target.files) {
      setImageData(event.target.files[0]);
      setUpFlag(true);
    } else {
      setPreview("https://placehold.jp/200x200.png");
      setUpFlag(false);
    }
  };

  const onClickDelete = (data: ImagesDBType) => {
    setTargetData(data);
    setViewFlag(true);
  };
  const deleteData = async () => {
    if (targetData.uid != "") await imageDelete(targetData);
  };
  const onClickYes = () => {
    deleteData();
    setViewFlag(false);
  };

  const onClickParent = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.currentTarget === e.target) {
      setViewFlag(false);
    }
  };
  const onClickCross = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setViewFlag(false);
  };

  useEffect(() => {
    const objectURL = URL.createObjectURL(imageData ?? new Blob());
    if (!first) {
      setPreview(objectURL);
    }
    return () => {
      URL.revokeObjectURL(objectURL);
      setViewFlag(false);
    };
  }, [imageData]);

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <label
          htmlFor="image"
          className="h-64 w-full md:w-1/2 flex flex-col items-center justify-center gap-2 flex-grow"
        >
          <input
            type="file"
            id="image"
            className="hidden"
            onChange={onChangeEvent}
          />
          <div className="h-4/5 w-3/4 flex justify-center items-center">
            <img src={preview} className="h-full w-auto object-contain" />
          </div>
          <div className="h-1/5 w-1/2 px-8 border-2 border-gray-500 rounded-md flex justify-center items-center">
            {!first ? "再選択" : "画像を選択"}
          </div>
        </label>
        {upFlag ? (
          <div
            className="h-1/5 w-1/2 md:h-10 md:w-1/4 px-8 border-2 border-gray-500 rounded-md flex justify-center items-center"
            onClick={buttonImageUp}
          >
            upload image
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="flex flex-col md:flex-row md:flex-wrap w-3/4 gap-y-8">
        {imageDataList.map((data) => (
          <div
            key={data.uid}
            className="flex flex-col items-center gap-2 w-full md:w-1/3"
          >
            <img
              src={data.url}
              className="w-full md:w-52 h-auto object-contain"
              alt=""
            />
            <button
              className="h-10 w-1/2 px-8 border-2 border-gray-500 rounded-md flex justify-center items-center"
              onClick={() => onClickDelete(data)}
            >
              削除
            </button>
          </div>
        ))}
      </div>

      <div
        className={
          "fixed overflow-hidden flex justify-center items-center bg-gray-100/50 transition-all ease-in-out " +
          (viewFlag
            ? "w-screen h-screen top-0 left-0"
            : "w-0 h-0 top-1/2 left-1/2")
        }
        onClick={onClickParent}
      >
        <div className="relative w-56 h-36 flex bg-white rounded-md shadow-md flex-col items-center justify-around">
          <div
            className="absolute -top-10 right-0 w-10 h-10 text-black"
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
          <span className="text-xl">本当に削除しますか？</span>
          <div className="flex flex-row justify-around items-center w-full">
            <button
              className="w-1/3 py-2 px-8 rounded-md border-2 border-red-600 flex justify-center items-center bg-red-500 text-white"
              onClick={onClickYes}
            >
              Yes
            </button>
            <button
              className="w-1/3 py-2 px-8 rounded-md border-2 border-blue-600 flex justify-center items-center bg-blue-500 text-white"
              onClick={() => setViewFlag(false)}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
