import React from "react";
import { FC } from "react";

type Props = {
  key?: number;
  event_left_date?: number;
  event_imgurl?: string;
  event_created_date?: string;
  event_name?: string;
  event_owner_name?:string;
  event_owner_icon?: string;
  event_place?: string;
  event_budget?: number;
  event_guest_length?: number;
  event_max_guest?: number;
};

export const EventCard: FC<Props> = (props: Props) => {
  const {
    key,
    event_left_date,
    event_imgurl,
    event_created_date,
    event_name,
    event_owner_icon,
    event_owner_name,
    event_place,
    event_budget,
    event_guest_length,
    event_max_guest,
  } = props;
  return (
    <>
      <div key={key}>
        <p>あと{event_left_date}日</p>
        <img src={event_imgurl} alt="イベント画像" />
        <p>{event_created_date}</p>
        <p>{event_name}</p>
        <p>{event_owner_icon}</p>
        <p>主催：{event_owner_name}</p>
        <p>場所：{event_place}</p>
        <p>予算：{event_budget}円</p>
        <p>
          人数：{event_guest_length}/{event_max_guest}
        </p>
      </div>
      <hr />
    </>
  );
};
