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

  return (
    <>
      <div className="w-full flex flex-row flex-wrap gap-2 justify-center">
        <div className="w-3/4 md:w-full text-2xl md:text-3xl font-bold border-b-2 border-black">
          {eventListTitle}
        </div>
        {events?.length ? (
          <>
            {events?.map((event) => (
              <>
                <div key={event.event_id}>
                  <EventCard event={event} />
                </div>
              </>
            ))}
          </>
        ) : (
          <span>{eventListTitle}はありません</span>
        )}
      </div>
    </>
  );
};
