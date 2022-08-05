import React, { useEffect, FC } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAndTags } from "../../../hooks/api/useUserAndTags";
import { MyEventCard } from "../../organisms/user/MyEventCatd";
import { PersonalInfo } from "../../organisms/user/PersonalInfo";
import { useLoginUserContext } from "../../../context/LoginUserContext";

export const MyPage: FC = () => {
  const { loginuser } = useLoginUserContext();

  const { getUserAndTags, loading, user, all_tag } = useUserAndTags(
    loginuser?.uid
  );
  
  useEffect(() => getUserAndTags(), []);

  const navigate = useNavigate();
  const onClickButtonToEdit = () => {
    navigate("edit", {
      state: {
        user,
        all_tag,
      },
    });
  };
  return (
    <>
      {loading ? (
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
