import React from "react";
import { FC } from "react";
import { Event } from "../../../types/api/Event";
import { EventCard } from "./EventCard";
import { useNavigate } from "react-router-dom";
import { useUserInfoContext } from "../../../context/UserInfoContext";

type Props = {
  events?: Event[];
  eventListTitle: string;
};

export const CardLists: FC<Props> = (props) => {
  // やりたいこと homeから検索のための情報をPropsで受け取って検索へ遷移

  //ユーザの情報を取得
  const { userInfo } = useUserInfoContext();

  //ユーザの登録しているタグの情報を取得 & 整形
  const tags_arr = userInfo?.user_tags?.map((tags) => tags.tag_id);

  // イベントデータをpropsから取得 & 整形
  const { events, eventListTitle } = props;
  const sliceEvent = events && events?.length > 3 ? events.slice(0, 3) : events;

  const url = "/events";
  const navigation = useNavigate();

  // イベント検索へ遷移用
  const onClickLink = () => {
    navigation(url);
  };

  // イベント・関心のありそうなイベントへ遷移用
  const onClickLinkTag = () => {
    navigation(url, { state: { genreData: { tagsid: tags_arr } } });
  };

  return (
    <>
      <div className="w-full flex flex-row flex-wrap gap-2 justify-center">
        <div className="w-3/4 md:w-full text-2xl md:text-3xl font-bold border-b-2 border-black">
          {eventListTitle}
        </div>
        {sliceEvent?.length ? (
          <>
            {sliceEvent?.map((event) => (
              <>
                <EventCard event={event} key={event.event_id} />
              </>
            ))}
          </>
        ) : (
          <span>{eventListTitle}はありません</span>
        )}
        {/* イベントが3つよりあるときもっと見るボタンを表示 */}
        {sliceEvent && (
          <>
            <div className="w-full flex justify-center items-center">
              {eventListTitle === "あなたが関心のありそうなイベント" ? (
                <>
                  <button
                    onClick={onClickLinkTag}
                    className="py-4 px-4 md:py-2 h-6 w-72 md:w-full flex flex-row items-center justify-around bg-gray-400/80 rounded-lg ring-2 ring-gray-200"
                  >
                    <span className="text-sm mx-2 font-bold">
                      さらに検索する
                    </span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={onClickLink}
                    className="py-4 px-4 md:py-2 h-6 w-72 md:w-full flex flex-row items-center justify-around bg-gray-400/80 rounded-lg ring-2 ring-gray-200"
                  >
                    <span className="text-sm mx-2 font-bold">
                      さらに検索する
                    </span>
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};
