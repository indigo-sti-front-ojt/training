import React, { FC, useEffect } from "react";

import { useEventHome } from "../../../hooks/api/get/useEventHome";
import { EventCard } from "../../organisms/EventCatd";
import { LinkToEventSearch } from "../../organisms/LinkToEventSearch";
import { GenreSearchCard } from "../../organisms/GenreSearchCard";
import { CreateNewEventButton } from "../../atoms/buttons/CreateNewEventButton";
import { useLoginUserContext } from "../../../context/LoginUserContext";

export const Home: FC = () => {
  const { loginuser } = useLoginUserContext();


  const { getHomeEvents, nearEvents, tagEvents, homeEventsLoading } = useEventHome();

  useEffect(() => getHomeEvents(), []);

  return (
    <>
      {homeEventsLoading ? (
        <>
          <p>ローディング...</p>
        </>
      ) : (
        <>
          <CreateNewEventButton />

          <LinkToEventSearch />
          <h2>ジャンルから探す</h2>
          <GenreSearchCard tag_id="2" tag_name="飲み会" />
          <GenreSearchCard tag_id="4" tag_name="ゲーム" />
          <GenreSearchCard tag_id="1" tag_name="アウトドア" />
          <GenreSearchCard tag_id="3" tag_name="勉強" />

          <h2>締め切りが近いイベント</h2>
          <hr />
          {nearEvents?.map((event, i) => (
            <>
              <div key={i}>
                <EventCard event={event} />
              </div>
            </>
          ))}
          <h2>あなたが関心ありそうなイベント</h2>
          <hr />
          {tagEvents?.map((event, i) => (
            <>
              <div key={i}>
                <EventCard event={event} />
              </div>
            </>
          ))}
        </>
      )}
    </>
  );
};
