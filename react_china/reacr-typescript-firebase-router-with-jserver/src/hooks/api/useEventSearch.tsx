import { useCallback, useState } from "react";
import axios from "axios";

import { Event } from "../../types/api/Event";
//import { SearchEventList } from "../types/react-hook-form/SearchEventList";

export const useEventSearch = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [events, setEvents] = useState<Event[]>();
  const eventsUrl = "http://localhost:5000/events";
  //引数にこれを持ってきたい(data?: SearchEventList)

  // if (typeof data === "undefined") {
  //   return;
  // } else {
  //   const eventsUrl = "http://localhost:5000/events";
  // }

  const getEvents = useCallback(() => {
    (async () => {
      try {
        const resNearEvents = await axios.get<Event[]>(eventsUrl);
        setEvents(resNearEvents.data);
      } catch (error) {
        console.log("イベントが取得できません。");
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return { getEvents, loading, events };
};
