import axios from "axios";
import React, { Suspense, useState, useEffect } from "react";
import { ApiClient } from "./apiClient";
import { useTodoData } from "./hooks/useTodoApi";

type Props = {
  val: string[] | null;
  setState: React.Dispatch<React.SetStateAction<string[] | null>>;
};

// タグのsuspence用コンポーネント
const Tags = (props: Props) => {
  const { val, setState } = props;
  if (val === null) {
    if (setState) {
      throw axios
        .get("http://localhost:5000/tag-name")
        .then((res) => setState(res.data));
    }
  }

  return (
    <>
      <p>{val}</p>
    </>
  );
};

function App() {
  const [tags, setTags] = useState<string[] | null>(null);

  const getTags = async () => {
    await ApiClient.get("/").then((res) => setTags(res.data));
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/tag-name")
      .then((res) => setTags(res.data));
  }, []);

  return (
    <div className="App">
      <>
        <Suspense fallback={<p>loading</p>}>
          <Tags val={tags} setState={setTags} />
        </Suspense>
      </>
    </div>
  );
}

export default App;
