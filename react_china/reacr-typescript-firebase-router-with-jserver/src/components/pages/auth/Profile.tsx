import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useUserAndTags } from "../../../hooks/api/useUserAndTags";
import { MyEventCard } from "../../organisms/user/MyEventCatd";
import { PersonalInfo } from "../../organisms/user/PersonalInfo";

type State = {
  user_id: string;
};
export const Profile = () => {
  const location = useLocation();
  const { user_id } = location.state as State;

  const { getUserAndTags, loading, user } = useUserAndTags(user_id);
  useEffect(() => getUserAndTags(), []);

  return (
    <>
      {loading ? (
        <>
          <p>ローディング...</p>
        </>
      ) : (
        <>
          <h1>Profileページです</h1>
          <PersonalInfo user={user} />
          <h2>参加予定のイベント</h2>
          <hr />
          {user?.join_event?.map((event, i) => (
            <>
              <div key={i}>
                <MyEventCard event={event} />
              </div>
            </>
          ))}
          <h2>主催イベント</h2>
          <hr />
          {user?.host_event?.map((event, i) => (
            <>
              <div key={i}>
                <MyEventCard event={event} />
              </div>
            </>
          ))}
          <h2>過去に参加したイベント</h2>
          <hr />
          {user?.past_event?.map((event, i) => (
            <>
              <div key={i}>
                <MyEventCard event={event} />
              </div>
            </>
          ))}
        </>
      )}
    </>
  );
};
