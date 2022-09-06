import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { SearchEventList } from "../../../types/react-hook-form/SearchEventList";
import { useEventSearch } from "../../../hooks/api/get/useEventSearch";
import { useAllTagsContext } from "../../../context/AllTagsContext";
import { Event } from "../../../types/api/Event";

type Props = {
  setEvents: React.Dispatch<React.SetStateAction<Event[] | undefined>>;
  events?: Event[];
  genreData?: SearchEventList;
};

// どうやってやる? stateで読み込んだ値をフォームに入れ、検索まで行う
// 1.フォームに入れる
// 2.タグをpropsで、読み込んで来た場合検索結果を表示する
// ここで1と2を行う

export const EventSerchForm = (props: Props) => {
  const { allTags } = useAllTagsContext();
  const { setEvents, genreData } = props;

  const { getSearchEvents } = useEventSearch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchEventList>({
    defaultValues: {
      tagsid: [],
    },
  });

  const onSubmit: SubmitHandler<SearchEventList> = async (data) => {
    const temp = {
      ...data,
      // budget: Number(data.budget),
      // minguest: Number(data.minguest),
      // maxguest: Number(data.maxguest),
      tags: data?.tagsid?.map(Number),
    };
    console.log("onSubmit", temp);
    const eventsdata = await getSearchEvents(data);
    setEvents(eventsdata);
  };

  const genreEventSet = async (genreData?: SearchEventList) => {
    const eventsdata = await getSearchEvents(genreData);
    setEvents(eventsdata);
  };

  useEffect(() => {
    genreEventSet(genreData);
  }, [genreData]);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-3/4 m-2 p-4 gap-4 shadow-xl rounded max-w-4xl md:flex-row md:flex-wrap md:w-auto md:gap-0 md:gap-y-6 my-10"
      >
        <div className="flex flex-col justify-center w-full text-xl md:w-full gap-1">
          <div className="font-bold">タグ</div>
          <div className="flex flex-row flex-wrap gap-y-2">
            {/* タグの表示 */}
            {genreData ? (
              <>
                {/* <p>stateでタグが渡された</p> */}
                {allTags?.map((alltag) => {
                  return (
                    <>
                      {genreData.tagsid &&
                      genreData.tagsid.includes(alltag.tag_id) ? (
                        // (tag.tag_id === genreData.tagsid[0]) ? (
                        <>
                          <label key={alltag.tag_id} className="px-4">
                            <input
                              type="checkbox"
                              {...register("tagsid")}
                              value={alltag.tag_id}
                              defaultChecked={true}
                            />
                            {alltag.tag_value}
                          </label>
                        </>
                      ) : (
                        <>
                          <label key={alltag.tag_id} className="px-4">
                            <input
                              type="checkbox"
                              {...register("tagsid")}
                              value={alltag.tag_id}
                              defaultChecked={false}
                            />
                            {alltag.tag_value}
                          </label>
                        </>
                      )}
                    </>
                  );
                })}
              </>
            ) : (
              <>
                {/* <p>stateでタグが渡されてない</p> */}
                {allTags?.map((tag) => (
                  <label key={tag.tag_id} className="px-4">
                    <input
                      type="checkbox"
                      {...register("tagsid")}
                      value={tag.tag_id}
                      defaultChecked={false}
                    />
                    {tag.tag_value}
                  </label>
                ))}
              </>
            )}
            {/* {allTags?.map((tag, i) => (
              <label key={i} className="px-4">
                <input
                  type="checkbox"
                  {...register("tagsid")}
                  value={tag.tag_id}
                  defaultChecked={false}
                />
                {tag.tag_value}
              </label>
            ))} */}
            {/* <div className="w-full md:w-36 hover:cursor-pointer">
              <div className="w-full flex flex-row items-center justify-around py-1 px-8 bg-gray-400/80 rounded-xl ring-2 ring-gray-200">
                <span className="text-sm mx-2 font-bold">選択する</span>
              </div>
            </div> */}
          </div>
        </div>

        {/* <div className="flex flex-col justify-center w-full text-xl md:w-full gap-1">
          <div className="font-bold">場所</div>
          <div className="flex flex-row flex-wrap gap-y-2"> */}
        {/* タグの表示 */}
        {/* <div className="w-full md:w-36 hover:cursor-pointer">
              <div className="w-full flex flex-row items-center justify-around py-1 px-8 bg-gray-400/80 rounded-xl ring-2 ring-gray-200">
                <span className="text-sm mx-2 font-bold">選択する</span>
              </div>
            </div>
          </div>
        </div> */}

        <div className="flex flex-col justify-center w-full text-xl md:w-1/2 gap-1">
          <div className="font-bold">募集人数</div>
          <div className="flex flex-row flex-wrap gap-y-2">
            <div className="w-2/5 flex flex-row items-center">
              <input
                type="number"
                placeholder="0"
                defaultValue=""
                {...register("minguest")}
                className="border-2 border-gray-600 outline-1 outline-gray-700 p-2 w-2/3"
              />
              <div className="w-1/3 text-center">人</div>
            </div>
            <div className="w-1/5 flex flex-row items-center justify-center text-4xl">
              ～
            </div>
            <div className="w-2/5 flex flex-row items-center">
              <input
                type="number"
                placeholder="5"
                defaultValue=""
                {...register("maxguest")}
                className="border-2 border-gray-600 outline-1 outline-gray-700 p-2 w-2/3"
              />
              <div className="w-1/3 text-center">人</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center w-full text-xl md:w-1/2 gap-1">
          <div className="font-bold">予算</div>
          <div className="flex flex-row flex-wrap gap-y-2 justify-center items-center">
            <input
              type="number"
              placeholder="2000"
              defaultValue=""
              {...register("budget")}
              className="border-2 border-gray-600 outline-1 outline-gray-700 p-2 w-2/3"
            />
            <div>円以下</div>
          </div>
        </div>

        <div className="flex flex-col justify-center w-full text-xl md:w-1/2 gap-1">
          <div className="font-bold">日程</div>
          <div className="flex flex-row flex-wrap gap-y-2">
            <div className="w-2/5 flex flex-row items-center">
              <input
                type="text"
                placeholder="2022-10-25"
                defaultValue=""
                {...register("fromdate", {
                  pattern: {
                    value: /^\d{4}-\d{2}-\d{2}$/,
                    message: "日程（検索開始）の値が不正です",
                  },
                })}
                className="border-2 border-gray-600 outline-1 outline-gray-700 p-2 w-2/3"
              />
              <div className="w-1/3 flex justify-center items-center">
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
            <div className="w-1/5 flex flex-row items-center justify-center text-4xl">
              ～
            </div>
            <div className="w-2/5 flex flex-row items-center">
              <input
                type="text"
                placeholder="2022-10-30"
                defaultValue=""
                {...register("todate", {
                  pattern: {
                    value: /^\d{4}-\d{2}-\d{2}$/,
                    message: "日程（検索終了）の値が不正です",
                  },
                })}
                className="border-2 border-gray-600 outline-1 outline-gray-700 p-2 w-2/3"
              />
              <div className="w-1/3 flex justify-center items-center">
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
          </div>
        </div>

        <div className="flex flex-col justify-center w-full text-xl md:items-end">
          <label className="w-full flex flex-row items-center justify-center py-4 px-8 bg-gray-400/80 rounded-xl ring-2 ring-gray-200 md:w-36 hover:cursor-pointer">
            <span className="text-sm mx-2 font-bold">検索</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            <input type="submit" className="hidden" />
          </label>
        </div>

        {errors.fromdate && (
          // 検索開始日付エラー
          <>
            <p>{errors.fromdate?.message}</p>
          </>
        )}
        {errors.todate && (
          // 検索終了日付エラー
          <>
            <p>{errors.todate?.message}</p>
          </>
        )}
      </form>
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

      {/* <div className="flex flex-col md:flex-row items-center w-full max-w-4xl flex-wrap gap-2">
        <div className="w-full text-2xl md:text-3xl font-bold border-b-2 border-black">
          検索結果
        </div> */}
      {/* event 検索結果 */}
      {/* {events?.map((event, i) => (
          <>
            <EventCard key={i} event={event} />
          </>
        ))}
      </div> */}
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
