import axios from "axios";
import { UserMinInfo } from "../../../types/api/UserMinInfo";

export const usePostEventApply = () => {
  const url =
    "https://icy-mushroom-0e274e110.1.azurestaticapps.net/events_join";
  const postEventApply = async (obj: UserMinInfo) => {
    try {
      await axios.post(url, obj);
      console.log(obj, "objがpostされました");
    } catch {
      console.log("参加登録に失敗しました");
    }
  };
  return { postEventApply };
};
