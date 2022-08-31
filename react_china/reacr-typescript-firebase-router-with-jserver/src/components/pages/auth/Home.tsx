import React, { FC, useEffect, useState } from "react";

import { CardLists } from "../../organisms/events/CardLists";
import { LinkToEventSearch } from "../../organisms/home/LinkToEventSearch";
import { GenreSearchCard } from "../../organisms/home/GenreSearchCard";
import { CreateNewEventButton } from "../../atoms/buttons/CreateNewEventButton";
import { useUserInfoContext } from "../../../context/UserInfoContext";
import { useEventSearch } from "../../../hooks/api/get/useEventSearch";
import { useEvents } from "../../../hooks/api/get/useEvents";
import { Event } from "../../../types/api/Event";

export const Home: FC = () => {
  const { userInfo } = useUserInfoContext();
  const { getSearchEvents } = useEventSearch();
  const { getEvents } = useEvents();

  const tagsid: Array<number> | undefined = userInfo?.user_tags?.map(
    (value) => value.tag_id
  );

  // const data = {};
  const data_tags = {
    tagsid: tagsid,
  };

  const [nearEvents, setNearEvents] = useState<Event[]>();
  const [tagEvents, setTagEvents] = useState<Event[]>();

  useEffect(() => {
    const readData = async () => {
      const event1 = await getEvents();
      setNearEvents(event1);
      console.log("events", event1);

      const tagEvents = await getSearchEvents(data_tags);
      setTagEvents(tagEvents);
      console.log("tagEvents", tagEvents);
    };
    readData();
  }, []);

  return (
    <>
      <CreateNewEventButton />

      <LinkToEventSearch />

      {/* <h2>ジャンルから探す</h2> */}
      {/* <GenreSearchCard tag_id="2" tag_name="飲み会" />
      <GenreSearchCard tag_id="4" tag_name="ゲーム" />
      <GenreSearchCard tag_id="1" tag_name="アウトドア" />
      <GenreSearchCard tag_id="3" tag_name="勉強" /> */}
      <div className="w-full flex flex-row flex-wrap gap-2 justify-center">
        <div className="w-3/4 md:w-full text-2xl md:text-3xl font-bold border-b-2 border-black">
          ジャンルから探す
        </div>
        <GenreSearchCard tag_id="1" tag_name="飲み会" />
        <GenreSearchCard tag_id="4" tag_name="ゲーム" />
        <GenreSearchCard tag_id="2" tag_name="アウトドア" />
        <GenreSearchCard tag_id="3" tag_name="勉強" />
      </div>

      <CardLists
        events={nearEvents}
        eventListTitle="締め切りが近いイベント"
      ></CardLists>

      <CardLists
        events={tagEvents}
        eventListTitle="あなたが関心のありそうなイベント"
      ></CardLists>
    </>
  );
};
