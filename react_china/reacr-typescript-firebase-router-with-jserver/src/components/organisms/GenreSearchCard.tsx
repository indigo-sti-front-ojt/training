import React from "react";
import { Link } from "react-router-dom";

type Props = {
  tag_id: string;
  tag_name: string;
};

export const GenreSearchCard = (props: Props) => {
  const { tag_id, tag_name } = props;
  const url = "events?tagid=" + tag_id;
  return (
    <>
      <Link to={url}>{tag_name}</Link>
    </>
  );
};
