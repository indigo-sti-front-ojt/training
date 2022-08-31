import React, { useEffect, FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLoginUserContext } from "../../../context/LoginUserContext";
import { LinkToUserButton } from "../../atoms/buttons/LinkToUserButton";
import { useEvent } from "../../../hooks/api/get/useEvent";
import {
  EventApplyInfo,
  useEventApply,
} from "../../../hooks/api/postPutDelete/useEventApply";
import { useEventCreateEditDelete } from "../../../hooks/api/postPutDelete/useEventCreateEditDelete";

type Props = {
  event_id: number;
};

export const EventDetail: FC<Props> = (props) => {
  const { loginUser } = useLoginUserContext();

  const { event_id } = props;

  const { eventApply } = useEventApply();

  const [applyEvent, setApplyEvent] = useState<EventApplyInfo>({
    event_id: null,
    user_id: null,
  });

  useEffect(() => {
    if (loginUser && event_id) {
      setApplyEvent({
        event_id: event_id,
        user_id: loginUser?.uid,
      });
    }
  }, [loginUser, event_id]);

  // 個別イベントの取得
  const { getEvent, event } = useEvent();
  useEffect(() => {
    getEvent(event_id);
  }, []);

  // ゲストのIDを配列化
  const guestID = event?.event_guests?.map((guest) => guest?.user_id);

  const navigate = useNavigate();

  // イベント編集ボタン
  const onClickButtonToEdit = () => {
    navigate("edit", {
      state: {
        event,
      },
    });
  };

  const { eventCreateEditDelete } = useEventCreateEditDelete();

  // イベント削除ボタン
  const onClickButtonToDelete = async () => {
    console.log(event?.event_id);
    await eventCreateEditDelete("delete", { event_id: event_id });
  };

  
  // イベント参加登録ボタン
  const onClickApply = async () => {
    console.log(applyEvent);
    await eventApply("post", applyEvent);
  };

  // イベント参加登録解除ボタン
  const onClickApplyCancel = async () => {
    console.log(applyEvent);
    await eventApply("delete", applyEvent);
  };

  return (
    <>
      {loginUser?.uid === event?.event_owner?.user_id ? (
        <>
          <button type="button" onClick={onClickButtonToEdit}>
            編集
          </button>
          <button type="button" onClick={onClickButtonToDelete}>
            削除
          </button>
        </>
      ) : (
        // <>
        //   <button onClick={onClickApplyCancel}>参加登録解除</button>
        // </>
        <>
          {guestID?.includes(loginUser?.uid) && (
            <>
              <button onClick={onClickApplyCancel}>参加登録解除</button>
            </>
          )}
        </>
      )}
      <p>応募締め切り{event?.event_deadline}</p>
      <img src={event?.event_image} alt="イベントヘッダー画像" />
      {event?.event_tags?.map((tag, i) => (
        <>
          <div key={i}>
            <span style={{ color: tag.tag_color }}>{tag.tag_value}</span>
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
        {/* {isSubmitSuccessful && (
          <>
            <p>参加登録が完了しました</p>
          </>
        )} */}
        <button onClick={onClickApply}>参加登録</button>
      </div>
    </>
  );
};
