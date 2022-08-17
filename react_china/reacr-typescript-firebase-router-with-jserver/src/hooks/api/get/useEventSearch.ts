import { useCallback } from "react";
import axios from "axios";

import { Event } from "../../../types/api/Event";
import { SearchEventList } from "../../../types/react-hook-form/SearchEventList";

export const useEventSearch = () => {
  const getEvents = useCallback(async (data?: SearchEventList) => {
    const tags_arr: Array<number | undefined> | undefined = data?.tags?.map(
      (value) => value.tag_id
    );

    let tags = "";
    if (tags_arr) {
      tags = "?tagid=" + tags_arr[0];
      for (let i = 1; i < tags_arr.length; i++) {
        tags = tags + "+" + tags_arr[i];
      }
    }

    let tagsQuery = "";
    if (data?.tags) {
      tagsQuery = `?tagid=${tags}`;
    }

    let budgetQuery = "";
    if (data?.budget) {
      budgetQuery = `?budget=${data?.budget}`;
    }

    let minguestQuery = "";
    if (data?.minguest) {
      minguestQuery = `?minguest=${data?.minguest}`;
    }

    let maxguestQuery = "";
    if (data?.maxguest) {
      maxguestQuery = `?minguest=${data?.maxguest}`;
    }

    let fromdateQuery = "";
    if (data?.fromdate) {
      fromdateQuery = `?fromdate=${data?.fromdate}`;
    }

    let todateQuery = "";
    if (data?.todate) {
      todateQuery = `?todate=${data?.todate}`;
    }

    let numQuery = "";
    if (data?.num) {
      numQuery = `?num=${data?.num}`;
    }

    const eventsUrl =
      "https://icy-mushroom-0e274e110.1.azurestaticapps.net/api/events" +
      tagsQuery +
      budgetQuery +
      minguestQuery +
      maxguestQuery +
      fromdateQuery +
      todateQuery +
      numQuery;
    console.log(eventsUrl);

    try {
      const resNearEvents = await axios.get<Event[]>(eventsUrl);
      return resNearEvents.data;
    } catch (error) {
      console.log("イベントが取得できません。");
    }
  }, []);

  return { getEvents };
};
