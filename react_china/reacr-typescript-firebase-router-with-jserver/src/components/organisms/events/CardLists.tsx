import React from "react";
import { FC } from "react";
import { Event } from "../../../types/api/Event";
import { EventCard } from "./EventCard";

type Props = {
  events?: Event[];
  eventListTitle: string;
};

export const CardLists: FC<Props> = (props) => {
  const { events, eventListTitle } = props;
  const sliceEvent = events && events?.length > 3 ? events.slice(0, 3) : events;

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
        <div className="w-full flex justify-center items-center">
          <button className="py-4 px-4 md:py-2 h-6 w-72 md:w-full flex flex-row items-center justify-around bg-gray-400/80 rounded-lg ring-2 ring-gray-200">
            <span className="text-sm mx-2 font-bold">もっと見る</span>
          </button>
        </div>
      </div>
    </>
  );
};
