import { useState } from "react";
import { createContainer } from "unstated-next";
import { SampleDBType } from "../types/SampleDBType";

const initialzeuser: SampleDBType = {
  uid: "",
  text: "",
  color: "",
};

const useSampleDBProvider = () => {
  const [sampleDatas, setSampleDatas] = useState<SampleDBType[]>([
    initialzeuser,
  ]);
  const [changeFlag, setChangeFlag] = useState<boolean>(false);

  const [editData, setEditData] = useState<SampleDBType>(initialzeuser);
  const [editFlag, setEditFlag] = useState<boolean>(false);

  return {
    sampleDatas,
    setSampleDatas,
    changeFlag,
    setChangeFlag,
    editFlag,
    setEditFlag,
    editData,
    setEditData,
  };
};

export const SampleDBContainer = createContainer(useSampleDBProvider);
