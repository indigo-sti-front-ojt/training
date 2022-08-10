import { useCallback, useState } from "react";
import axios from "axios";

import { Comment } from "../../../types/api/Comment";

export const useComments = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[]>();

  const getComments = useCallback((event_id: number) => {
    (async () => {
      const commentUrl = `http://localhost:5000/comments?eventid=${event_id}`;
      try {
        const res = await axios.get<Comment[]>(commentUrl);
        setComments(res.data);
        
      } catch (error) {
        console.log("コメントが取得できません。");
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return { getComments, loading, comments };
};
