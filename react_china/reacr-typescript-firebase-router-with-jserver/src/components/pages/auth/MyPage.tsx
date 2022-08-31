import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { PersonalInfo } from "../../organisms/user/PersonalInfo";
import { useUserInfoContext } from "../../../context/UserInfoContext";
import { CardLists } from "../../organisms/events/CardLists";

export const MyPage: FC = () => {
  const { userInfo } = useUserInfoContext();

  const navigate = useNavigate();
  const onClickButtonToEdit = () => {
    navigate("edit");
  };
  return (
    <>
      {/* <h2>参加予定のイベント</h2>
      <hr />
      {userInfo?.join_event?.map((event, i) => (
        <>
          <div key={i}>
            <EventCard event={event} />
          </div>
        </>
      ))} */}

      <CardLists
        events={userInfo?.join_event}
        eventListTitle="参加予定のイベント"
      ></CardLists>

      {/* <h2>主催イベント</h2>
      <hr />
      {userInfo?.host_event?.map((event, i) => (
        <>
          <div key={i}>
            <EventCard event={event} />
          </div>
        </>
      ))} */}

      <CardLists
        events={userInfo?.host_event}
        eventListTitle="主催イベント"
      ></CardLists>

      <PersonalInfo user={userInfo} onClickButtonToEdit={onClickButtonToEdit} />

      {/* <h2>過去に参加したイベント</h2>
      <hr />
      {userInfo?.past_event?.map((event, i) => (
        <>
          <div key={i}>
            <EventCard event={event} />
          </div>
        </>
      ))} */}

      <CardLists
        events={userInfo?.past_event}
        eventListTitle="過去に参加したイベント"
      ></CardLists>
    </>
  );
};
