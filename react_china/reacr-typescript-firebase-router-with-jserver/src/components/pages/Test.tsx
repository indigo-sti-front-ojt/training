import React, { useEffect } from "react";

import { useAllTags } from "../../hooks/api/get/useAllTags";
import { useAllTagsContext } from "../../context/AllTagsContext";

export const Test = () => {
  const { getAllTags } = useAllTags();
  useEffect(() => getAllTags(), []);
  const { allTags } = useAllTagsContext();
  return (
    <>
      {allTags.map((tags, i) => (
        <>
          <div key={i}>
            <p>{tags.value}</p>
          </div>
        </>
      ))}
      <p>Testページです。</p>
    </>
  );
};
