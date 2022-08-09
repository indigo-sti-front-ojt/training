import { useCallback, useState } from "react";
import axios from "axios";

import { User } from "../../../types/api/User";

export const useUser = (userID: string | undefined) => {
  const [userLoading, setUserLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User>();
  const mydataurl = "http://localhost:5000/users?userid=" + userID;

  const getUser = useCallback(() => {
    (async () => {
      try {
        const res_user = await axios.get<User>(mydataurl);
        setUser(res_user.data);
      } catch (error) {
        console.log("ユーザーが取得できません");
      } finally {
        setUserLoading(false);
      }
    })();
  }, []);
  return { getUser, userLoading, user };
};
