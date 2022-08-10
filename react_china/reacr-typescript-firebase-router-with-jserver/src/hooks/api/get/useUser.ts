import { useCallback } from "react";
import axios from "axios";

import { User } from "../../../types/api/User";
import { useUserInfoContext } from "../../../context/UserInfoContext";

// 自分の情報を取得しコンテキストにセット

export const useUser = () => {
  const { setUserInfo } = useUserInfoContext();

  const getUser = useCallback((user_id: string | undefined) => {
    (async () => {
      try {
        const res_user = await axios.get<User>(
          "http://localhost:5000/users?userid=" + user_id
        );
        setUserInfo(res_user.data);
        console.log(res_user.data);
      } catch (error) {
        console.log("ユーザーが取得できません");
      }
    })();
  }, []);
  return { getUser };
};
