import React, { useState } from "react";
import { FC } from "react";
import { Event } from "../../../types/api/Event";
import { EventCard } from "./EventCard";

type Props = {
  events?: Event[];
  eventListTitle: string;
};

export const CardListsUser: FC<Props> = (props) => {
  const { events, eventListTitle } = props;
  const sliceEvent = events && events?.length > 3 ? events.slice(0, 3) : events;

  const [viewFlag, setViewFlag] = useState<boolean>(false);

  const onClickParent = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.currentTarget === e.target) {
      setViewFlag(false);
    }
  };
  const onClickCross = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setViewFlag(false);
  };
  return (
    <>
      <div className="w-full flex flex-row flex-wrap gap-2 justify-start">
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
        {sliceEvent && sliceEvent.length > 3 ? (
          <>
            <div className="w-full flex justify-center items-center">
              <button
                onClick={() => setViewFlag(true)}
                className="py-4 px-4 md:py-2 h-6 w-72 md:w-full flex flex-row items-center justify-around bg-gray-400/80 rounded-lg ring-2 ring-gray-200"
              >
                <span className="text-sm mx-2 font-bold">もっと見る</span>
              </button>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>

      <div
        className={
          "z-50 fixed overflow-hidden flex justify-center items-center bg-gray-600/50 transition-all " +
          (viewFlag
            ? "w-screen h-screen top-0 left-0"
            : "w-0 h-0 top-1/2 left-1/2")
        }
        onClick={onClickParent}
      >
        <div className="w-4/5 max-w-4xl h-3/4 shadow-md bg-white relative flex flex-col py-2">
          <div
            className="absolute -top-10 right-0 w-10 h-10 text-white"
            onClick={onClickCross}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <div className="w-full h-full flex flex-col gap-5 p-5">
            {/* ここに書く */}
          </div>
        </div>
      </div>
    </>
  );
};
