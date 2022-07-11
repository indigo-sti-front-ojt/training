/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useCallback, useState } from "react";

import { User } from "../types/api/User";
import { useMessage } from "./useMessage";

export const useAllusers = () => {
  const {showMessage} =useMessage();
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<Array<User>>([]);

  //thenを使った書き方

  // const getUsers = useCallback(() => {
  //   setLoading(true);

  //   axios
  //     .get<Array<User>>("https://jsonplaceholder.typicode.com/users/")
  //     .then((res) => {
  //       setUsers(res.data);
  //     })
  //     .catch(() => showMessage({ title: "ユーザーが取得できません", status: "error" })
  //     )
  //     .finally(() => setLoading(false));
  // }, []);


  // async/await構文を使った書き方
  const getUsers = useCallback(()=>{
    (async() => {
      try{
        const res = await axios.get<Array<User>>("https://jsonplaceholder.typicode.com/users/");
        setUsers(res.data);
      }catch(error){
        showMessage({ title: "ユーザーが取得できません", status: "error" });
      }finally{
        setLoading(false);
      }
    })()
  },[]);

  return { getUsers,loading,users };
};

