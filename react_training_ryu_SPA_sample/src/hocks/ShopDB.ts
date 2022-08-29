import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { ShopDBContainer } from "../provider/ShopDBProvider";
import { ShopDBType } from "../types/ShopDBType";

import { format } from "date-fns";

// 単一階層の情報の場合
export const useShopDB = () => {
  const {
    setChangeFlag,
    changeFlag,
    setShopData,
    setShopDataList,
    setShopDataAll,
  } = ShopDBContainer.useContainer();

  const targetTableName = "shops";

  const ShopDataCreate = async (data: ShopDBType) => {
    const dataDoc = collection(db, targetTableName);
    await addDoc(dataDoc, {
      name: data.name,
      title: data.title,
      mainImage: data.mainImage,
      access: data.access,
      map: data.map,
      price: data.price,
      closingDay: data.closingDay,
      fromOpenToCleseTime: data.fromOpenToCleseTime,
      phoneNumber: data.phoneNumber,
      links: data.links,
      ShopLink: data.ShopLink,
      photoData: data.photoData,
      contents: data.contents,
      areaTag: data.areaTag,
      freeTag: data.freeTag,
      writer: data.writer,
      createData: data.createDate,
    });
    setChangeFlag(!changeFlag);
  };
  const ShopDataEdit = async (data: ShopDBType) => {
    const target = doc(db, targetTableName, data.uid);
    await updateDoc(target, {
      name: data.name,
      title: data.title,
      mainImage: data.mainImage,
      access: data.access,
      map: data.map,
      price: data.price,
      closingDay: data.closingDay,
      fromOpenToCleseTime: data.fromOpenToCleseTime,
      phoneNumber: data.phoneNumber,
      links: data.links,
      ShopLink: data.ShopLink,
      photoData: data.photoData,
      contents: data.contents,
      areaTag: data.areaTag,
      freeTag: data.freeTag,
    });
    setChangeFlag(!changeFlag);
  };

  const ShopDataReads_AfterLogin = async (user_uid: string) => {
    const target = query(
      collection(db, targetTableName),
      where("writer", "==", user_uid)
    );
    const dataResults = await getDocs(target);

    const tempDatas: ShopDBType[] = [];

    dataResults.forEach((doc) => {
      // console.log(doc.id, ":", doc.data());
      const data = doc.data();
      const tempData: ShopDBType = {
        uid: doc.id,
        name: data.name,
        title: data.title,
        mainImage: data.mainImage,
        map: data.map,
        access: data.access,
        price: data.price,
        closingDay: data.closingDay,
        fromOpenToCleseTime: data.fromOpenToCleseTime,
        phoneNumber: data.phoneNumber,
        links: data.links,
        ShopLink: data.ShopLink,
        photoData: data.photoData,
        contents: data.contents,
        areaTag: data.areaTag,
        freeTag: data.freeTag,
        writer: data.writer,
        createDate: data.createData,
      };

      tempDatas.push(tempData);
    });

    // sort
    tempDatas.sort(ShopDataSortProgram);

    setShopDataList(tempDatas);
  };
  const ShopDataReads_ALL = async () => {
    const tempDatas: ShopDBType[] = [];
    const target = collection(db, targetTableName);
    const dataResults = await getDocs(target);
    dataResults.forEach((doc) => {
      const data = doc.data();
      const tempData: ShopDBType = {
        uid: doc.id,
        name: data.name,
        title: data.title,
        mainImage: data.mainImage,
        map: data.map,
        access: data.access,
        price: data.price,
        closingDay: data.closingDay,
        fromOpenToCleseTime: data.fromOpenToCleseTime,
        phoneNumber: data.phoneNumber,
        links: data.links,
        ShopLink: data.ShopLink,
        photoData: data.photoData,
        contents: data.contents,
        areaTag: data.areaTag,
        freeTag: data.freeTag,
        writer: data.writer,
        createDate: data.createData,
      };
      tempDatas.push(tempData);
    });
    // sort
    tempDatas.sort(ShopDataSortProgram);
    setShopDataAll(tempDatas);
  };
  // sort program
  const ShopDataSortProgram = (
    firstObject: ShopDBType,
    secondObject: ShopDBType
  ) =>
    format(firstObject.createDate.toDate(), "yyyyMMddHHmmss") >
    format(secondObject.createDate.toDate(), "yyyyMMddHHmmss")
      ? -1
      : 1;

  const ShopDataRead = async (uid: string) => {
    const target = doc(db, targetTableName, uid);
    const dataResult = await getDoc(target);
    console.log("shopDataRead");
    const data = dataResult.data();
    const tempData: ShopDBType = {
      uid: uid,
      name: data?.name,
      title: data?.title,
      mainImage: data?.mainImage,
      map: data?.map,
      price: data?.price,
      closingDay: data?.closingDay,
      fromOpenToCleseTime: data?.fromOpenToCleseTime,
      phoneNumber: data?.phoneNumber,
      links: data?.links,
      ShopLink: data?.ShopLink,
      photoData: data?.photoData,
      contents: data?.contents,
      areaTag: data?.areaTag,
      freeTag: data?.freeTag,
      access: data?.access,
      writer: data?.writer,
      createDate: data?.createData,
    };
    setShopData(tempData);
  };
  const ShopDataDelete = async (uid: string) => {
    const target = doc(db, targetTableName, uid);
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
