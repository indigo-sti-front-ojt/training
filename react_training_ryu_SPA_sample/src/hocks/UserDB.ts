import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useCallback } from "react";
import { db } from "../firebase";
import { AuthUserContainer } from "../provider/AuthUserProvider";
import { UserDBContainer } from "../provider/UserDBProvider";
import { UserDBType } from "../types/UserDBType";

// 単一階層の情報の場合
export const useUserDB = () => {
  const { user } = AuthUserContainer.useContainer();
  const { setUserData, setChangeFlag, changeFlag, setUserDataList } =
    UserDBContainer.useContainer();

  const targetTableName = "users";

  const UserDataEdit = async (data: UserDBType) => {
    console.log(data);

    const target = doc(db, targetTableName, data.uid);
    await updateDoc(target, {
      nickname: data.nickname,
      singleBio: data.singleBio,
    });
    setChangeFlag(!changeFlag);
  };

  const UserDataReads = useCallback(async () => {
    const target = collection(db, targetTableName);
    const dataResults = getDocs(target);

    const tempDatas: UserDBType[] = [];
    (await dataResults).forEach((doc) => {
      const tempData: UserDBType = {
        uid: doc.id,
        photoIcon: doc.data().photoIcon,
        nickname: doc.data().nickname,
        singleBio: doc.data().singleBio,
      };
      tempDatas.push(tempData);
    });
    setUserDataList(tempDatas);
  }, []);

  const UserDataRead = useCallback(async (uid: string) => {
    const target = doc(db, targetTableName, uid);
    const dataResult = getDoc(target);
    const userData = (await dataResult).data();

    if (userData) {
      // data 格納処理
      const tempData: UserDBType = {
        uid: uid,
        photoIcon: userData.photoIcon,
        nickname: userData.nickname,
        singleBio: userData.singleBio,
      };
      setUserData(tempData);
    } else {
      // data 登録処理
      UserDataEdit({
        uid: uid,
        photoIcon: user.photoIcon,
        nickname: user.nickname,
        singleBio: "",
      });
      setUserData({
        uid: user.uid,
        photoIcon: user.photoIcon,
        nickname: user.nickname,
        singleBio: "",
      });
    }
  }, []);

  return {
    UserDataEdit,
    UserDataRead,
    UserDataReads,
  };
};
