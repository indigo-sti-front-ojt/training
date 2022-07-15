import React, { useEffect, useState } from "react";
import { SampleDBInput } from "../components/SampleDBinput";
import { SampleDBListItem } from "../components/SampleDBListItem";
import { useSampleDB } from "../hocks/SampleDB";
import { SampleDBContainer } from "../provider/SampleDBProvider";
export const TestView = () => {
  const { TestDataCreate, TestDataReads, TestDataEdit } = useSampleDB();

  const { changeFlag, sampleDatas, setEditFlag, editFlag, editData } =
    SampleDBContainer.useContainer();

  const [text, setText] = useState<string>("");
  const [color, setColor] = useState<string>("");

  const [editText, setEditText] = useState<string>("");
  const [editColor, setEditColor] = useState<string>("");

  const onClickSubmit = () => {
    // 本来ならバリデーション
    TestDataCreate({ uid: "", text: text, color: color });
    setText("");
    setColor("");
  };

  const onClickEdit = () => {
    // 本来ならバリデーション
    TestDataEdit({ uid: editData.uid, text: editText, color: editColor });
    setEditText("");
    setEditColor("");
    setEditFlag(false);
  };

  useEffect(() => {
    TestDataReads();
  }, [changeFlag]);

  useEffect(() => {
    if (editFlag) {
      setEditText(editData.text);
      setEditColor(editData.color);
    }
  }, [editFlag]);

  const EditPanel = editFlag ? (
    <div>
      <SampleDBInput text={editText} setText={setEditText} />
      <SampleDBInput text={editColor} setText={setEditColor} />
      <button onClick={onClickEdit}>送信</button>
      <button onClick={() => setEditFlag(false)}>キャンセル</button>
    </div>
  ) : (
    <></>
  );
  return (
    <>
      <div>test</div>
      <div>
        <SampleDBInput text={text} setText={setText} />
        <SampleDBInput text={color} setText={setColor} />
        <button onClick={onClickSubmit}>送信</button>
      </div>

      <div>
        {sampleDatas.map((data) => (
          <div key={data.uid}>
            <SampleDBListItem
              uid={data.uid}
              text={data.text}
              color={data.color}
            />
          </div>
        ))}
      </div>

      {EditPanel}
    </>
  );
};
