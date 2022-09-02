import React, { useState, ChangeEvent, FC, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { Event } from "../../../types/api/Event";
import { useAllTagsContext } from "../../../context/AllTagsContext";
import { useLoginUserContext } from "../../../context/LoginUserContext";
import { useEventCreateEditDelete } from "../../../hooks/api/postPutDelete/useEventCreateEditDelete";
import { useBase64ImageUp } from "../../../hooks/api/postPutDelete/useBase64ImageUp";

type Props = {
  event?: Event;
  method: string;
};

export const EventCreateEditForm: FC<Props> = (props) => {
  const { loginUser } = useLoginUserContext();
  const { allTags } = useAllTagsContext();

  const { event, method } = props;

  const { eventCreateEditDelete } = useEventCreateEditDelete();
  const { base64ImageUp } = useBase64ImageUp();

  const [base64, setBase64] = useState<string>("");

  const checkedTag: Array<number> | undefined = event?.event_tags?.map(
    (checkd_tag) => checkd_tag.tag_id
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitSuccessful },
  } = useForm<Event>({
    defaultValues: {
      event_image: "",
      event_tags_id: [],
    },
  });

  useEffect(() => {
    setValue("user_id", loginUser?.user_id);
    setValue("event_id", event?.event_id);
  }, [event, loginUser]);

  const onSubmit: SubmitHandler<Event> = async (data: Event) => {
    // console.log("onSubmit", data);
    const temp: Event = {
      ...data,
      event_budget: Number(data.event_budget),
      event_min_guest: Number(data.event_min_guest),
      event_max_guest: Number(data.event_max_guest),
      event_tags_id: data.event_tags_id?.map(Number),
    };
    // console.log(typeof temp.event_max_guest);
    console.log("onSubmit", temp);

    await eventCreateEditDelete(method, temp);
  };

  const convertToBase64 = async (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64URI: string = reader.result as string;
      const tempBase64: string = base64URI.replace(/data:.*\/.*;base64,/, "");
      console.log(tempBase64);
      setBase64(tempBase64);
    };
  };

  const [imageFlag, setImageFlag] = useState(false);
  const [tmpUrl, setTmpUrl] = useState(event?.event_image);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setImageFlag(true);
    await convertToBase64(file);
  };

  useEffect(() => {
    if (imageFlag) {
      const iconURL = uploadEventImage();
      console.log(iconURL);
      setImageFlag(false);
    }
  }, [base64]);

  const uploadEventImage = async () => {
    try {
      const azureStorageURL = await base64ImageUp(base64);
      setValue("event_image", azureStorageURL);
      setTmpUrl(azureStorageURL);
      return azureStorageURL;
    } catch {
      console.log("error");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-row items-center w-full max-w-4xl flex-wrap gap-10 gap-x-0"
      >
        {method === "put" && (
          <>
            <div className="w-full flex flex-col-reverse md:flex-row md:items-end">
              <div className="w-full md:w-1/2 text-2xl md:text-3xl font-bold border-b-2 border-black">
                イベント編集画面
              </div>
            </div>
          </>
        )}

        {method === "post" && (
          <>
            <div className="w-full flex flex-col-reverse md:flex-row md:items-end">
              <div className="w-full md:w-1/2 text-2xl md:text-3xl font-bold border-b-2 border-black">
                イベント作成画面
              </div>
            </div>
          </>
        )}

        {/* <img src={tmpUrl} alt="イベント画像" /> */}
        <figure className="flex items-center justify-center w-full h-auto p-4">
          <img
            src={tmpUrl ?? `${process.env.PUBLIC_URL}/images/main_1.png`}
            className="h-auto max-h-64 md:max-h-full md:h-full w-auto object-contain rounded-md"
            alt="画像がないよ"
          />
        </figure>
        <input
          type="file"
          accept="image/*"
          name="event_image"
          // readOnly
          // className="hidden"
          onChange={handleChange}
        />

        {/* 条件付きレンダリングが必要では？ */}
        {/* 選択した時点でアップロードするのはどうかな？？ */}

        <div className="w-full flex flex-col border-2 items-center rounded-md border-gray-600 gap-10 py-10 px-2">
          <div className="flex flex-col md:flex-row md:justify-around md:items-center w-full md:w-3/4 ">
            <div className="w-1/3">イベント名</div>
            <div className="w-full">
              <input
                type="text"
                placeholder="input"
                defaultValue={event?.event_name}
                {...register("event_name", { required: true })}
                className="border-2 border-gray-600 outline-1 outline-gray-700 p-2 w-full"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:justify-around md:items-center w-full md:w-3/4 ">
            <div className="w-1/3">募集文章</div>
            <div className="w-full">
              <textarea
                defaultValue={event?.event_note}
                {...register("event_note")}
                className="h-52 border-2 border-gray-600 outline-1 outline-gray-700 p-2 w-full"
              ></textarea>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:justify-around md:items-center w-full md:w-3/4 ">
            <div className="w-1/3">募集締め切り</div>
            <div className="w-full flex flex-row items-center">
              <input
                type="text"
                placeholder="input"
                defaultValue={event?.event_deadline}
                {...register("event_deadline")}
                className="border-2 border-gray-600 outline-1 outline-gray-700 p-2"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:justify-around md:items-center w-full md:w-3/4 ">
            <div className="w-1/3">開催日時</div>
            <div className="w-full flex flex-row items-center">
              <input
                type="text"
                placeholder="input"
                defaultValue={event?.event_date}
                {...register("event_date")}
                className="border-2 border-gray-600 outline-1 outline-gray-700 p-2"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:justify-around md:items-center w-full md:w-3/4 ">
            <div className="w-1/3">開催場所</div>
            <div className="w-full">
              <input
                type="text"
                placeholder="input"
                defaultValue={event?.event_place}
                {...register("event_place")}
                className="border-2 border-gray-600 outline-1 outline-gray-700 p-2"
              />
              {""}
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:justify-around md:items-center w-full md:w-3/4 ">
            <div className="w-1/3">予算</div>
            <div className="w-full">
              <input
                type="text"
                placeholder="input"
                defaultValue={event?.event_budget}
                {...register("event_budget")}
                className="border-2 border-gray-600 outline-1 outline-gray-700 p-2"
              />{" "}
              円以下
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:justify-around md:items-center w-full md:w-3/4 ">
            <div className="w-1/3">タグ</div>
            <div className="w-full">
              <div className="flex flex-row flex-wrap gap-y-2">
                {/* タグを保持するもの */}
                {allTags?.map(function (tag, i) {
                  return (
                    <label key={i} className="px-4">
                      {checkedTag?.includes(tag.tag_id) ? (
                        <>
                          <input
                            {...register("event_tags_id")}
                            type="checkbox"
                            defaultChecked={true}
                            value={tag.tag_id}
                          />
                          {tag.tag_value}
                        </>
                      ) : (
                        <>
                          <input
                            {...register("event_tags_id")}
                            type="checkbox"
                            defaultChecked={false}
                            value={tag.tag_id}
                          />
                          {tag.tag_value}
                        </>
                      )}
                    </label>
                  );
                })}
                {/* <div className="w-full md:w-36">
                  <div className="w-full flex flex-row items-center justify-around py-1 px-8 bg-gray-400/80 rounded-xl ring-2 ring-gray-200 hover:cursor-pointer">
                    <span className="text-sm mx-2 font-bold">編集</span>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:justify-around md:items-center w-full md:w-3/4 ">
            <div className="w-1/3">募集人数</div>
            <div className="w-full">
              <div className="flex flex-row flex-wrap gap-y-2">
                <div className="w-2/5 flex flex-row items-center">
                  <input
                    type="text"
                    placeholder="input"
                    defaultValue={event?.event_min_guest}
                    {...register("event_min_guest")}
                    className="border-2 border-gray-600 outline-1 outline-gray-700 p-2 w-2/3"
                  />
                  <div className="w-1/3 text-center">人</div>
                </div>
                <div className="w-1/5 flex flex-row items-center justify-center text-4xl">
                  ～
                </div>
                <div className="w-2/5 flex flex-row items-center">
                  <input
                    type="text"
                    placeholder="input"
                    defaultValue={event?.event_max_guest}
                    {...register("event_max_guest")}
                    className="border-2 border-gray-600 outline-1 outline-gray-700 p-2 w-2/3"
                  />
                  <div className="w-1/3 text-center">人</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <label>
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
        </label> */}
        {/* 
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
                      defaultChecked={true}
                      value={tag.tag_id}
                    />
                    {tag.tag_value}
                  </>
                ) : (
                  <>
                    <input
                      {...register("event_tags_id")}
                      type="checkbox"
                      defaultChecked={false}
                      value={tag.tag_id}
                    />
                    {tag.tag_value}
                  </>
                )}
              </label>
            </div>
          );
        })} */}
        {/* <label>
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
        </label> */}
        {isSubmitSuccessful && (
          <>
            <p>データを送信しました</p>
          </>
        )}

        <div className=" flex flex-row items-center justify-center w-full max-w-4xl">
          <input
            type="submit"
            className="border border-gray-300 rounded-md flex flex-col justify-center items-center py-8 px-20"
          />
        </div>
      </form>
    </>
  );
};
