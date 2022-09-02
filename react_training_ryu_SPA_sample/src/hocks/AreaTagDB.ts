import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { LodingContainer } from "../provider/LoadingProvider";
import { TagDBContainer } from "../provider/TagDBProvider";
import { TagDBType } from "../types/TagDBType";

// 単一階層の情報の場合
export const useAreaTagDB = () => {
  const { setAreaDataList, setTagChangeFlag, TagChangeFlag } =
    TagDBContainer.useContainer();
  const { setLoging } = LodingContainer.useContainer();
  const targetTableName = "AreaTags";

  const AreaDataAdd = async (data: TagDBType) => {
    const dataDoc = collection(db, targetTableName);
    await addDoc(dataDoc, {
      text: data.text,
      color: data.color,
    });
    setTagChangeFlag(!TagChangeFlag);
  };

  const AreaDataEdit = async (data: TagDBType) => {
    await setLoging(true);
    const target = doc(db, targetTableName, data.id);
    await updateDoc(target, { text: data.text, color: data.color });
    setTagChangeFlag(!TagChangeFlag);
    setLoging(false);
  };
  const AreaDataDelete = async (data: TagDBType) => {
    await setLoging(true);
    const target = doc(db, targetTableName, data.id);
    await deleteDoc(target);
    setTagChangeFlag(!TagChangeFlag);
    setLoging(false);
  };

  const AreaDataReads = async () => {
    const targetArea = collection(db, targetTableName);
    const dataAreaResults = getDocs(targetArea);
    const tempAreaDatas: TagDBType[] = [];
    (await dataAreaResults).forEach((doc) => {
      const data = doc.data();
      const temp: TagDBType = {
        id: doc.id,
        text: data.text,
        color: data.color,
      };
      tempAreaDatas.push(temp);
    });
    setAreaDataList(tempAreaDatas);
  };

  return {
    AreaDataReads,
    AreaDataEdit,
    AreaDataAdd,
    AreaDataDelete,
  };
};
