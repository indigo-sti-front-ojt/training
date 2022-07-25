import React, { useEffect, useState } from "react";
import { InputComponent } from "../components/InputComponent";
import { useTagDB } from "../hocks/TagDB";
import { TagDBContainer } from "../provider/TagDBProvider";
import { TagDBType } from "../types/TagDBType";

export const OwnerTagPage = () => {
  const { areaDataList, freeDataList } = TagDBContainer.useContainer();
  const { AreaDataEdit, FreeDataEdit } = useTagDB();
  const [areaId, setAreaId] = useState<number>(0);
  const [freeId, setFreeId] = useState<number>(0);
  useEffect(() => {
    const ids = areaDataList.map((obj) => obj.id);
    ids.length == 0 ? setAreaId(0) : setAreaId(Math.max(...ids) + 1);
  }, [areaDataList]);
  useEffect(() => {
    const ids = freeDataList.map((obj) => obj.id);
    ids.length == 0 ? setFreeId(0) : setFreeId(Math.max(...ids) + 1);
  }, [freeDataList]);

  const [areaText, setAreaText] = useState<string>("");
  const [areaColor, setAreaColor] = useState<string>("");
  const onClickSendArea = () => {
    console.log("area:", areaId);
    const temp: TagDBType = {
      id: areaId,
      text: areaText,
      color: areaColor,
    };
    console.log("area", areaDataList);

    AreaDataEdit([...areaDataList, temp]);
    setAreaText("");
    setAreaColor("");
  };

  const [freeText, setFreeText] = useState<string>("");
  const [freeColor, setFreeColor] = useState<string>("");
  const onClickSendFree = () => {
    console.log("free:", freeId);
    const temp: TagDBType = {
      id: freeId,
      text: freeText,
      color: freeColor,
    };
    console.log("free", freeDataList);
    FreeDataEdit([...freeDataList, temp]);
    setFreeText("");
    setFreeColor("");
  };

  return (
    <>
      <div>
        <h1>input area</h1>
        <div>
          <InputComponent text={areaText} setText={setAreaText} />
          <InputComponent text={areaColor} setText={setAreaColor} />
          <button onClick={onClickSendArea}>新規</button>
        </div>
        <div>
          {areaDataList.map((data) => (
            <div key={data.id}>
              {data.id}
              {data.text}
              {data.color}
            </div>
          ))}
        </div>
      </div>
      <div>tags</div>
      <div>
        <h1>input free</h1>
        <div>
          <InputComponent text={freeText} setText={setFreeText} />
          <InputComponent text={freeColor} setText={setFreeColor} />
          <button onClick={onClickSendFree}>新規</button>
        </div>
        <div>
          {freeDataList.map((data) => (
            <div key={data.id}>
              {data.id}
              {data.text}
              {data.color}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
