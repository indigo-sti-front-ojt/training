import React from "react";
import { CardLists } from "../events/CardLists";
import { Event } from "../../../types/api/Event";
import { SearchEventList } from "../../../types/react-hook-form/SearchEventList";

type Props = {
  events: Event[] | undefined;
  genreData?: SearchEventList;
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

      <CardLists
        events={events}
        eventListTitle="検索結果"
      ></CardLists>

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
