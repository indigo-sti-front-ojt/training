import { useCallback, useState } from "react";
import axios from "axios";

import { Event } from "../types/api/Event";

export const useEventHome = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [nearEvents, setNearEvents] = useState<Event[]>();
  const [tagEvents, setTagEvents] = useState<Event[]>();
  const latastEventsUrl = "http://localhost:5000/events";
  // http://localhost:5000/events?num=3?
  const tagEventsUrl = "http://localhost:5000/events";
  // http://localhost:5000/events?tagid=1+2

  const getEvents = useCallback(() => {
    (async () => {
      try {
        const resNearEvents = await axios.get<Event[]>(latastEventsUrl);
        setNearEvents(resNearEvents.data);
        const resTagEvents = await axios.get<Event[]>(tagEventsUrl);
        setTagEvents(resTagEvents.data);
      } catch (error) {
        console.log("イベントが取得できません。");
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return { getEvents, loading, nearEvents,tagEvents };
};
