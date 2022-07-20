import React, { useState, FC } from "react";

import axios, { AxiosResponse } from "axios";

// モックサーバーのurl db.json
const membersUrl = "http://localhost:3100/members";

type Member = {
  id: string;
  name: string;
};

export const HttpSample: FC = () => {
  const [members, setMembers] = useState<Member[]>([]);

  const onClickFetch = async () => {
    const res: AxiosResponse<Member[]> = await axios.get(membersUrl);
    setMembers(res.data);
  };

  return (
    <>
      <button onClick={onClickFetch}>APIサーバよりmemberデータ取得</button>
      {members.length != 0 && (
        <>
          <ul>
            {members.map((member) => (
              <li key={member.id}>
                {`[id] = ${member.id} [name] = ${member.name}`}
              </li>
            ))}
          </ul>
          <p>{members.length}人</p>
        </>
      )}
    </>
  );
};
