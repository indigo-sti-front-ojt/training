import React, { useEffect, useState } from "react";
import { InputColorsComponent } from "../components/InputColorsComponet";
import { InputComponent } from "../components/InputComponent";
import { useTagDB } from "../hocks/TagDB";
import { TagDBContainer } from "../provider/TagDBProvider";
import { TagDBType } from "../types/TagDBType";

export const OwnerTagPage = () => {
  const { areaDataList, freeDataList } = TagDBContainer.useContainer();
  const { AreaDataEdit, FreeDataEdit } = useTagDB();
  const [areaId, setAreaId] = useState<number>(0);
  const [freeId, setFreeId] = useState<number>(0);

  const [TagEditFlag, setTagEditFlag] = useState<boolean>(false);
  const [TagViewFlag, setTagViewFlag] = useState<boolean>(false);

  const [areaDataListView, setAreaDataListView] = useState<TagDBType[]>([]);
  const [freeDataListView, setFreeDataListView] = useState<TagDBType[]>([]);

  useEffect(() => {
    const ids = areaDataList.map((obj) => obj.id);
    ids.length == 0 ? setAreaId(0) : setAreaId(Math.max(...ids) + 1);
    setAreaDataListView([...areaDataList]);
  }, [areaDataList]);

  useEffect(() => {
    const ids = freeDataList.map((obj) => obj.id);
    ids.length == 0 ? setFreeId(0) : setFreeId(Math.max(...ids) + 1);
    setFreeDataListView([...freeDataList]);
  }, [freeDataList]);

  useEffect(() => {
    if (TagEditFlag) {
      const idsFree = freeDataListView.map((obj) => obj.id);
      idsFree.length == 0 ? setFreeId(0) : setFreeId(Math.max(...idsFree) + 1);
      const idsArea = areaDataListView.map((obj) => obj.id);
      idsArea.length == 0 ? setAreaId(0) : setAreaId(Math.max(...idsArea) + 1);
    }
  }, [TagViewFlag]);

  const [areaText, setAreaText] = useState<string>("");
  const [areaColor, setAreaColor] = useState<string>("#FF0000");
  const onClickSendArea = () => {
    const temp: TagDBType = {
      id: areaId,
      text: areaText,
      color: areaColor,
    };
    setAreaDataListView([...areaDataListView, temp]);
    setAreaText("");
    setAreaColor("#FFFFFF");
    setTagEditFlag(true);
    setTagViewFlag(!TagViewFlag);
  };

  const onClickDeleteArea = (id: number) => {
    const temp = areaDataListView.filter((data) => {
      return data.id !== id;
    });
    setAreaDataListView([...temp]);
    setTagEditFlag(true);
    setTagViewFlag(!TagViewFlag);
  };

  const [freeText, setFreeText] = useState<string>("");
  const [freeColor, setFreeColor] = useState<string>("");
  const onClickSendFree = () => {
    const temp: TagDBType = {
      id: freeId,
      text: freeText,
      color: freeColor,
    };
    console.log("free", freeDataListView);
    setFreeDataListView([...freeDataListView, temp]);
    setFreeText("");
    setFreeColor("");
    setTagEditFlag(true);
    setTagViewFlag(!TagViewFlag);
  };

  const onClickDeleteFree = (id: number) => {
    const temp = freeDataListView.filter((data) => {
      return data.id !== id;
    });
    setFreeDataListView(temp);
    setTagEditFlag(true);
    setTagViewFlag(!TagViewFlag);
  };

  const onClickSendFirebase = () => {
    setTagEditFlag(false);
    AreaDataEdit([...areaDataListView]);
    FreeDataEdit([...freeDataListView]);
  };
  const view_button = TagEditFlag ? (
    <button onClick={onClickSendFirebase}>確定</button>
  ) : (
    ""
  );
  return (
    <>
      <div>
        <div>{view_button}</div>
        <h1>input area</h1>
        <div>
          <InputComponent text={areaText} setText={setAreaText} />
          <InputColorsComponent text={areaColor} setText={setAreaColor} />
          <button onClick={onClickSendArea}>新規</button>
        </div>
        <div>
          {areaDataListView.map((data) => (
            <div key={data.id}>
              {data.id}
              {data.text}
              {data.color}
              <button onClick={() => onClickDeleteArea(data.id)}>削除</button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h1>input free</h1>
        <div>
          <InputComponent text={freeText} setText={setFreeText} />
          <InputColorsComponent text={freeColor} setText={setFreeColor} />
          <button onClick={onClickSendFree}>新規</button>
        </div>
        <div>
          {freeDataListView.map((data) => (
            <div key={data.id}>
              {data.id}
              {data.text}
              {data.color}
              <button onClick={() => onClickDeleteFree(data.id)}>削除</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
