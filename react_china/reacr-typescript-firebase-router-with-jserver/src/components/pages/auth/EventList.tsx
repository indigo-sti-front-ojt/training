import React, { useEffect } from "react";

import { EventCard } from "../../organisms/EventCatd";
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
            <div key={i}>
              <EventCard event={event} />
            </div>
          </>
        ))}
      </div>
    </>
  );
};
