import axios from "axios";
import React, { FC, useState, ChangeEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { User } from "../../../types/api/User";

// import { useImageUp } from "../../../hooks/useImageUp";

import { MyPageState } from "../../../types/states/MyPageState";

export const MyPageEdit: FC = () => {
  // const { onClickImageUp, icondata } = useImageUp(tmpFile);

  const location = useLocation();
  const state = location.state as MyPageState;

  const checkedTag: Array<number | undefined> | undefined =
    state?.user?.user_tags?.map((checkd_tag) => checkd_tag.id);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<User>();

  setValue("user_id", state?.user.user_id);

  const onSubmit: SubmitHandler<User> = (data) => {
    console.log("onSubmit", data);
  };

  const [tmpFile, setTmpFile] = useState<File>();
  const [tmpUrl, setTmpUrl] = useState(state?.user?.user_icon);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setTmpUrl(URL.createObjectURL(e.target.files[0]));
    setTmpFile(e.target.files[0]);
  };

  const onClickImageUp = async () => {
    try {
      // 以下postリクエスト
      // await axios({
      //   url: "/upload/image/",
      //   method: "post",
      //   data: tmpFile,
      //   headers: {
      //     "content-type": "multipart/form-data",
      //   },
      // });
      const res = await axios.get("http://localhost:5000/image");
      const icon_data = res.data;
      setValue("user_icon", icon_data?.url);
    } catch {
      console.log("error");
    }
  };

  return (
    <>
      <h1>個人設定</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          アイコン
          <input
            type="file"
            accept="image/*"
            name="user_icon"
            onChange={handleChange}
          />
          <img src={tmpUrl} alt="アイコン画像" />
        </label>
        <span
          style={{ cursor: "pointer", border: "solid 1px" }}
          onClick={onClickImageUp}
        >
          UpLoad
        </span>
        <label>
          <input
            defaultValue={state?.user?.user_icon}
            {...register("user_icon", { required: true })}
          />
        </label>
        <label>
          名前
          <input
            defaultValue={state?.user?.user_nickname}
            {...register("user_nickname", { required: true })}
          />
        </label>
        {errors.user_name && (
          <span style={{ color: "red" }}>名前は必ず入力してください</span>
        )}
        <label>
          本名
          <input value={state?.user?.user_name} readOnly />
        </label>
        <label>
          所属CoE
          <input
            defaultValue={state?.user?.user_coe}
            {...register("user_coe")}
          />
        </label>
        <label>
          所属SL
          <input defaultValue={state?.user?.user_sl} {...register("user_sl")} />
        </label>
        <label>
          一言自己紹介
          <textarea
            defaultValue={state?.user?.user_comment}
            {...register("user_comment")}
          />
        </label>

        <h3>タグ</h3>
        {state?.all_tag?.map(function (tag, i) {
          return (
            <div key={i}>
              <label>
                {checkedTag?.includes(tag.id) ? (
                  <>
                    <input
                      {...register("user_tags_id")}
                      type="checkbox"
                      value={tag.id}
                      checked
                    />
                    {tag.value}
                  </>
                ) : (
                  <>
                    <input
                      {...register("user_tags_id")}
                      type="checkbox"
                      value={tag.id}
                    />
                    {tag.value}
                  </>
                )}
              </label>
            </div>
          );
        })}

        <h3>SNS</h3>
        <label>
          メール
          <input
            defaultValue={state?.user?.user_email}
            {...register("user_email", { required: true })}
          />
        </label>
        {errors.user_email && (
          <span style={{ color: "red" }}>メールは必ず入力してください</span>
        )}
        <label>
          instagram
          <input
            defaultValue={state?.user?.user_instagramid}
            {...register("user_instagramid")}
          />
        </label>
        <label>
          twitter
          <input
            defaultValue={state?.user?.user_twitterid}
            {...register("user_twitterid")}
          />
        </label>
        <label>
          facebook
          <input
            defaultValue={state?.user?.user_facebookid}
            {...register("user_facebookid")}
          />
        </label>
        <label>
          LINE QRコード
          <textarea
            defaultValue={state?.user?.user_lineqr}
            {...register("user_lineqr")}
          />
        </label>
        <input type="submit" />
      </form>
    </>
  );
};
