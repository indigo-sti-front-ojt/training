import axios from "axios";
import React, { FC, useState, ChangeEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { User } from "../../../types/api/User";
import { useAllTagsContext } from "../../../context/AllTagsContext";
import { useUserInfoContext } from "../../../context/UserInfoContext";

// import { useImageUp } from "../../../hooks/useImageUp";

export const MyPageEdit: FC = () => {
  // const { onClickImageUp, icondata } = useImageUp(tmpFile);

  const { allTags } = useAllTagsContext();
  const { userInfo } = useUserInfoContext();

  const checkedTag: Array<number | undefined> | undefined =
    userInfo?.user_tags?.map((checkd_tag) => checkd_tag.tag_id);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<User>();

  setValue("user_id", userInfo?.user_id);

  const onSubmit: SubmitHandler<User> = (data) => {
    console.log("onSubmit", data);
  };

  const [tmpFile, setTmpFile] = useState<File>();
  const [tmpUrl, setTmpUrl] = useState(userInfo?.user_icon);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setTmpUrl(URL.createObjectURL(e.target.files[0]));
    setTmpFile(e.target.files[0]);
  };

  const onClickImageUp = async () => {
    try {
      // 以下postリクエスト
      await axios({
        url: "https://icy-mushroom-0e274e110.1.azurestaticapps.net/api/upload_image/",
        method: "post",
        data: tmpFile,
        headers: {
          "content-type": "multipart/form-data",
        },
      });
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
            defaultValue={userInfo?.user_icon}
            {...register("user_icon", { required: true })}
          />
        </label>
        <label>
          名前
          <input
            defaultValue={userInfo?.user_nickname}
            {...register("user_nickname", { required: true })}
          />
        </label>
        {errors.user_name && (
          <span style={{ color: "red" }}>名前は必ず入力してください</span>
        )}
        <label>
          本名
          <input value={userInfo?.user_name} readOnly />
        </label>
        <label>
          所属CoE
          <input defaultValue={userInfo?.user_coe} {...register("user_coe")} />
        </label>
        <label>
          所属SL
          <input defaultValue={userInfo?.user_sl} {...register("user_sl")} />
        </label>
        <label>
          一言自己紹介
          <textarea
            defaultValue={userInfo?.user_comment}
            {...register("user_comment")}
          />
        </label>

        <h3>タグ</h3>
        {allTags?.map(function (tag, i) {
          return (
            <div key={i}>
              <label>
                {checkedTag?.includes(tag.tag_id) ? (
                  <>
                    <input
                      {...register("user_tags_id")}
                      type="checkbox"
                      value={tag.tag_id}
                      checked
                    />
                    {tag.tag_value}
                  </>
                ) : (
                  <>
                    <input
                      {...register("user_tags_id")}
                      type="checkbox"
                      value={tag.tag_id}
                    />
                    {tag.tag_value}
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
            defaultValue={userInfo?.user_email}
            {...register("user_email", { required: true })}
          />
        </label>
        {errors.user_email && (
          <span style={{ color: "red" }}>メールは必ず入力してください</span>
        )}
        <label>
          instagram
          <input
            defaultValue={userInfo?.user_instagramid}
            {...register("user_instagramid")}
          />
        </label>
        <label>
          twitter
          <input
            defaultValue={userInfo?.user_twitterid}
            {...register("user_twitterid")}
          />
        </label>
        <label>
          facebook
          <input
            defaultValue={userInfo?.user_facebookid}
            {...register("user_facebookid")}
          />
        </label>
        <label>
          LINE QRコード
          <textarea
            defaultValue={userInfo?.user_lineqr}
            {...register("user_lineqr")}
          />
        </label>
        <input type="submit" />
      </form>
    </>
  );
};
