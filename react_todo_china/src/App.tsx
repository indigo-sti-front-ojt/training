import React, { Suspense, useState } from "react";
import { useForm } from "react-hook-form";

import { useTodoApi } from "./hooks/useTodoApi";

import { Tags } from "./components/Tags";
import { typeTodo } from "./types/typeTodo";
import { TagTodos } from "./components/TagTodos";

type TagFormValue = {
  tag: string;
};

function App() {
  const { getTags, getTagTodos, addTodos } = useTodoApi();

  // データ取得用のstateを定義
  const [tags, setTags] = useState<string[] | null>(null);
  const [todos, setTodos] = useState<typeTodo[] | null>(null);

  // react-hook-form関連
  const { register, handleSubmit, setValue } = useForm<TagFormValue>();
  const onSubmit = async (data: TagFormValue) => {
    await addTodos(data.tag);
    setValue("tag", "");
  };

  return (
    <div className="App">
      <>
        <Suspense fallback={<p>loading</p>}>
          <h3>Tag編集エリア</h3>
          <p>全タグの表示</p>
          <Tags val={tags} setState={setTags} getTags={getTags} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register("tag")} />
            <button type="submit">送信</button>
          </form>

          <h3>Todo編集エリア</h3>
          <TagTodos val={todos} setState={setTodos} getTagTodos={getTagTodos} />
          {todos && todos.map((todo) => todo.text)}
        </Suspense>
      </>
    </div>
  );
}

export default App;
