import React, { FC } from "react";

import { EventCreateEditForm } from "../../organisms/EventCreateEditForm";

export const EventCreate: FC = () => {
  return (
    <>
      <EventCreateEditForm method={"post"} />
    </>
  );
};
