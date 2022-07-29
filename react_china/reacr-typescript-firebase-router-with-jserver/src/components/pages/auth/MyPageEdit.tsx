import React, { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useLocation } from "react-router-dom";

import { MyPageState } from "../../../types/MyPageState";

export const MyPageEdit: FC = () => {
  const location = useLocation();
  const user = location.state as MyPageState;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<MyPageState>();
  const onSubmit: SubmitHandler<MyPageState> = (data) => {
    console.log("onSubmit", data);
    console.log("watch:", watch("user_name"));
  };

  return (
    <>
      <h1>個人設定</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          アイコン
          <textarea defaultValue={user?.user_icon} {...register("user_icon")} />
        </label>
        <label>
          名前
          <input
            defaultValue={user?.user_nickname}
            {...register("user_name", { required: true })}
          />
        </label>
        {errors.user_name && (
          <span style={{ color: "red" }}>名前は必ず入力してください</span>
        )}
        <label>
          本名
          <input defaultValue={user?.user_name} readOnly />
        </label>
        <label>
          所属CoE
          <input defaultValue={user?.user_coe} {...register("user_coe")} />
        </label>
        <label>
          所属SL
          <input defaultValue={user?.user_sl} {...register("user_sl")} />
        </label>
        <label>
          一言自己紹介
          <textarea defaultValue={user?.user_bio} {...register("user_bio")} />
        </label>

        <h3>タグ</h3>
        {user.tags.map((tag, i) => (
          <>
            <div key={i}>
              <label>
                {user?.user_tags.includes(tag.id) ? (
                  <>
                    <input
                      {...register("user_tags")}
                      type="checkbox"
                      value={tag.id}
                      checked
                    />
                    {tag.value}
                  </>
                ) : (
                  <>
                    <input
                      {...register("user_tags")}
                      type="checkbox"
                      value={tag.id}
                    />
                    {tag.value}
                  </>
                )}
              </label>
            </div>
          </>
        ))}

        <h3>SNS</h3>
        <label>
          メール
          <input
            defaultValue={user?.user_email}
            {...register("user_email", { required: true })}
          />
        </label>
        {errors.user_email && (
          <span style={{ color: "red" }}>メールは必ず入力してください</span>
        )}
        <label>
          instagram
          <input
            defaultValue={user?.user_instagramid}
            {...register("user_instagramid")}
          />
        </label>
        <label>
          twitter
          <input
            defaultValue={user?.user_twitterid}
            {...register("user_twitterid")}
          />
        </label>
        <label>
          facebook
          <input
            defaultValue={user?.user_facebookid}
            {...register("user_facebookid")}
          />
        </label>
        <label>
          LINE QRコード
          <textarea
            defaultValue={user?.user_lineqr}
            {...register("user_lineqr")}
          />
        </label>
        <input type="submit" />
      </form>
    </>
  );
};
