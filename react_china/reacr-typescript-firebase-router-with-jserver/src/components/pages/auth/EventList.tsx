import React, { useState } from "react";
import { EventSerchForm } from "../../organisms/eventsearch/EventsSearchForm";
import { Event } from "../../../types/api/Event";
import { useLocation } from "react-router-dom";
import { SearchEventList } from "../../../types/react-hook-form/SearchEventList";

type State = {
  genreData?: SearchEventList;
};

export const EventList = () => {
  const [events, setEvents] = useState<Event[]>();

  // ジャンルのタグをうけとったときだけ情報を読み込む
  let state = null;
  const location = useLocation();
  if (location) state = location.state as State;

  return (
    <>
      {state && state.genreData ? (
        <>
          <EventSerchForm
            setEvents={setEvents}
            events={events}
            genreData={state?.genreData}
          />
        </>
      ) : (
        <>
          <EventSerchForm setEvents={setEvents} events={events} />
        </>
      )}
    </>
  );
};
