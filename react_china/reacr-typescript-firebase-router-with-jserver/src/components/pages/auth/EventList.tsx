import React, { useState } from "react";
import { EventSerchForm } from "../../organisms/EventsSearchForm";
import { Event } from "../../../types/api/Event";
import { EventSearchResult } from "../../organisms/EventSearchResult";

export const EventList = () => {
  const [events, setEvents] = useState<Event[]>();

  return (
    <>
      {/* 検索フォームと検索結果を別々のコンポーネントで書いてもらえるとうれしいね */}
      <EventSerchForm setEvents={setEvents} />
      <EventSearchResult events={events} />
    </>
  );
};
