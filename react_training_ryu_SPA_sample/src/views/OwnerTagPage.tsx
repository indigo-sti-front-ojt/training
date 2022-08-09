import React, { useState } from "react";
import { TagFormComponent } from "../components/TagFormComponent";
import { useTagDB } from "../hocks/TagDB";

import { TagDBContainer } from "../provider/TagDBProvider";

export const OwnerTagPage = () => {
  const { areaDataList, freeDataList } = TagDBContainer.useContainer();
  const { AreaDataEdit, FreeDataEdit } = useTagDB();

  const [viewFlagFree, setviewFlagFree] = useState<boolean>(false);
  const [viewFlagArea, setviewFlagArea] = useState<boolean>(false);

  return (
    <>
      <div>
        <h1>input area</h1>
        <button onClick={() => setviewFlagArea(true)}>編集</button>
        <div>
          {areaDataList.map((data) => (
            <div key={data.id}>
              {data.id}
              {data.text}
              {data.color}
            </div>
          ))}
        </div>
        {viewFlagArea ? (
          <div>
            <button onClick={() => setviewFlagArea(false)}>閉じる</button>
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

      <div>
        <h1>input free</h1>
        <button onClick={() => setviewFlagFree(true)}>編集</button>

        <div>
          {freeDataList.map((data) => (
            <div key={data.id}>
              {data.id}
              {data.text}
              {data.color}
            </div>
          ))}
        </div>

        <div></div>
        {viewFlagFree ? (
          <div>
            <button onClick={() => setviewFlagFree(false)}>閉じる</button>
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
