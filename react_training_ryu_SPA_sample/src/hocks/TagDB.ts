import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { LodingContainer } from "../provider/LoadingProvider";
import { TagDBContainer } from "../provider/TagDBProvider";
import { TagDBType } from "../types/TagDBType";

// 単一階層の情報の場合
export const useTagDB = () => {
  const { setAreaDataList, setFreeDataList, setTagChangeFlag, TagChangeFlag } =
    TagDBContainer.useContainer();
  const { setLoging } = LodingContainer.useContainer();
  const targetTableName = "tags";

  const AreaDataEdit = async (data: TagDBType[]) => {
    await setLoging(true);
    const target = doc(db, targetTableName, "Area");
    await setDoc(target, { data });
    await setTagChangeFlag(!TagChangeFlag);
    await setLoging(false);
  };
  const FreeDataEdit = async (data: TagDBType[]) => {
    await setLoging(true);
    const target = doc(db, targetTableName, "Free");
    await setDoc(target, { data });
    await setTagChangeFlag(!TagChangeFlag);
    await setLoging(false);
  };

  const TagDataReads = async () => {
    const targetArea = doc(db, targetTableName, "Area");
    const dataAreaResults = await getDoc(targetArea);
    if (dataAreaResults.data()?.data == undefined) {
      setAreaDataList([]);
    } else {
      const areaData = dataAreaResults.data()?.data.map((data: TagDBType) => {
        return { id: data.id, text: data.text, color: data.color };
      });
      setAreaDataList(areaData);
    }

    const targetFree = doc(db, targetTableName, "Free");
    const dataFreeResults = await getDoc(targetFree);

    if (dataFreeResults.data()?.data == undefined) {
      setFreeDataList([]);
    } else {
      const freeData = dataFreeResults.data()?.data.map((data: TagDBType) => {
        return { id: data.id, text: data.text, color: data.color };
      });
      setFreeDataList(freeData);
    }
  };

  return { TagDataReads, AreaDataEdit, FreeDataEdit };
};
