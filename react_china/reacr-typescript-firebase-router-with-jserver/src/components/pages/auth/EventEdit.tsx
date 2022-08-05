import React, { FC } from "react";
import { useLocation } from "react-router-dom";

import { Event } from "../../../types/api/Event";

import { EventCreateEditForm } from "../../organisms/EventCreateEditForm";

export const EventEdit: FC = () => {
  const location = useLocation();
  const event: Event = location.state as Event;
  console.log(event);

  return (
    <>
      <h2>イベント編集</h2>
      <EventCreateEditForm event={event} />
    </>
  );
};
