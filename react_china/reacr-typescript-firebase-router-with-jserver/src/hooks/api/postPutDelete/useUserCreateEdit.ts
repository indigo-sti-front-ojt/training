import axios from "axios";
import { User } from "../../../types/api/User";

export const useUserCreateEdit = () => {
  const url = "https://icy-mushroom-0e274e110.1.azurestaticapps.net/api/users";
  const userCreateEdit = async (method: string, obj: User) => {
    if (method === "post") {
      try {
        await axios.post(url, obj);
        console.log("新規ユーザーを作成しました");
        return true;
      } catch {
        console.log("新規ユーザーの作成に失敗しました");
        return false;
      }
    } else if (method === "put") {
      try {
        await axios.put(url, obj);
        console.log("ユーザーの情報を編集しました");
        return true;
      } catch {
        console.log("ユーザーの情報編集に失敗しました");
        return false;
      }
    }
  };
  return { userCreateEdit };
};
