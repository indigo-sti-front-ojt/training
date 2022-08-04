import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { useEventSearch } from "../../../hooks/useEventSearch";
import { useAllTags } from "../../../hooks/useAllTags";
import { SearchEventList } from "../../../types/react-hook-form/SearchEventList";
import { MyEventCard } from "../../organisms/user/MyEventCatd";

export const EventList = () => {
  const { getAllTags, all_tag } = useAllTags();
  useEffect(() => getAllTags(), []);
  const { getEvents, loading, events } = useEventSearch();

  useEffect(() => getEvents(), []);
  const {
    register,
    handleSubmit,
    //formState: { errors },
  } = useForm<SearchEventList>();
  const onSubmit: SubmitHandler<SearchEventList> = (data) => {
    console.log("onSubmit", data);
  };

  return (
    <>
      <h2>検索フォーム</h2>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p>イベントタグ</p>
          {all_tag?.map((tag, i) => (
            <div key={i}>
              <label>
                <input type="checkbox" {...register("tags")} value={tag.id} />
                {tag.value}
              </label>
            </div>
          ))}
          <div>
            <label>
              <p>予算</p>
              <input defaultValue="" {...register("badget")} />
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
      </div>
      <h2>検索結果</h2>
      <div>
        {events?.map((event, i) => (
          <>
            <MyEventCard
              key={i}
              event_left_date={event.event_left_date}
              event_imgurl={event.event_imgurl}
              event_created_date={event.event_created_date}
              event_name={event.event_name}
              event_owner_icon={event.event_owner_icon}
              event_owner_name={event.event_owner_name}
              event_place={event.event_place}
              event_budget={event.event_budget}
              event_guest_length={event.event_guests?.length}
              event_max_guest={event.event_max_guest}
            />
          </>
        ))}
      </div>
    </>
  );
};
