import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { EventCard } from "../organisms/EventCatd";
import { SearchEventList } from "../../types/react-hook-form/SearchEventList";
import { useEventSearch } from "../../hooks/api/get/useEventSearch";
import { useAllTagsContext } from "../../context/AllTagsContext";
import { Event } from "../../types/api/Event";

export const EventSerchForm = () => {
  const { allTags } = useAllTagsContext();

  const { getSearchEvents } = useEventSearch();

  const {
    register,
    handleSubmit,
    //formState: { errors },
  } = useForm<SearchEventList>();

  const [events, setEvents] = useState<Event[]>();

  const onSubmit: SubmitHandler<SearchEventList> = async (data) => {
    console.log("onSubmit", data);
    const eventsdata = await getSearchEvents(data);
    setEvents(eventsdata);
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
      </form>
      <h2>検索結果</h2>
      <div>
        {events?.map((event, i) => (
          <>
            <div key={i}>
              <EventCard event={event} />
            </div>
          </>
        ))}
      </div>
    </div>
  );
};
