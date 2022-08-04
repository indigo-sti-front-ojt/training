import React, { FC } from "react";
import { useLocation } from "react-router-dom";

import { Event } from "../../../types/api/Event";

import { EventCreateEditForm } from "../../organisms/EventCreateEditForm";

export const EventEdit: FC = () => {
  const location = useLocation();
  const event = location.state as Event;
  console.log(event);

  return (
    <>
      <h2>イベント編集</h2>
      <EventCreateEditForm
        event_imgurl={event?.event_imgurl}
        event_name={event?.event_name}
        event_note={event?.event_note}
        event_deadline={event?.event_deadline}
        event_date={event?.event_date}
        event_place={event?.event_place}
        event_budget={event?.event_budget}
        event_tags={event?.event_tags}
        event_min_guest={event?.event_min_guest}
        event_max_guest={event?.event_max_guest}
      />
    </>
  );
};
