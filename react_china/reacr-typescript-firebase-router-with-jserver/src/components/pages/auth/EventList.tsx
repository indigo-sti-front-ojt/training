import React, { useEffect } from "react";

import { MyEventCard } from "../../organisms/user/MyEventCatd";
import { EventSerchForm } from "../../organisms/EventsSearchForm";
import { useEventSearch } from "../../../hooks/api/useEventSearch";

export const EventList = () => {
  const { getEvents, loading, events } = useEventSearch();
  useEffect(() => getEvents(), []);
  return (
    <>
      <h2>検索フォーム</h2>
      <EventSerchForm />
      <h2>検索結果</h2>
      <div>
        {events?.map((event, i) => (
          <>
            <MyEventCard
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
      </div>
    </>
  );
};
