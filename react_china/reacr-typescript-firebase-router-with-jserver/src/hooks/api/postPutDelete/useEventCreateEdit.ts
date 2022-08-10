import axios from "axios";

import { Event } from "../../../types/api/Event";

export const useEventCreateEdit = () => {
  const url = "https://icy-mushroom-0e274e110.1.azurestaticapps.net/events";
  const eventCreateEdit = async (method: string, obj: Event) => {
    if (method === "post") {
      try {
        await axios.post(url, obj);
        console.log(obj, "createEventPost Success");
      } catch {
        console.log("イベント新規作成エラー");
      }
    } else if (method === "put") {
      try {
        await axios.put(url, obj);
        console.log(obj, "createEventPost Success");
      } catch {
        console.log("イベント編集エラー");
      }
    } else {
      console.log("正しいmethodを引数に入れてください");
    }
  };
  return { eventCreateEdit };
};
