/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useCallback, useState } from "react";

import { User } from "../types/api/User";
import { useMessage } from "./useMessage";

export const useAllusers = () => {
  const {showMessage} =useMessage();
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<Array<User>>([]);

  const getUsers = useCallback(() => {
    setLoading(true);

    axios
      .get<Array<User>>("https://jsonplaceholder.typicode.com/users/")
      .then((res) => {
        setUsers(res.data)
      })
      .catch(() =>
        showMessage({ title: "ユーザーが取得できません", status: "error" })
      )
      .finally(() => setLoading(false));
  }, []);
  return { getUsers,loading,users };
};
