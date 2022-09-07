import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useCallback } from "react";
import { db } from "../firebase";
import { LodingContainer } from "../provider/LoadingProvider";
import { TagDBContainer } from "../provider/TagDBProvider";
import { TagDBType } from "../types/TagDBType";

// 単一階層の情報の場合
export const useFreeTagDB = () => {
  const { setFreeDataList, setTagChangeFlag, TagChangeFlag } =
    TagDBContainer.useContainer();
  const { setLoging } = LodingContainer.useContainer();
  const targetTableName = "FreeTags";

  const FreeDataAdd = async (data: TagDBType) => {
    const dataDoc = collection(db, targetTableName);
    await addDoc(dataDoc, {
      text: data.text,
      color: data.color,
    });
    setTagChangeFlag(!TagChangeFlag);
  };

  const FreeDataEdit = async (data: TagDBType) => {
    await setLoging(true);
    const target = doc(db, targetTableName, data.id);
    await updateDoc(target, { text: data.text, color: data.color });
    setTagChangeFlag(!TagChangeFlag);
    setLoging(false);
  };
  const FreeDataDelete = async (data: TagDBType) => {
    await setLoging(true);
    const target = doc(db, targetTableName, data.id);
    await deleteDoc(target);
    setTagChangeFlag(!TagChangeFlag);
    setLoging(false);
  };

  const FreeDataReads = useCallback(async () => {
    const targetFree = collection(db, targetTableName);
    const dataFreeResults = getDocs(targetFree);
    const tempFreeDatas: TagDBType[] = [];
    (await dataFreeResults).forEach((doc) => {
      const data = doc.data();
      const temp: TagDBType = {
        id: doc.id,
        text: data.text,
        color: data.color,
      };
      tempFreeDatas.push(temp);
    });
    setFreeDataList(tempFreeDatas);
  }, []);

  return {
    FreeDataReads,
    FreeDataEdit,
    FreeDataAdd,
    FreeDataDelete,
  };
};
