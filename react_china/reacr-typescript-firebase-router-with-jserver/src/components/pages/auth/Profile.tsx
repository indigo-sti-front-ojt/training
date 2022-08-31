import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useOthers } from "../../../hooks/api/get/useProfile";
import { PersonalInfo } from "../../organisms/user/PersonalInfo";
import { CardLists } from "../../organisms/events/CardLists";

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
      <PersonalInfo user={othersInfo} />

      <CardLists
        events={othersInfo?.join_event}
        eventListTitle="参加予定のイベント"
      ></CardLists>

      <CardLists
        events={othersInfo?.host_event}
        eventListTitle="主催イベント"
      ></CardLists>

      <CardLists
        events={othersInfo?.past_event}
        eventListTitle="過去に参加したイベント"
      ></CardLists>
    </>
  );
};
