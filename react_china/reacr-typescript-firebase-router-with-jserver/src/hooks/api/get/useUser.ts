import { useState } from "react";
import axios from "axios";

import { User } from "../../../types/api/User";
import { useUserInfoContext } from "../../../context/UserInfoContext";

// 自分の情報を取得しコンテキストにセット

export const useUser = () => {
  const { setUserInfo, setIsUserChecked } = useUserInfoContext();

  const [userTempInfo, setUserTempInfo] = useState<User>();

  const getUser = async (user_id: string) => {
    try {
      const res_user = await axios.get<User>(
        "https://icy-mushroom-0e274e110.1.azurestaticapps.net/api/users?userid=" +
          user_id
      );
      setUserInfo(res_user.data);
      console.log(res_user.data);
      setUserTempInfo(res_user.data);
      setIsUserChecked(true);
      // return { resUser: { isUserChecked: true, res_user } };
      return true;
    } catch (error) {
      console.log("ユーザーが取得できません");
      // return { resUser: { isUserChecked: true } };
      return false;
    }
  };
  return { getUser, userTempInfo };
};
