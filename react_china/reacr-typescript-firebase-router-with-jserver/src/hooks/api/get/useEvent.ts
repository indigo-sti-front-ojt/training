import { useCallback, useState } from "react";
import axios from "axios";

import { Event } from "../../../types/api/Event";
//import { SearchEventList } from "../types/react-hook-form/SearchEventList";

export const useEvent = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [event, setEvent] = useState<Event>();
  const eventUrl = "http://localhost:5000/events?eventid=1";

  const getEvent = useCallback(() => {
    (async () => {
      try {
        const res = await axios.get<Event>(eventUrl);
        setEvent(res.data);
      } catch (error) {
        console.log("イベントが取得できません。");
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return { getEvent, loading, event };
};
