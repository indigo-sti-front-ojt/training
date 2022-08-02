import React, { useEffect } from "react";
import { useUserAndTags } from "../../../hooks/useUserAndTags";
import { MyEventCard } from "../../organisms/user/MyEventCatd";
import { PersonalInfo } from "../../organisms/user/PersonalInfo";

export const Profile = () => {
  //const location = useLocation();
  //const userid = location.state as string;

  const { getUserAndTags, loading, user } = useUserAndTags(
    "zzcV7HJFfvaU4P8CmHPldleQWWx1"
  );
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
          <PersonalInfo
            user_id={user?.user_id}
            user_icon={user?.user_icon}
            user_nickname={user?.user_nickname}
            user_name={user?.user_name}
            user_coe={user?.user_coe}
            user_sl={user?.user_sl}
            user_bio={user?.user_bio}
            user_tags={user?.user_tags}
            user_email={user?.user_email}
            user_instagramid={user?.user_instagramid}
            user_twitterid={user?.user_twitterid}
            user_facebookid={user?.user_facebookid}
            user_lineqr={user?.user_lineqr}
          />
          <h2>参加予定のイベント</h2>
          <hr />
          {user?.join_event?.map((event, i) => (
            <>
              <MyEventCard
                key={i}
                event_left_date={event.event_left_date}
                event_imgurl={event.event_imgurl}
                event_created_date={event.event_created_date}
                event_name={event.event_name}
                event_owner_icon={event.event_owner_icon}
                event_owner={event.event_owner}
                event_place={event.event_place}
                event_budget={event.event_budget}
                event_guest_length={event.event_guest_id.length}
                event_max_guest={event.event_max_guest}
              />
            </>
          ))}
          <h2>主催イベント</h2>
          <hr />
          {user?.host_event?.map((event, i) => (
            <>
              <MyEventCard
                key={i}
                event_left_date={event.event_left_date}
                event_imgurl={event.event_imgurl}
                event_created_date={event.event_created_date}
                event_name={event.event_name}
                event_owner_icon={event.event_owner_icon}
                event_owner={event.event_owner}
                event_place={event.event_place}
                event_budget={event.event_budget}
                event_guest_length={event.event_guest_id.length}
                event_max_guest={event.event_max_guest}
              />
            </>
          ))}
          <h2>過去に参加したイベント</h2>
          <hr />
          {user?.past_event?.map((event, i) => (
            <>
              <MyEventCard
                key={i}
                event_left_date={event.event_left_date}
                event_imgurl={event.event_imgurl}
                event_created_date={event.event_created_date}
                event_name={event.event_name}
                event_owner_icon={event.event_owner_icon}
                event_owner={event.event_owner}
                event_place={event.event_place}
                event_budget={event.event_budget}
                event_guest_length={event.event_guest_id.length}
                event_max_guest={event.event_max_guest}
              />
            </>
          ))}
        </>
      )}
    </>
  );
};
