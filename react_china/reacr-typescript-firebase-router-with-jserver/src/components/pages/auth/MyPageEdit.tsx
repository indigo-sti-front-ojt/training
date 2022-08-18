import React, { FC, useState, ChangeEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { User } from "../../../types/api/User";
import { useAllTagsContext } from "../../../context/AllTagsContext";
import { useUserInfoContext } from "../../../context/UserInfoContext";
import { useUserCreateEdit } from "../../../hooks/api/postPutDelete/useUserCreateEdit";
import { useUser } from "../../../hooks/api/get/useUser";
import { useLoginUserContext } from "../../../context/LoginUserContext";
import { useBase64ImageUp } from "../../../hooks/api/postPutDelete/useBase64ImageUp";

// import { useImageUp } from "../../../hooks/useImageUp";

export const MyPageEdit: FC = () => {
  // image upload用のhooksの定義
  const { base64ImageUp } = useBase64ImageUp();

  // ログインユーザーの情報を取得
  const { loginUser } = useLoginUserContext();
  const { allTags } = useAllTagsContext();
  const { userInfo } = useUserInfoContext();

  // ユーザー情報更新のためのhooksを定義
  const { getUser } = useUser();

  const checkedTag: Array<number | undefined> | undefined =
    userInfo?.user_tags?.map((checkd_tag) => checkd_tag.tag_id);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitSuccessful },
  } = useForm<User>({
    defaultValues: {
      user_tags_id: [],
    },
  });

  setValue("user_id", userInfo?.user_id);

  // ユーザー編集のhooksの読み込み
  const { userCreateEdit } = useUserCreateEdit();

  const onSubmit: SubmitHandler<User> = async (data: User) => {
    const temp: User = {
      ...data,
      user_tags_id: data.user_tags_id?.map(Number),
    };
    await userCreateEdit("put", temp);
    getUser(loginUser?.uid);
    console.log("temp", temp);
  };

  const [tmpUrl, setTmpUrl] = useState(userInfo?.user_icon);
  const [tmpLineUrl, setTmpLineUrl] = useState(userInfo?.user_lineqr);
  const [base64, setBase64] = useState<string>("");
  const [base64QR, setBase64QR] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setTmpUrl(URL.createObjectURL(e.target.files[0]));
    const file = e.target.files[0];
    convertToBase64("icon", file);
  };

  const handleChangeLine = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setTmpLineUrl(URL.createObjectURL(e.target.files[0]));
    const file = e.target.files[0];
    convertToBase64("qr", file);
  };

  const convertToBase64 = (key: string, file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64URI: string = reader.result as string;
      const tempBase64: string = base64URI.replace(/data:.*\/.*;base64,/, "");
      console.log(tempBase64);
      if (key === "icon") setBase64(tempBase64);
      if (key === "qr") setBase64QR(tempBase64);
    };
  };

  const onClickImageUserIconUp = async () => {
    try {
      const azureStorageURL = await base64ImageUp(base64);
      setValue("user_icon", azureStorageURL);
    } catch {
      console.log("error");
    }
  };

  const onClickImageLineQRUp = async () => {
    try {
      const azureStorageURL = await base64ImageUp(base64QR);
      setValue("user_lineqr", azureStorageURL);
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
          onClick={onClickImageUserIconUp}
        >
          UpLoad
        </span>
        <label>
          <textarea
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
                      defaultChecked={true}
                      value={tag.tag_id}
                    />
                    {tag.tag_value}
                  </>
                ) : (
                  <>
                    <input
                      {...register("user_tags_id")}
                      type="checkbox"
                      defaultChecked={false}
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

        <label>
          LINE QRコード
          <input
            type="file"
            accept="image/*"
            name="user_lineqr"
            onChange={handleChangeLine}
          />
          <img src={tmpLineUrl} alt="アイコン画像" />
        </label>
        <span
          style={{ cursor: "pointer", border: "solid 1px" }}
          onClick={onClickImageLineQRUp}
        >
          UpLoad
        </span>
        <label>
          <textarea
            defaultValue={userInfo?.user_lineqr}
            {...register("user_lineqr")}
          />
        </label>
        {isSubmitSuccessful && (
          <>
            <p>編集が完了しました</p>
          </>
        )}
        <input type="submit" />
      </form>
    </>
  );
};
