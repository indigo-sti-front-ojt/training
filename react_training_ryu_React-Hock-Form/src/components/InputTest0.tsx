import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  example: string;
  exampleRequired: string;
};

export const InputTest0 = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("onSubmit:", data);
  };
  console.log("watch:", watch("example")); // watchは引数に渡した名前の入力値を監視する
  return (
    <>
      <div>test</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register関数の呼び出しにより、フォーム入力の要素を引数の名前で登録する */}
        <input defaultValue="test" {...register("example")} />
        {/* register関数の第2引数には、HTML標準フォームデータ検証のルールが渡せる */}
        <input {...register("exampleRequired", { required: true })} />
        {/* データ検証に失敗するとerrorsが返され、登録した名前で取り出せる */}
        {errors.exampleRequired && (
          <span style={{ color: "red" }}>This field is required</span>
        )}
        <input type="submit" />
      </form>
    </>
  );
};
