import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { EventCard } from "../../organisms/EventCatd";
import { PersonalInfo } from "../../organisms/user/PersonalInfo";
import { useUserInfoContext } from "../../../context/UserInfoContext";

export const MyPage: FC = () => {
  const { userInfo } = useUserInfoContext();

  const navigate = useNavigate();
  const onClickButtonToEdit = () => {
    navigate("edit");
  };
  return (
    <>
      <h2>参加予定のイベント</h2>
      <hr />
      {userInfo?.join_event?.map((event, i) => (
        <>
          <div key={i}>
            <EventCard event={event} />
          </div>
        </>
      ))}
      <h2>主催イベント</h2>
      <hr />
      {userInfo?.host_event?.map((event, i) => (
        <>
          <div key={i}>
            <EventCard event={event} />
          </div>
        </>
      ))}
      <PersonalInfo user={userInfo} onClickButtonToEdit={onClickButtonToEdit} />
      <h2>過去に参加したイベント</h2>
      <hr />
      {userInfo?.past_event?.map((event, i) => (
        <>
          <div key={i}>
            <EventCard event={event} />
          </div>
        </>
      ))}
    </>
  );
};
