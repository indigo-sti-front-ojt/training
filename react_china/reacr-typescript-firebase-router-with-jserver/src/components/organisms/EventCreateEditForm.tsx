import React, { useState, ChangeEvent, FC, useEffect } from "react";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";

import { Event } from "../../types/api/Event";
import { Tag } from "../../types/api/Tag";
import { useAllTags } from "../../hooks/api/useAllTags";

type Props = {
  event_imgurl?: string;
  event_name?: string;
  event_note?: string;
  event_deadline?: string;
  event_date?: string;
  event_place?: string;
  event_budget?: number;
  event_tags?: Tag[];
  event_min_guest?: number;
  event_max_guest?: number;
};

export const EventCreateEditForm: FC<Props> = (props) => {
  const {
    event_imgurl,
    event_name,
    event_note,
    event_deadline,
    event_date,
    event_place,
    event_budget,
    event_tags,
    event_min_guest,
    event_max_guest,
  } = props;
  const { getAllTags, loading, all_tag } = useAllTags();
  useEffect(() => getAllTags(), []);

  const checkedTag: Array<number | undefined> | undefined = event_tags?.map(
    (checkd_tag) => checkd_tag.id
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Event>();
  const onSubmit: SubmitHandler<Event> = (data) => {
    console.log("onSubmit", data);
  };

  const [tmpFile, setTmpFile] = useState<File>();
  const [tmpUrl, setTmpUrl] = useState(event_imgurl);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if (!e.target.files) return;
    setTmpUrl(URL.createObjectURL(e.target.files[0]));
    setTmpFile(e.target.files[0]);
  };

  const onClickImageUp = async () => {
    console.log(tmpFile);
    try {
      const res = await axios.get("http://localhost:5000/image");
      const icon_data = res.data;
      setValue("event_imgurl", icon_data?.url);
    } catch {
      console.log("error");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          イベントヘッダー画像
          <input
            type="file"
            accept="image/*"
            name="user_icon"
            onChange={handleChange}
          />
          <img src={tmpUrl} alt="イベント画像" />
        </label>
        <span
          style={{ cursor: "pointer", border: "solid 1px" }}
          onClick={onClickImageUp}
        >
          UpLoad
        </span>
        <label>
          <input defaultValue={event_imgurl} {...register("event_imgurl")} />
        </label>
        <label>
          イベント名
          <input
            defaultValue={event_name}
            {...register("event_name", { required: true })}
          />
        </label>
        {errors.event_name && (
          <span style={{ color: "red" }}>イベント名は必ず入力してください</span>
        )}
        <label>
          募集文章
          <textarea defaultValue={event_note} {...register("event_note")} />
        </label>
        <label>
          募集締め切り
          <input
            defaultValue={event_deadline}
            {...register("event_deadline")}
          />
        </label>
        <label>
          開催日時
          <input defaultValue={event_date} {...register("event_date")} />
        </label>
        <label>
          開催場所
          <input defaultValue={event_place} {...register("event_place")} />
        </label>
        <label>
          予算
          <input defaultValue={event_budget} {...register("event_budget")} />
          <span>円</span>
        </label>

        <p>タグ</p>
        {all_tag?.map(function (tag, i) {
          return (
            <div key={i}>
              <label>
                {checkedTag?.includes(tag.id) ? (
                  <>
                    <input
                      {...register("event_tags")}
                      type="checkbox"
                      value={tag.id}
                      checked
                    />
                    {tag.value}
                  </>
                ) : (
                  <>
                    <input
                      {...register("event_tags")}
                      type="checkbox"
                      value={tag.id}
                    />
                    {tag.value}
                  </>
                )}
              </label>
            </div>
          );
        })}
        <label>
          募集人数
          <input
            defaultValue={event_min_guest}
            {...register("event_min_guest")}
          />
          <span>~</span>
          <input
            defaultValue={event_max_guest}
            {...register("event_max_guest")}
          />
        </label>
        <input type="submit" />
      </form>
    </>
  );
};
