import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { LodingContainer } from "../provider/LoadingProvider";
import { TagDBContainer } from "../provider/TagDBProvider";
import { TagDBType } from "../types/TagDBType";

// 単一階層の情報の場合
export const useTagDB = () => {
  const { setAreaDataList, setFreeDataList, setTagChangeFlag, TagChangeFlag } =
    TagDBContainer.useContainer();
  const { setLoging } = LodingContainer.useContainer();
  const targetTableNameArea = "Areatags";
  const targetTableNameFree = "Freetags";

  const AreaDataAdd = async (data: TagDBType) => {
    const dataDoc = collection(db, targetTableNameArea);
    await addDoc(dataDoc, {
      text: data.text,
      color: data.color,
    });
    setTagChangeFlag(!TagChangeFlag);
  };

  const FreeDataAdd = async (data: TagDBType) => {
    const dataDoc = collection(db, targetTableNameFree);
    await addDoc(dataDoc, {
      text: data.text,
      color: data.color,
    });
    console.log("send");

    setTagChangeFlag(!TagChangeFlag);
  };

  const AreaDataEdit = async (data: TagDBType) => {
    await setLoging(true);
    const target = doc(db, targetTableNameArea, data.id);
    await setDoc(target, { text: data.text, color: data.color });
    setTagChangeFlag(!TagChangeFlag);
    setLoging(false);
  };
  const FreeDataEdit = async (data: TagDBType) => {
    await setLoging(true);
    const target = doc(db, targetTableNameFree, data.id);
    await setDoc(target, { text: data.text, color: data.color });
    setTagChangeFlag(!TagChangeFlag);
    setLoging(false);
  };
  const AreaDataDelete = async (data: TagDBType) => {
    await setLoging(true);
    const target = doc(db, targetTableNameArea, data.id);
    await deleteDoc(target);
    setTagChangeFlag(!TagChangeFlag);
    setLoging(false);
  };
  const FreeDataDelete = async (data: TagDBType) => {
    await setLoging(true);
    const target = doc(db, targetTableNameFree, data.id);
    await deleteDoc(target);
    setTagChangeFlag(!TagChangeFlag);
    setLoging(false);
  };

  const TagDataReads = async () => {
    const targetArea = collection(db, targetTableNameArea);
    const dataAreaResults = await getDocs(targetArea);
    const tempAreaDatas: TagDBType[] = [];
    dataAreaResults.forEach((doc) => {
      const data = doc.data();
      const temp: TagDBType = {
        id: doc.id,
        text: data.text,
        color: data.color,
      };
      tempAreaDatas.push(temp);
    });
    setAreaDataList(tempAreaDatas);

    const targetFree = collection(db, targetTableNameFree);
    const dataFreeResults = await getDocs(targetFree);
    const tempFreeDatas: TagDBType[] = [];
    dataFreeResults.forEach((doc) => {
      const data = doc.data();
      const temp: TagDBType = {
        id: doc.id,
        text: data.text,
        color: data.color,
      };
      tempFreeDatas.push(temp);
    });
    setFreeDataList(tempFreeDatas);
  };

  return {
    TagDataReads,
    AreaDataEdit,
    FreeDataEdit,
    AreaDataAdd,
    FreeDataAdd,
    AreaDataDelete,
    FreeDataDelete,
  };
};
