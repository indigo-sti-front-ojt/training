import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AuthUserContainer } from "../provider/AuthUserProvider";
import { UserDBContainer } from "../provider/UserDBProvider";
import { UserDBType } from "../types/UserDBType";

// 単一階層の情報の場合
export const useUserDB = () => {
  const { user } = AuthUserContainer.useContainer();
  const { setUserData, setChangeFlag, changeFlag } =
    UserDBContainer.useContainer();

  const targetTableName = "users";

  const UserDataEdit = async (data: UserDBType) => {
    const target = doc(db, targetTableName, data.uid);
    await setDoc(target, {
      photoIcon: data.photoIcon,
      nickname: data.nickname,
      singleBio: data.singleBio,
    });
    setChangeFlag(!changeFlag);
  };

  const UserDataReads = async () => {
    const target = collection(db, targetTableName);
    const dataResults = await getDocs(target);

    const tempDatas: UserDBType[] = [];
    dataResults.forEach((doc) => {
      console.log(doc.id, ":", doc.data());
      const tempData: UserDBType = {
        uid: doc.id,
        photoIcon: doc.data().photoIcon,
        nickname: doc.data().nickname,
        singleBio: doc.data().singleBio,
      };
      tempDatas.push(tempData);
    });
  };
  const UserDataRead = async (uid: string) => {
    const target = doc(db, targetTableName, uid);
    const dataResult = await getDoc(target);

    if (dataResult.data()) {
      // data 格納処理
      const tempData: UserDBType = {
        uid: user.uid,
        photoIcon: dataResult.data()?.photoIcon,
        nickname: dataResult.data()?.nickname,
        singleBio: dataResult.data()?.singleBio,
      };
      setUserData(tempData);
    } else {
      // data 登録処理
      UserDataEdit({
        uid: user.uid,
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
  };

  return {
    UserDataEdit,
    UserDataRead,
    UserDataReads,
  };
};
