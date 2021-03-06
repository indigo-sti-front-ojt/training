import { useCallback, useState } from "react";
import axios from "axios";

import { User } from "../types/api/User";
import { Tag } from "../types/api/Tag";


export const useUserAndTags = (userID:string|undefined) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User>();
  const mydataurl = "http://localhost:5000/users?" + userID;
  const [all_tag, setAllTag] = useState<Array<Tag>>([]);
  const tagsurl = "http://localhost:5000/tags";

  const getUserAndTags = useCallback(() => {
    (async () => {
      try {
        const res_user = await axios.get<User>(mydataurl);
        setUser(res_user.data);
        const res_tags = await axios.get<Array<Tag>>(tagsurl);
        setAllTag(res_tags.data);
      } catch (error) {
        console.log("ユーザーまたはタグが取得できません");
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return { getUserAndTags, loading, user, all_tag };
};
