import { useCallback, useState } from "react";
import axios from "axios";

import { User } from "../../../types/api/User";

// 他のユーザーの情報を取得

export const useOthers = (user_id: string) => {
  const [othersInfo, setOthersInfo] = useState<User>();
  const mydataurl = "http://localhost:5000/users?userid=" + user_id;

  const getOthers = useCallback(() => {
    (async () => {
      try {
        const res_user = await axios.get<User>(mydataurl);
        setOthersInfo(res_user.data);
      } catch (error) {
        console.log("ユーザーが取得できません");
      }
    })();
  }, []);
  return { getOthers, othersInfo };
};
