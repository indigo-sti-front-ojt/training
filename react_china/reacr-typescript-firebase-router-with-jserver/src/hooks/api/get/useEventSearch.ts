import { useCallback, useState } from "react";
import axios from "axios";

import { Event } from "../../../types/api/Event";
import { SearchEventList } from "../../../types/react-hook-form/SearchEventList";

export const useEventSearch = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [events, setEvents] = useState<Event[]>();

  const getEvents = useCallback((data?: SearchEventList) => {
    const tags_query: Array<number | undefined> | undefined = data?.tags?.map(
      (value) => value.id
    );
    const eventsUrl =
      "http://localhost:5000/events?tagid=" +
      tags_query +
      "?badget=" +
      data?.badget +
      "?minguest=" +
      data?.minguest +
      "?maxguest=" +
      data?.maxguest +
      "?fromdate=" +
      data?.fromdate +
      "?todate=" +
      data?.todate +
      "?num=" +
      data?.num ?? "";
    console.log(eventsUrl);
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
