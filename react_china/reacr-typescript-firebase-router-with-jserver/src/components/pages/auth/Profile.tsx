import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useOthers } from "../../../hooks/api/get/useProfile";
import { EventCard } from "../../organisms/EventCatd";
import { PersonalInfo } from "../../organisms/user/PersonalInfo";

type State = {
  user_id: string;
};

export const Profile = () => {
  const location = useLocation();
  const { user_id } = location.state as State;

  const { getOthers, othersInfo } = useOthers();

  useEffect(() => getOthers(user_id), []);

  return (
    <>
      <h1>Profileページです</h1>
      <PersonalInfo user={othersInfo} />
      <h2>参加予定のイベント</h2>
      <hr />
      {othersInfo?.join_event?.map((event, i) => (
        <>
          <div key={i}>
            <EventCard event={event} />
          </div>
        </>
      ))}
      <h2>主催イベント</h2>
      <hr />
      {othersInfo?.host_event?.map((event, i) => (
        <>
          <div key={i}>
            <EventCard event={event} />
          </div>
        </>
      ))}
      <h2>過去に参加したイベント</h2>
      <hr />
      {othersInfo?.past_event?.map((event, i) => (
        <>
          <div key={i}>
            <EventCard event={event} />
          </div>
        </>
      ))}
    </>
  );
};
