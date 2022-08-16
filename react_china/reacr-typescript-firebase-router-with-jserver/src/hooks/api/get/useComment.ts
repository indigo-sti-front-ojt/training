import { useCallback, useState } from "react";
import axios from "axios";

import { Comment } from "../../../types/api/Comment";

export const useComments = () => {
  const [comments, setComments] = useState<Comment[]>();

  const getComments = useCallback((event_id: number) => {
    (async () => {
      const commentUrl = `https://icy-mushroom-0e274e110.1.azurestaticapps.net/api/comments?eventid=${event_id}`;
      try {
        const res = await axios.get<Comment[]>(commentUrl);
        setComments(res.data);
      } catch (error) {
        console.log("コメントが取得できません。");
      }
    })();
  }, []);
  return { getComments, comments };
};
