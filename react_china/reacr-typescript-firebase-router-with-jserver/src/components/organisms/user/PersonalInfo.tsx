import React from "react";
import { FC } from "react";

import { Tag } from "../../../types/api/Tag";
import { useLoginUserContext } from "../../../context/LoginUserContext";

type Props = {
  user_id?: string;
  user_icon?: string;
  user_nickname?: string;
  user_name?: string;
  user_coe?: string;
  user_sl?: string;
  user_bio?: string;
  user_tags?: Tag[];
  user_email?: string;
  user_instagramid?: string;
  user_twitterid?: string;
  user_facebookid?: string;
  user_lineqr?: string;
  onClickButtonToEdit?: () => void;
};

export const PersonalInfo: FC<Props> = (props: Props) => {
  const { loginuser } = useLoginUserContext();
  const {
    user_id,
    user_icon,
    user_nickname,
    user_name,
    user_coe,
    user_sl,
    user_bio,
    user_tags,
    user_email,
    user_instagramid,
    user_twitterid,
    user_facebookid,
    user_lineqr,
    onClickButtonToEdit,
  } = props;
  return (
    <>
      <h2>個人設定</h2>
      <p>アイコン画像</p>
      <img src={user_icon} alt="ユーザーアイコン" />
      <p>名前: {user_nickname}</p>
      <p>本名: {user_name}</p>
      <p>所属CoE: {user_coe}</p>
      <p>所属SL: {user_sl}</p>
      <p>自己紹介: {user_bio}</p>
      <p>
        興味あるタグ:
        {user_tags?.map((tag, i) => (
          <>
            <div key={i}>
              <span style={{ color: tag.color }}>{tag.value}</span>
            </div>
          </>
        ))}
      </p>
      <h3>SNS</h3>
      <p>メール:{user_email}</p>
      <p>instagram:{user_instagramid}</p>
      <p>twitter:{user_twitterid}</p>
      <p>facebook:{user_facebookid}</p>
      <img src={user_lineqr} alt="ラインQRコード" />

      {loginuser?.uid === user_id ? (
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
