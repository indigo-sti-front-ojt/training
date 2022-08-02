import { useCallback, useState } from "react";
import axios from "axios";

import { Tag } from "../types/api/Tag";

export const useAllTags = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [all_tag, setAllTag] = useState<Array<Tag>>([]);
  const tagsurl = "http://localhost:5000/tags";

  const getAllTags = useCallback(() => {
    (async () => {
      try {
        const res_tags = await axios.get<Array<Tag>>(tagsurl);
        setAllTag(res_tags.data);
      } catch (error) {
        console.log("タグが取得できません");
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return { getAllTags, loading, all_tag };
};
