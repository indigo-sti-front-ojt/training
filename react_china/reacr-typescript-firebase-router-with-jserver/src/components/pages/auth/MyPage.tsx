import React, { useEffect, FC } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../hooks/api/get/useUser";
import { MyEventCard } from "../../organisms/user/MyEventCatd";
import { PersonalInfo } from "../../organisms/user/PersonalInfo";
import { useLoginUserContext } from "../../../context/LoginUserContext";
import { useAllTagsContext } from "../../../context/AllTagsContext";

export const MyPage: FC = () => {
  const { loginuser } = useLoginUserContext();
  const { allTags } = useAllTagsContext();
  const { getUser, userLoading, user } = useUser(loginuser?.uid);

  useEffect(() => getUser(), []);

  const navigate = useNavigate();
  const onClickButtonToEdit = () => {
    navigate("edit", {
      state: {
        user,
        allTags,
      },
    });
  };
  return (
    <>
      {userLoading ? (
        <>
          <p>ローディング...</p>
        </>
      ) : (
        <>
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
          <PersonalInfo user={user} onClickButtonToEdit={onClickButtonToEdit} />
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
