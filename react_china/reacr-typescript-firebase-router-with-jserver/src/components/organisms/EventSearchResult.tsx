import React from "react";
import { EventCard } from "../organisms/EventCatd";
import { Event } from "../../types/api/Event";

type Props = {
  events: Event[] | undefined;
};

export const EventSearchResult = (props: Props) => {
  const { events } = props;

  return (
    <>
      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <p>イベントタグ</p>
        {allTags?.map((tag, i) => (
          <div key={i}>
            <label>
              <input type="checkbox" {...register("tags")} value={tag.tag_id} />
              {tag.tag_value}
            </label>
          </div>
        ))}
        <div>
          <label>
            <p>予算</p>
            <input defaultValue="" {...register("budget")} />
          </label>
        </div>
        <div>
          <label>
            <p>募集人数</p>
            <input defaultValue="" {...register("minguest")} />
            <span>人</span>
            <span>~</span>
            <input defaultValue="" {...register("maxguest")} />
            <span>人</span>
          </label>
        </div>
        <div>
          <label>
            <p>日程</p>
            <input defaultValue="" {...register("fromdate")} />
            <span>~</span>
            <input defaultValue="" {...register("todate")} />
          </label>
        </div>
        <input type="submit" />
      </form> */}

      <div className="flex flex-col md:flex-row items-center w-full max-w-4xl flex-wrap gap-2">
        <div className="w-full text-2xl md:text-3xl font-bold border-b-2 border-black">
          検索結果
        </div>
        {/* event 検索結果 */}
        {events?.map((event, i) => (
          <>
            <EventCard key={i} event={event} />
          </>
        ))}
      </div>
      {/* 
      <h2>検索結果</h2>
      <div>
        {events?.map((event, i) => (
          <>
            <div key={i}>
              <EventCard event={event} />
            </div>
          </>
        ))}
      </div> */}
    </>
  );
};
