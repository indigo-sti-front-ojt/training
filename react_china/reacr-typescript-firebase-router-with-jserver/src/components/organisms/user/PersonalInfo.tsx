import React from "react";
import { FC } from "react";

import { useLoginUserContext } from "../../../context/LoginUserContext";
import { User } from "../../../types/api/User";

type Props = {
  user?: User;
  onClickButtonToEdit?: () => void;
};

export const PersonalInfo: FC<Props> = (props: Props) => {
  const { loginUser } = useLoginUserContext();
  const { user, onClickButtonToEdit } = props;
  return (
    <>
      <h2>個人設定</h2>
      <p>アイコン画像</p>
      <img src={user?.user_icon} alt="ユーザーアイコン" />
      <p>名前: {user?.user_nickname}</p>
      <p>本名: {user?.user_name}</p>
      <p>所属CoE: {user?.user_coe}</p>
      <p>所属SL: {user?.user_sl}</p>
      <p>自己紹介: {user?.user_comment}</p>
      <p>
        興味あるタグ:
        {user?.user_tags?.map((tag, i) => (
          <>
            <div key={i}>
              <span style={{ color: tag.color }}>{tag.value}</span>
            </div>
          </>
        ))}
      </p>
      <h3>SNS</h3>
      <p>メール:{user?.user_email}</p>
      <p>instagram:{user?.user_instagramid}</p>
      <p>twitter:{user?.user_twitterid}</p>
      <p>facebook:{user?.user_facebookid}</p>
      <img src={user?.user_lineqr} alt="ラインQRコード" />

      {loginUser?.uid === user?.user_id ? (
        <>
          <button type="button" onClick={onClickButtonToEdit}>
            編集する
          </button>
        </>
      ) : (
        ""
      )}

      <hr />
    </>
  );
};
