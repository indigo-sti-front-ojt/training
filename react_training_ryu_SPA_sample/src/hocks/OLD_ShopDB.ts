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
import { ShopDBContainer } from "../provider/ShopDBProvider";
import { UserDBContainer } from "../provider/UserDBProvider";
import { ShopDBType } from "../types/ShopDBType";
import { UserDBType } from "../types/UserDBType";

// 複数階層の情報の場合
export const useShopDB = () => {
  const {
    setChangeFlag,
    changeFlag,
    setShopData,
    setShopDataList,
    setShopDataAll,
  } = ShopDBContainer.useContainer();

  const { userDataList } = UserDBContainer.useContainer();
  const targetTableName = "users";
  const targetSubTableName = "shops";

  const ShopDataCreate = async (data: ShopDBType, user_uid: string) => {
    const dataDoc = collection(
      db,
      targetTableName,
      user_uid,
      targetSubTableName
    );
    await addDoc(dataDoc, {});
    setChangeFlag(!changeFlag);
  };
  const ShopDataEdit = async (data: ShopDBType, user_uid: string) => {
    const target = doc(
      db,
      targetTableName,
      user_uid,
      targetSubTableName,
      data.uid
    );
    await setDoc(target, {});
    setChangeFlag(!changeFlag);
  };

  const ShopDataReads_AfterLogin = async (user_id: string) => {
    const target = collection(db, targetTableName, user_id, targetSubTableName);
    const dataResults = await getDocs(target);
    const tempDatas: ShopDBType[] = [];
    dataResults.forEach((doc) => {
      console.log(doc.id, ":", doc.data());
      const tempData: ShopDBType = {
        uid: doc.id,
        name: doc.data().name,
        writer: doc.data().writer,
      };
      tempDatas.push(tempData);
    });
    setShopDataList(tempDatas);
  };
  const ShopDataReads_ALL = async () => {
    const tempDatas: ShopDBType[] = [];
    await userDataList.forEach(async (user: UserDBType) => {
      const target = collection(
        db,
        targetTableName,
        user.uid,
        targetSubTableName
      );
      const dataResults = await getDocs(target);
      dataResults.forEach((doc) => {
        const data = doc.data();
        const tempData: ShopDBType = {
          uid: doc.id,
          name: data.name,
          price: data.price,
          closingDay: data.closingDay,
          fromOpenToCleseTime: data.fromOpenToCleseTime,
          phoneNumber: data.phoneNumber,
          links: data.links,
          ShopLink: data.ShopLink,
          instagramLink: data.instagramLink,
          photoData: data.photoData,
          contents: data.contents,
          areaTag: data.areaTag,
          freeTag: data.freeTag,
          writer: data.writer,
        };
        tempDatas.push(tempData);
      });
    });
    setShopDataAll(tempDatas);
  };

  const ShopDataRead = async (uid: string, user_uid: string) => {
    const target = doc(db, targetTableName, user_uid, targetSubTableName, uid);
    const dataResult = await getDoc(target);
    console.log(typeof dataResult);
    const data = dataResult.data();
    const tempData: ShopDBType = {
      uid: uid,
      name: data?.name,
      price: data?.price,
      closingDay: data?.closingDay,
      fromOpenToCleseTime: data?.fromOpenToCleseTime,
      phoneNumber: data?.phoneNumber,
      links: data?.links,
      ShopLink: data?.ShopLink,
      instagramLink: data?.instagramLink,
      photoData: data?.photoData,
      contents: data?.contents,
      areaTag: data?.areaTag,
      freeTag: data?.freeTag,
      writer: data?.writer,
    };
    setShopData(tempData);
  };
  const ShopDataDelete = async (uid: string, user_id: string) => {
    const target = doc(db, targetTableName, user_id, targetSubTableName, uid);
    await deleteDoc(target);
    setChangeFlag(!changeFlag);
  };

  return {
    ShopDataCreate,
    ShopDataEdit,
    ShopDataRead,
    ShopDataReads_AfterLogin,
    ShopDataReads_ALL,
    ShopDataDelete,
  };
};
