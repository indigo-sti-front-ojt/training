import React from "react";
import { FC } from "react";
import { Link } from "react-router-dom";

import { Event } from "../../types/api/Event";

type Props = {
  event: Event;
};

export const EventCard: FC<Props> = (props) => {
  const { event } = props;
  const url = "/events/event?event_id=" + event?.id;
  return (
    <>
      <Link to={url} state={{ event_id: event?.id }}>
        <p>あと{event?.event_left_date}日</p>
        <img src={event?.event_imgurl} alt="イベント画像" />
        <p>{event?.event_created_date}</p>
        <p>{event?.event_name}</p>
        <p>{event?.event_owner_icon}</p>
        <p>主催：{event?.event_owner_name}</p>
        <p>場所：{event?.event_place}</p>
        <p>予算：{event?.event_budget}円</p>
        <p>
          人数：{event?.event_guest_length}/{event?.event_max_guest}
        </p>
      </Link>
      <hr />
    </>
  );
};
