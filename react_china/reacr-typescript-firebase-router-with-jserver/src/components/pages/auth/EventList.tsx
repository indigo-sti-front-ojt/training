import React, { useEffect, useState } from "react";
import { EventSerchForm } from "../../organisms/EventsSearchForm";
import { Event } from "../../../types/api/Event";
import { EventSearchResult } from "../../organisms/EventSearchResult";
import { useLocation } from "react-router-dom";
import { SearchEventList } from "../../../types/react-hook-form/SearchEventList";

type State = {
  genreData?: SearchEventList;
};

export const EventList = () => {
  const [events, setEvents] = useState<Event[]>();
  const [genreData, setGenreData] = useState<State>();

  // ジャンルのタグ情報を読み込む
  const location = useLocation();
  useEffect(() => {
    if (location.state) setGenreData(location.state as State);
  }, []);

  return (
    <>
      {/* 検索フォームと検索結果を別々のコンポーネントで書いてもらえるとうれしいね */}
      {genreData ? (
        <>
          <EventSerchForm setEvents={setEvents} genreData={genreData?.genreData} />
        </>
      ) : (
        <>
          <EventSerchForm setEvents={setEvents} />
        </>
      )}
      <EventSearchResult events={events} />
    </>
  );
};
