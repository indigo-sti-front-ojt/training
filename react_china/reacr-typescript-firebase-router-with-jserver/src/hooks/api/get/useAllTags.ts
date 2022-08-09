import { useCallback, useState } from "react";
import axios from "axios";

import { Tag } from "../../../types/api/Tag";
import { useAllTagsContext } from "../../../context/AllTagsContext";

export const useAllTags = () => {
  const { setAllTags } = useAllTagsContext();
  const [tagsLoading, setTagsLoading] = useState<boolean>(false);
  const tagsurl = "http://localhost:5000/tags";

  const getAllTags = useCallback(() => {
    (async () => {
      try {
        const res_tags = await axios.get<Array<Tag>>(tagsurl);
        setAllTags(res_tags.data);
      } catch (error) {
        console.log("タグが取得できません");
      } finally {
        setTagsLoading(false);
      }
    })();
  }, []);
  return { getAllTags };
};
