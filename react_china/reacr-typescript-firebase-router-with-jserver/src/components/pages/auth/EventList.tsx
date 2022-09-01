import React, { useState } from "react";
import { EventSerchForm } from "../../organisms/eventsearch/EventsSearchForm";
import { Event } from "../../../types/api/Event";
import { EventSearchResult } from "../../organisms/eventsearch/EventSearchResult";
import { useLocation } from "react-router-dom";
import { SearchEventList } from "../../../types/react-hook-form/SearchEventList";

type State = {
  genreData?: SearchEventList;
};

export const EventList = () => {
  const [events, setEvents] = useState<Event[]>();

  // ジャンルのタグ情報を読み込む
  const location = useLocation();
  const state = location.state as State;

  return (
    <>
      {state.genreData ? (
        <>
          <EventSerchForm setEvents={setEvents} genreData={state?.genreData} />
        </>
      ) : (
        <>
          <EventSerchForm setEvents={setEvents} />
        </>
      )}
      <EventSearchResult events={events} />
    </>
  );
};
