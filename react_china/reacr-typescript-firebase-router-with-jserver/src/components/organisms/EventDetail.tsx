import React, { useEffect, FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLoginUserContext } from "../../context/LoginUserContext";
import { LinkToUserButton } from "../atoms/buttons/LinkToUserButton";
import { useEvent } from "../../hooks/api/get/useEvent";

type Props = {
  event_id: number;
};

type ApplyEventPost = {
  event_id?: number;
  user_id?: string;
};

export const EventDetail: FC<Props> = (props) => {
  const { loginuser } = useLoginUserContext();

  const { event_id } = props;

  const [applyEvent, setApplyEvent] = useState<ApplyEventPost>({});

  useEffect(() => {
    if (loginuser && event_id) {
      setApplyEvent({
        event_id: event_id,
        user_id: loginuser?.uid,
      });
    }
  }, [loginuser, event_id]);

  const { getEvent, event, loading } = useEvent();
  useEffect(() => getEvent(), []);

  const navigate = useNavigate();
  const onClickButtonToEdit = () => {
    navigate("edit", {
      state: {
        event,
      },
    });
  };

  const onClickApply = () => {
    console.log(applyEvent);
  };

  return (
    <>
      {loginuser?.uid === event?.event_owner?.user_id ? (
        <>
          <button type="button" onClick={onClickButtonToEdit}>
            編集
          </button>
        </>
      ) : (
        ""
      )}
      <p>応募締め切り</p>
      <img src={event?.event_imgurl} alt="イベントヘッダー画像" />
      {event?.event_tags?.map((tag, i) => (
        <>
          <div key={i}>
            <span style={{ color: tag.color }}>{tag.value}</span>
          </div>
        </>
      ))}
      <h3>{event?.event_name}</h3>
      <p>{event?.event_note}</p>
      <div>
        <div>
          <p>最小募集人数</p>
          <p>{event?.event_min_guest}人</p>
        </div>
        <div>
          <p>最大募集人数</p>
          <p>{event?.event_max_guest}人</p>
        </div>
        <div>
          <p>主催者</p>
          <LinkToUserButton user_info={event?.event_owner} />
          <p>{event?.event_owner?.user_name}</p>
        </div>
        <div>
          <p>予算</p>
          <p>{event?.event_budget}円以下</p>
        </div>
        <div>
          <p>日時</p>
          <p>{event?.event_date}</p>
        </div>
        <div>
          <p>場所</p>
          <p>{event?.event_place}</p>
        </div>
        <h4>参加者</h4>
        <div>
          {event?.event_guests?.map((guest, i) => (
            <>
              <div key={i}>
                <LinkToUserButton user_info={guest} />
              </div>
            </>
          ))}
        </div>
      </div>
      <button onClick={onClickApply}>参加登録</button>
    </>
  );
};
