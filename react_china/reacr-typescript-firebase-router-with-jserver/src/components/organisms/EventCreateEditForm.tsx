import React, { useState, ChangeEvent, FC } from "react";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";

import { Event } from "../../types/api/Event";
import { useAllTagsContext } from "../../context/AllTagsContext";
import { useLoginUserContext } from "../../context/LoginUserContext";
import { useEventCreateEditDelete } from "../../hooks/api/postPutDelete/useEventCreateEditDelete";

type Props = {
  event?: Event;
  method: string;
};

export const EventCreateEditForm: FC<Props> = (props) => {
  const { event, method } = props;

  const { loginUser } = useLoginUserContext();
  const { allTags } = useAllTagsContext();

  const { eventCreateEditDelete } = useEventCreateEditDelete();

  const checkedTag: Array<number | undefined> | undefined =
    event?.event_tags?.map((checkd_tag) => checkd_tag.tag_id);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Event>();

  setValue("user_id", loginUser?.uid);
  if (event) setValue("event_id", event?.event_id);

  const onSubmit: SubmitHandler<Event> = async (data: Event) => {
    console.log("onSubmit", data);
    const temp: Event = {
      ...data,
      event_budget: Number(data.event_budget),
      event_min_guest: Number(data.event_min_guest),
      event_max_guest: Number(data.event_max_guest),
      event_tags_id: data.event_tags_id?.map(Number),
    };
    // console.log(typeof temp.event_max_guest);
    // console.log(temp);

    await eventCreateEditDelete(method, temp);
  };

  const [tmpFile, setTmpFile] = useState<File>();
  const [tmpUrl, setTmpUrl] = useState(event?.event_image);
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
      setValue("event_image", icon_data?.url);
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
          <input
            defaultValue={event?.event_image}
            {...register("event_image")}
          />
        </label>
        <label>
          イベント名
          <input
            defaultValue={event?.event_name}
            {...register("event_name", { required: true })}
          />
        </label>
        {errors.event_name && (
          <span style={{ color: "red" }}>イベント名は必ず入力してください</span>
        )}
        <label>
          募集文章
          <textarea
            defaultValue={event?.event_note}
            {...register("event_note")}
          />
        </label>
        <label>
          募集締め切り
          <input
            defaultValue={event?.event_deadline}
            {...register("event_deadline")}
          />
        </label>
        <label>
          開催日時
          <input defaultValue={event?.event_date} {...register("event_date")} />
        </label>
        <label>
          開催場所
          <input
            defaultValue={event?.event_place}
            {...register("event_place")}
          />
        </label>
        <label>
          予算
          <input
            defaultValue={event?.event_budget}
            {...register("event_budget")}
          />
          <span>円</span>
        </label>

        <p>タグ</p>
        {allTags?.map(function (tag, i) {
          return (
            <div key={i}>
              <label>
                {checkedTag?.includes(tag.tag_id) ? (
                  <>
                    <input
                      {...register("event_tags_id")}
                      type="checkbox"
                      value={tag.tag_id}
                      checked
                    />
                    {tag.tag_value}
                  </>
                ) : (
                  <>
                    <input
                      {...register("event_tags_id")}
                      type="checkbox"
                      value={tag.tag_id}
                    />
                    {tag.tag_value}
                  </>
                )}
              </label>
            </div>
          );
        })}
        <label>
          募集人数
          <input
            defaultValue={event?.event_min_guest}
            {...register("event_min_guest")}
          />
          <span>~</span>
          <input
            defaultValue={event?.event_max_guest}
            {...register("event_max_guest")}
          />
        </label>
        <input type="submit" />
      </form>
    </>
  );
};
