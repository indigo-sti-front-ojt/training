import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { useAllTags } from "../../hooks/api/useAllTags";
import { SearchEventList } from "../../types/react-hook-form/SearchEventList";

export const EventSerchForm = () => {
  const { getAllTags, all_tag } = useAllTags();
  useEffect(() => getAllTags(), []);

  const {
    register,
    handleSubmit,
    //formState: { errors },
  } = useForm<SearchEventList>();
  const onSubmit: SubmitHandler<SearchEventList> = (data) => {
    console.log("onSubmit", data);
  };
  return (
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
  );
};
