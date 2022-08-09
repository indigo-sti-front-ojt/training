import axios from "axios";
import { UserMinInfo } from "../../../types/api/UserMinInfo";

export const usePostCreate = () => {
  const postCreate = async (url: string, obj: UserMinInfo) => {
    try {
      await axios.post(url, obj);
      console.log(obj,"aaaaaa");
    } catch {
      console.log("error");
    }
  };
  return { postCreate };
};
