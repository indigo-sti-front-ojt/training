import React, { useEffect, useState } from "react";
import { TagFormComponent } from "../components/TagFormComponent";
import { useTagDB } from "../hocks/TagDB";
import { TagComponent } from "../designComponents/TagComponent";

import { TagDBContainer } from "../provider/TagDBProvider";

export const OwnerTagPage = () => {
  const { areaDataList, freeDataList } = TagDBContainer.useContainer();
  const { AreaDataEdit, FreeDataEdit } = useTagDB();

  const [viewFlagFree, setviewFlagFree] = useState<boolean>(false);
  const [viewFlagArea, setviewFlagArea] = useState<boolean>(false);

  const onClickParent = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.currentTarget === e.target) {
      setviewFlagArea(false);
      setviewFlagFree(false);
    }
  };
  const onClickCross = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setviewFlagArea(false);
    setviewFlagFree(false);
  };

  useEffect(() => {
    return () => {
      setviewFlagArea(false);
      setviewFlagFree(false);
    };
  }, []);
  return (
    <>
      <div className="w-full h-16 flex justify-center items-center">
        <span className="text-2xl border-b-2 border-black px-20">タグ一覧</span>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-x-4 gap-y-10">
        <div className="w-5/6 md:w-full md:h-full p-2 shadow-md flex flex-col gap-y-2">
          <div className="flex flex-row w-full justify-between items-center">
            <span className="flex justify-start items-center border-b-2 border-black px-3 h-10">
              Areaタグ
            </span>
            <button
              className="py-2 px-8 mx-2 rounded-md border border-black"
              onClick={() => setviewFlagArea(true)}
            >
              編集
            </button>
          </div>
          <div className="flex flex-row flex-wrap gap-y-2">
            {areaDataList.map((data) => (
              <TagComponent data={data} key={data.id} />
            ))}
          </div>
        </div>
        <div className="w-5/6 md:w-full md:h-full p-2 shadow-md flex flex-col gap-y-2">
          <div className="flex flex-row w-full justify-between items-center">
            <span className="flex justify-start items-center border-b-2 border-black px-3 h-10">
              Freeタグ
            </span>
            <button
              className="py-2 px-8 mx-2 rounded-md border border-black"
              onClick={() => setviewFlagFree(true)}
            >
              編集
            </button>
          </div>

          <div className="flex flex-row flex-wrap gap-y-2">
            {freeDataList.map((data) => (
              <TagComponent data={data} key={data.id} />
            ))}
          </div>
        </div>
      </div>

      <div
        className={
          "fixed overflow-hidden flex justify-center items-center bg-gray-600/50 transition-all " +
          (viewFlagArea
            ? "w-screen h-screen top-0 left-0"
            : "w-0 h-0 top-1/2 left-1/2")
        }
        onClick={onClickParent}
      >
        {viewFlagArea ? (
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
            <TagFormComponent
              data={areaDataList}
              sendData={AreaDataEdit}
              setVisibleFlag={setviewFlagArea}
            />
          </div>
        ) : (
          ""
        )}
      </div>

      <div
        className={
          "fixed overflow-hidden flex justify-center items-center bg-gray-500/50 transition-all " +
          (viewFlagFree
            ? "w-screen h-screen top-0 left-0"
            : "w-0 h-0 top-1/2 left-1/2")
        }
        onClick={onClickParent}
      >
        {viewFlagFree ? (
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
            <TagFormComponent
              data={freeDataList}
              sendData={FreeDataEdit}
              setVisibleFlag={setviewFlagFree}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
