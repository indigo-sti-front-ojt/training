import React, { FC, useEffect } from "react";
import { Link } from "react-router-dom";

import { useEventHome } from "../../../hooks/useEventHome";
import { EventCard } from "../../organisms/events/EventCatd";

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
          <div>
            <Link to={"/events"}>イベント検索する</Link>
          </div>
          <h2>ジャンルから探す</h2>
          <Link to={"/events"}>お酒 </Link>
          <Link to={"/events"}>ゲーム </Link>
          <Link to={"/events"}>アウトドア </Link>
          <Link to={"/events"}>勉強</Link>
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
