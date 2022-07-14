import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { SampleDBContainer } from "../provider/SampleDBProvider";
import { SampleDBType } from "../types/SampleDBType";

// 単一階層の情報の場合
export const useSampleDB = () => {
  const { setSampleDatas, setChangeFlag, changeFlag } =
    SampleDBContainer.useContainer();
  const targetTableName = "tests";

  const TestDataCreate = async (data: SampleDBType) => {
    const dataDoc = collection(db, targetTableName);
    await addDoc(dataDoc, { text: data.text, color: data.color });
    setChangeFlag(!changeFlag);
  };
  const TestDataEdit = async (data: SampleDBType) => {
    const target = doc(db, targetTableName, data.uid);
    await setDoc(target, { text: data.text, color: data.color });
    setChangeFlag(!changeFlag);
  };

  const TestDataReads = async () => {
    const target = collection(db, targetTableName);
    const dataResults = await getDocs(target);

    const tempDatas: SampleDBType[] = [];
    dataResults.forEach((doc) => {
      console.log(doc.id, ":", doc.data());
      const tempData: SampleDBType = {
        uid: doc.id,
        text: doc.data().text,
        color: doc.data().color,
      };
      tempDatas.push(tempData);
    });
    setSampleDatas(tempDatas);
  };
  const TestDataRead = async (uid: string) => {
    const target = doc(db, targetTableName, uid);
    const dataResult = await getDoc(target);
    console.log(typeof dataResult);
    console.log(dataResult);
  };
  const TestDataDelete = async (uid: string) => {
    const target = doc(db, targetTableName, uid);
    await deleteDoc(target);
    setChangeFlag(!changeFlag);
  };

  return {
    TestDataCreate,
    TestDataEdit,
    TestDataRead,
    TestDataReads,
    TestDataDelete,
  };
};
