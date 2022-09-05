import React, { useEffect, FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLoginUserContext } from "../../../context/LoginUserContext";
import { useEvent } from "../../../hooks/api/get/useEvent";
import {
  EventApplyInfo,
  useEventApply,
} from "../../../hooks/api/postPutDelete/useEventApply";
import { useEventCreateEditDelete } from "../../../hooks/api/postPutDelete/useEventCreateEditDelete";
import { UserMinInfo } from "../../../types/api/UserMinInfo";

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
        user_id: loginUser?.user_id,
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

  // レンダリング時の参加登録の有無を表すフラグの定義
  const [eventJoinFlag, setEventJoinFlag] = useState(
    guestID?.includes(loginUser?.user_id)
  );

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
    setEventJoinFlag(!eventJoinFlag);
  };

  // イベント参加登録解除ボタン
  const onClickApplyCancel = async () => {
    console.log(applyEvent);
    await eventApply("delete", applyEvent);
    setEventJoinFlag(!eventJoinFlag);
  };

  // クリックするとユーザページへ
  const onClickUser = (userInfo?: UserMinInfo) => {
    if (userInfo) {
      const url = "/user?userid=" + userInfo.user_id;
      navigate(url, { state: { user_id: userInfo.user_id } });
    }
  };

  // const old = (
  //   <>
  //     {loginUser?.user_id === event?.event_owner?.user_id ? (
  //       <>
  //         <button type="button" onClick={onClickButtonToEdit}>
  //           編集
  //         </button>
  //         <button type="button" onClick={onClickButtonToDelete}>
  //           削除
  //         </button>
  //       </>
  //     ) : (
  //       // <>
  //       //   <button onClick={onClickApplyCancel}>参加登録解除</button>
  //       // </>
  //       <>
  //         {guestID?.includes(loginUser?.user_id) && (
  //           <>
  //             <button onClick={onClickApplyCancel}>参加登録解除</button>
  //           </>
  //         )}
  //       </>
  //     )}
  //     <p>応募締め切り{event?.event_deadline}</p>
  //     <img src={event?.event_image} alt="イベントヘッダー画像" />
  //     {event?.event_tags?.map((tag, i) => (
  //       <>
  //         <div key={i}>
  //           <span style={{ color: tag.tag_color }}>{tag.tag_value}</span>
  //         </div>
  //       </>
  //     ))}
  //     <h3>{event?.event_name}</h3>
  //     <p>{event?.event_note}</p>
  //     <div>
  //       <div>
  //         <p>最小募集人数</p>
  //         <p>{event?.event_min_guest}人</p>
  //       </div>
  //       <div>
  //         <p>最大募集人数</p>
  //         <p>{event?.event_max_guest}人</p>
  //       </div>
  //       <div>
  //         <p>主催者</p>
  //         <LinkToUserButton user_info={event?.event_owner} />
  //         <p>{event?.event_owner?.user_name}</p>
  //       </div>
  //       <div>
  //         <p>予算</p>
  //         <p>{event?.event_budget}円以下</p>
  //       </div>
  //       <div>
  //         <p>日時</p>
  //         <p>{event?.event_date}</p>
  //       </div>
  //       <div>
  //         <p>場所</p>
  //         <p>{event?.event_place}</p>
  //       </div>
  //       <h4>参加者</h4>
  //       <div>
  //         {event?.event_guests?.map((guest, i) => (
  //           <>
  //             <div key={i}>
  //               <LinkToUserButton user_info={guest} />
  //             </div>
  //           </>
  //         ))}
  //       </div>
  //       <button onClick={onClickApply}>参加登録</button>
  //     </div>
  //   </>
  // );

  return (
    <>
      <div className="flex flex-row items-center w-full max-w-4xl flex-wrap gap-4 gap-x-0">
        <div className="w-full flex flex-col-reverse md:flex-row md:items-end">
          <div className="w-full md:w-1/2 text-2xl md:text-3xl font-bold border-b-2 border-black">
            イベント
          </div>
          <div className="w-full md:w-1/2 flex justify-center md:justify-end items-center">
            <div className="border border-gray-300 rounded-md flex flex-col justify-center items-center py-4 px-8">
              <span>応募締め切り</span>
              <span>{event?.event_deadline}</span>
            </div>
          </div>
        </div>
        <figure className="flex items-center justify-center w-full h-auto p-4">
          <img
            src={event?.event_image}
            className="h-auto max-h-64 md:max-h-full md:h-full w-auto object-contain rounded-md"
          />
        </figure>
        <div className="flex flex-row flex-wrap gap-y-2 w-full">
          {event?.event_tags?.map((value) => (
            <>
              <span className="tag" key={value.tag_id}>
                {value.tag_value}
              </span>
            </>
          ))}
        </div>
        <div className="w-full text-2xl">{event?.event_name}</div>
        <div className="w-full text-md">{event?.event_note}</div>
        <div className="w-full flex flex-col border-2 items-center rounded-md border-gray-600 gap-10 py-10">
          <div className="flex flex-row justify-around items-center w-full md:w-3/4 ">
            <div className="w-1/3">最小募集人数</div>
            <div className="w-1/3 text-center">
              <span className="text-4xl">{event?.event_min_guest}</span>人
            </div>
          </div>
          <div className="flex flex-row justify-around items-center w-full md:w-3/4 ">
            <div className="w-1/3">最大募集人数</div>
            <div className="w-1/3 text-center">
              <span className="text-4xl">{event?.event_max_guest}</span>人
            </div>
          </div>
          <div className="flex flex-row justify-around items-center w-full md:w-3/4 ">
            <div className="w-1/3">主催者</div>
            <div className="w-1/3 text-center flex justify-center items-center">
              <figure
                className="w-10 h-10 overflow-hidden rounded-full"
                onClick={() => onClickUser(event?.event_owner)}
              >
                <img
                  src={event?.event_owner?.user_icon}
                  className="w-full h-full object-cover object-bottom"
                  alt=""
                />
              </figure>
            </div>
          </div>
          <div className="flex flex-row justify-around items-center w-full md:w-3/4 ">
            <div className="w-1/3">予算</div>
            <div className="w-1/3 text-center">
              <span className="text-4xl">{event?.event_budget}</span>円以下
            </div>
          </div>
          <div className="flex flex-row justify-around items-center w-full md:w-3/4 ">
            <div className="w-1/3">日時</div>
            <div className="w-1/3 text-center">
              <span className="text-4xl">{event?.event_date}</span>
            </div>
          </div>
          <div className="flex flex-row justify-around items-center w-full md:w-3/4 ">
            <div className="w-1/3">場所</div>
            <div className="w-1/3 text-center">
              <span className="text-4xl">{event?.event_place}</span>
            </div>
          </div>

          <div className="flex flex-col w-full items-center md:w-3/4 gap-4">
            <div className="w-1/2 text-center text-3xl border-b-2 border-gray-800">
              参加者
            </div>

            {event?.event_guests?.length ? (
              <>
                <div className="w-full flex flex-row flex-wrap justify-center gap-5">
                  {event?.event_guests?.map((guest, i) => (
                    <>
                      <figure
                        key={i}
                        className="w-10 h-10 overflow-hidden rounded-full"
                        onClick={() => onClickUser(guest)}
                      >
                        <img
                          src={guest.user_icon}
                          className="w-full h-full object-cover object-bottom"
                          alt=""
                        />
                      </figure>
                    </>
                  ))}
                </div>
              </>
            ) : (
              <span>参加者はまだいません</span>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center w-full max-w-4xl">
        {eventJoinFlag ? (
          <>
            <button
              className="border border-gray-300 rounded-md flex flex-col justify-center items-center py-8 px-20"
              onClick={onClickApplyCancel}
            >
              参加登録解除
            </button>
          </>
        ) : (
          <>
            <button
              className="border border-gray-300 rounded-md flex flex-col justify-center items-center py-8 px-20"
              onClick={onClickApply}
            >
              参加登録
            </button>
          </>
        )}
        {loginUser?.user_id === event?.event_owner?.user_id ? (
          <>
            <button
              className="border border-gray-300 rounded-md flex flex-col justify-center items-center py-8 px-20"
              type="button"
              onClick={onClickButtonToEdit}
            >
              編集
            </button>
            <button
              className="border border-gray-300 rounded-md flex flex-col justify-center items-center py-8 px-20"
              type="button"
              onClick={onClickButtonToDelete}
            >
              削除
            </button>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
