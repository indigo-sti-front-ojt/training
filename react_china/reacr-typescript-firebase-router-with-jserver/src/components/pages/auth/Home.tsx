import React, { FC, useEffect } from "react";

import { useEventHome } from "../../../hooks/api/useEventHome";
import { EventCard } from "../../organisms/EventCatd";
import { LinkToEventSearch } from "../../organisms/LinkToEventSearch";
import { GenreSearchCard } from "../../organisms/GenreSearchCard";
import { CreateNewEventButton } from "../../atoms/buttons/CreateNewEventButton";

export const Home: FC = () => {
  const { getHomeEvents, nearEvents, tagEvents, loading } = useEventHome();

  useEffect(() => getHomeEvents(), []);

  return (
    <>
      {loading ? (
        <>
          <p>ローディング...</p>
        </>
      ) : (
        <>
          <CreateNewEventButton />

          <LinkToEventSearch />
          <h2>ジャンルから探す</h2>
          <GenreSearchCard tag_id="2" tag_name="飲み会" />
          <GenreSearchCard tag_id="4" tag_name="ゲーム" />
          <GenreSearchCard tag_id="1" tag_name="アウトドア" />
          <GenreSearchCard tag_id="3" tag_name="勉強" />

          <h2>締め切りが近いイベント</h2>
          <hr />
          {nearEvents?.map((event, i) => (
            <>
              <EventCard
                key={i}
                event_left_date={event.event_left_date}
                event_imgurl={event.event_imgurl}
                event_created_date={event.event_created_date}
                event_name={event.event_name}
                event_owner_icon={event.event_owner_icon}
                event_owner_name={event.event_owner_name}
                event_place={event.event_place}
                event_budget={event.event_budget}
                event_guest_length={event.event_guests?.length}
                event_max_guest={event.event_max_guest}
              />
            </>
          ))}
          <h2>あなたが関心ありそうなイベント</h2>
          <hr />
          {tagEvents?.map((event, i) => (
            <>
              <EventCard
                key={i}
                event_left_date={event.event_left_date}
                event_imgurl={event.event_imgurl}
                event_created_date={event.event_created_date}
                event_name={event.event_name}
                event_owner_icon={event.event_owner_icon}
                event_owner_name={event.event_owner_name}
                event_place={event.event_place}
                event_budget={event.event_budget}
                event_guest_length={event.event_guests?.length}
                event_max_guest={event.event_max_guest}
              />
            </>
          ))}
        </>
      )}
    </>
  );
};
