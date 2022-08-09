import { useCallback, useState } from "react";
import axios from "axios";

import { Event } from "../../../types/api/Event";
//import { useUser } from "./useUser";

export const useEventHome = () => {
  // const [tagsQuery, setTagsQuery] = useState("");
  // const tagsID = [0, 1];
  // if (tagsID) {
  //   let tags: string | undefined = "?num=3?tagid=" + tagsID[0]?.toString(10);
  //   for (let i = 1; i < tagsID?.length; i++) {
  //     tags = tags + "+" + tagsID[i]?.toString(10);
  //   }
  //   setTagsQuery(tags);
  // }

  const [homeEventsLoading, setHomeEventsLoading] = useState<boolean>(false);
  const [nearEvents, setNearEvents] = useState<Event[]>();
  const [tagEvents, setTagEvents] = useState<Event[]>();

  const latastEventsUrl = "http://localhost:5000/events?num=3";
  // const tagEventsUrl = "http://localhost:5000/events" + tagsQuery;
  // console.log(tagsQuery);

  const getHomeEvents = useCallback(() => {
    (async () => {
      try {
        const resNearEvents = await axios.get<Event[]>(latastEventsUrl);
        setNearEvents(resNearEvents.data);
        console.log("イベントを取得したよ" + latastEventsUrl);
        // const resTagEvents = await axios.get<Event[]>(tagEventsUrl);
        // setTagEvents(resTagEvents.data);
        // console.log(tagEventsUrl);
      } catch (error) {
        console.log("イベントが取得できません。");
      } finally {
        setHomeEventsLoading(false);
      }
    })();
  }, []);
  return { getHomeEvents, homeEventsLoading, nearEvents, tagEvents };
};
