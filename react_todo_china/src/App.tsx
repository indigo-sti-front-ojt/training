import React, { Suspense, useState } from "react";
import { useTodoApi } from "./hooks/useTodoApi";
import { Tags } from "./components/Tags";
import { typeTodo } from "./types/typeTodo";
import { TagTodos } from "./components/TagTodos";
import { MakeTag } from "./components/MakeTag";

function App() {
  const { getTags, getTagTodos, createTagTodos } = useTodoApi();

  const [tags, setTags] = useState<string[] | null>(null);
  const [todos, setTodos] = useState<typeTodo[] | null>(null);

  return (
    <div className="App">
      <>
        <Suspense fallback={<p>loading</p>}>
          <p>ページ</p>
          <Tags val={tags} setState={setTags} getTags={getTags} />
          <TagTodos val={todos} setState={setTodos} getTagTodos={getTagTodos} />
        </Suspense>
        <MakeTag onClick={createTagTodos} />
      </>
    </div>
  );
}

export default App;
