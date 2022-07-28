import React, { useEffect, FC } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAndTags } from "../../../hooks/useUserAndTags";

export const MyPage: FC = () => {
  const { getUserAndTags, loading, user,tags } = useUserAndTags();
  useEffect(() => getUserAndTags(), []);
  

  const navigate = useNavigate();
  const onClickButtonToEdit = () => {
    navigate("edit", {
      state: {
        user_icon: user?.user_icon,
        user_nickname: user?.user_nickname,
        user_name: user?.user_name,
        user_coe: user?.user_coe,
        user_sl: user?.user_sl,
        user_bio: user?.user_bio,
        user_tags: user?.user_tags,
        user_email: user?.user_email,
        user_instagramid: user?.user_instagramid,
        user_twitterid: user?.user_twitterid,
        user_facebookid: user?.user_facebookid,
        user_lineqr: user?.user_lineqr,
        tags: tags
      },
    });
  };
  return (
    <>
      {loading ? (
        <>
          <p>ローディング...</p>
        </>
      ) : (
        <>
          <h1>MyPageページです。</h1>
          <h2>参加予定のイベント</h2>
          <hr />
          {user?.join_event.map((event, i) => (
            <>
              <div key={i}>
                <p>あと{event.event_left_date}日</p>
                <img src={event.event_imgurl} alt="イベント画像" />
                <p>{event.event_created_date}</p>
                <p>{event.event_name}</p>
                <p>{event.event_owner_icon}</p>
                <p>主催：{event.event_owner}</p>
                <p>場所：{event.event_place}</p>
                <p>予算：{event.event_budget}円</p>
                <p>
                  人数：{event.event_guest_id.length}/{event.event_max_guest}
                </p>
              </div>
              <hr />
            </>
          ))}
          <h2>主催イベント</h2>
          <hr />
          {user?.host_event.map((event, i) => (
            <>
              <div key={i}>
                <p>あと{event.event_left_date}日</p>
                <img src={event.event_imgurl} alt="イベント画像" />
                <p>{event.event_created_date}</p>
                <p>{event.event_name}</p>
                <p>{event.event_owner_icon}</p>
                <p>主催：{event.event_owner}</p>
                <p>場所：{event.event_place}</p>
                <p>予算：{event.event_budget}円</p>
                <p>
                  人数：{event.event_guest_id.length}/{event.event_max_guest}
                </p>
              </div>
              <hr />
            </>
          ))}
          <h2>個人設定</h2>
          <p>アイコン: {user?.user_icon}</p>
          <p>名前: {user?.user_nickname}</p>
          <p>本名: {user?.user_name}</p>
          <p>所属CoE: {user?.user_coe}</p>
          <p>所属SL: {user?.user_sl}</p>
          <p>自己紹介: {user?.user_bio}</p>
          <p>
            興味あるタグ:
            {tags.map((tag, i) => (
              <>
                <div key={i}>
                {user?.user_tags.includes(tag.id) ? <span style={{ color: tag.color }}>{tag.value}</span>: false}
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
          <button type="button" onClick={onClickButtonToEdit}>
            編集する
          </button>
          <hr />
          <h2>過去に参加したイベント</h2>
          <hr />
          {user?.past_event.map((event, i) => (
            <>
              <div key={i}>
                <p>あと{event.event_left_date}日</p>
                <img src={event.event_imgurl} alt="イベント画像" />
                <p>{event.event_created_date}</p>
                <p>{event.event_name}</p>
                <p>{event.event_owner_icon}</p>
                <p>主催：{event.event_owner}</p>
                <p>場所：{event.event_place}</p>
                <p>予算：{event.event_budget}円</p>
                <p>
                  人数：{event.event_guest_id.length}/{event.event_max_guest}
                </p>
              </div>
              <hr />
            </>
          ))}
        </>
      )}
    </>
  );
};
