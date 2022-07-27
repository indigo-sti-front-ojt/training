import { useState } from "react";
import { createContainer } from "unstated-next";
import { TagDBType } from "../types/TagDBType";

const useTagDBProvider = () => {
  const [TagChangeFlag, setTagChangeFlag] = useState<boolean>(false);
  const [areaDataList, setAreaDataList] = useState<TagDBType[]>([]);
  const [freeDataList, setFreeDataList] = useState<TagDBType[]>([]);

  return {
    TagChangeFlag,
    setTagChangeFlag,
    areaDataList,
    setAreaDataList,
    freeDataList,
    setFreeDataList,
  };
};

export const TagDBContainer = createContainer(useTagDBProvider);
