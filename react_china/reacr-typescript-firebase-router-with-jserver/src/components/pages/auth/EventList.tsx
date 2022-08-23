import React from "react";
import { EventSerchForm } from "../../organisms/EventsSearchForm";

export const EventList = () => {
  return (
    <>
      {/* 検索フォームと検索結果を別々のコンポーネントで書いてもらえるとうれしいね */}
      <EventSerchForm />
    </>
  );
};
