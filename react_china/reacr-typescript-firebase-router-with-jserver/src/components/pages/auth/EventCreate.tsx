import React, { FC } from "react";

import { EventCreateEditForm } from "../../organisms/EventCreateEditForm";

export const EventCreate: FC = () => {
  return (
    <>
      <h2>イベント作成</h2>
      <EventCreateEditForm />
    </>
  );
};
