import React, { Suspense, useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useTodoData } from "../../Hooks/TodoData";
import { TodoType } from "../../Types/TodoType";

import { v4 as createUUID } from "uuid";
import { TodoViewDataType } from "../../Types/TodoViewDataType";
import { TodoItemComponent } from "../Components/TodoItemComponent";
import { TodoInputComponent } from "../Components/TodoInputComponent";
import { TodoContainer } from "../../Providers/TodoList";

export const TodoPage = () => {
  const { tagName } = useParams();
  const { readData, deleteData, editData } = useTodoData();

  const { setLoad: setLoadTag } = TodoContainer.useContainer();
  // データの読み込みチェック
  const [load, setLoad] = useState<boolean>(false);
  // データがあるかどうかのチェック
  const [dataCheck, setDataCheck] = useState<boolean>(true);
  // データそのもの
  const [data, setData] = useState<TodoViewDataType[]>([]);

  // データの保存状態のチェック用State
  const [dataSaveCheck, setDataSaveCheck] = useState<boolean>(false);

  const navigate = useNavigate();

  const onClickAdd = (text: string, color: string) => {
    const temp = { uuid: createUUID(), text: text, color: color, fin: false };
    setData([...data, temp]);
    setDataSaveCheck(true);
  };

  const onClickFin = (uuid: string) => {
    const temp = data.map((value: TodoViewDataType) => {
      return value.uuid == uuid ? { ...value, fin: !value.fin } : value;
    });
    setData(temp);
    setDataSaveCheck(true);
  };

  const onClickDelete = (uuid: string) => {
    const temp = data.filter((value: TodoViewDataType) => value.uuid != uuid);
    setData(temp);
    setDataSaveCheck(true);
  };

  const TodoData = useCallback(() => {
    if (!load)
      throw readData(tagName ?? "")
        .then((value: TodoType[]) => {
          const temp = value.map((value: TodoType) => {
            return { uuid: createUUID(), ...value };
          });
          setData(temp);
          setDataCheck(true);
          setLoad(true);
        })
        .catch((e) => {
          console.log("come on", e);
          setDataCheck(false);
          setLoad(true);
        });
    const FinData = data.filter((value: TodoViewDataType) => value.fin);
    const NonFinData = data.filter((value: TodoViewDataType) => !value.fin);

    return (
      <>
        <h1>未終了</h1>
        {NonFinData.map((value: TodoViewDataType) => (
          <TodoItemComponent
            key={value.uuid}
            value={value}
            onClickFin={onClickFin}
            onClickDelete={onClickDelete}
          />
        ))}
        <h1>終了</h1>
        {FinData.map((value: TodoViewDataType) => (
          <TodoItemComponent
            key={value.uuid}
            value={value}
            onClickFin={onClickFin}
            onClickDelete={onClickDelete}
          />
        ))}
      </>
    );
  }, [data]);

  const onClickDeleteButton = async () => {
    if (tagName) {
      const result = await deleteData(tagName);
      setLoadTag(false);
      if (result) navigate("/listTodo");
    }
  };
  const onClickSaveButton = async () => {
    if (tagName) {
      const temp = data.map((value: TodoViewDataType) => {
        return { text: value.text, color: value.color, fin: value.fin };
      });
      const result = await editData(tagName, temp);
      if (result) setDataSaveCheck(false);
    }
  };

  return (
    <>
      <Suspense fallback={<p>loading..</p>}>
        {dataSaveCheck ? (
          <>
            適宜情報を保存してください
            <button onClick={onClickSaveButton}>送信</button>
          </>
        ) : (
          <></>
        )}
        {dataCheck ? (
          <>
            <button onClick={onClickDeleteButton}>削除</button>
            <TodoInputComponent onClickAdd={onClickAdd} />
            <TodoData />
          </>
        ) : (
          <>detaが存在しません</>
        )}
      </Suspense>
    </>
  );
};
