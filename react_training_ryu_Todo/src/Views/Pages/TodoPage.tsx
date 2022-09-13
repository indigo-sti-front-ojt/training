import React, { Suspense, useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useTodoData } from "../../Hooks/TodoData";
import { TodoType } from "../../Types/TodoType";

import { v4 as createUUID } from "uuid";
import { TodoViewDataType } from "../../Types/TodoViewDataType";
import { TodoItemComponent } from "../Components/TodoItemComponent";
import { TodoInputComponent } from "../Components/TodoInputComponent";
import { TodoContainer } from "../../Providers/TodoList";
import { Alert, Button, IconButton, List, ListSubheader } from "@mui/material";
import { Box, Container } from "@mui/system";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const TodoPage = () => {
  const { tagName } = useParams();
  const { readData, deleteData, editData } = useTodoData();

  const { setLoad: setLoadTag } = TodoContainer.useContainer();
  // データの読み込みチェック
  const [load, setLoad] = useState<boolean>(false);
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
          setLoad(true);
        })
        .catch((e) => {
          console.log("come on", e);
          setLoad(true);
        });
    const FinData = data.filter((value: TodoViewDataType) => value.fin);
    const NonFinData = data.filter((value: TodoViewDataType) => !value.fin);

    return (
      <>
        <List
          sx={{
            width: "50%",
            minWidth: "300px",
            maxWidth: "300px",
          }}
          subheader={<ListSubheader>未完了タスク</ListSubheader>}
        >
          {NonFinData.map((value: TodoViewDataType) => (
            <TodoItemComponent
              key={value.uuid}
              value={value}
              onClickFin={onClickFin}
              onClickDelete={onClickDelete}
            />
          ))}
        </List>
        <List
          sx={{
            width: "50%",
            minWidth: "300px",
            maxWidth: "300px",
          }}
          subheader={<ListSubheader>完了タスク</ListSubheader>}
        >
          {FinData.map((value: TodoViewDataType) => (
            <TodoItemComponent
              key={value.uuid}
              value={value}
              onClickFin={onClickFin}
              onClickDelete={onClickDelete}
            />
          ))}
        </List>
      </>
    );
  }, [data]);

  const onClickDeleteButton = async () => {
    if (tagName) {
      const result = await deleteData(tagName);
      setLoadTag(false);
      if (result) navigate("/");
    }
  };
  const onClickBackButton = async () => {
    if (dataSaveCheck) {
      await onClickSaveButton();
    }
    navigate("/");
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
      <Container sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Suspense fallback={<p>loading..</p>}>
          <>
            <Box
              sx={{
                display: "flex",
                width: "full",
                height: "50px",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <IconButton size="large" onClick={onClickBackButton}>
                <ArrowBackIcon />
              </IconButton>
              <Button
                variant="contained"
                size="large"
                color="error"
                onClick={onClickDeleteButton}
              >
                削除
              </Button>
            </Box>
            <Box
              sx={{
                height: "50px",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {dataSaveCheck ? (
                <>
                  <Alert sx={{ width: "250px" }}>
                    適宜情報を保存してください
                  </Alert>
                  <Button
                    sx={{ width: "50px" }}
                    variant="contained"
                    onClick={onClickSaveButton}
                  >
                    送信
                  </Button>
                </>
              ) : (
                <></>
              )}
            </Box>

            <TodoInputComponent onClickAdd={onClickAdd} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: "20px",
                flexWrap: "wrap",
                width: "100%",
              }}
            >
              <TodoData />
            </Box>
          </>
        </Suspense>
      </Container>
    </>
  );
};
