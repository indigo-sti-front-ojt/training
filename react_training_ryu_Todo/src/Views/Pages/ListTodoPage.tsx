import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Modal,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useTodoData } from "../../Hooks/TodoData";
import { TodoContainer } from "../../Providers/TodoList";
import { TagFormComponent } from "../Components/TagFormComponent";

export const ListTodoPage = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "auto",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const { addData } = useTodoData();
  const { setLoad, tags } = TodoContainer.useContainer();

  // モーダル制御用
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  const onClickLink = (value: string) => {
    navigate(value);
  };

  const onClickSendData = async (tagName: string) => {
    await addData(tagName);
    setLoad(false);
    setOpen(false);
  };

  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <Button variant="contained" size="large" onClick={handleOpen}>
          追加
        </Button>
        <Box sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          {tags.map((value: string) => (
            <Card key={value} sx={{ minWidth: 275, maxWidth: 275 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  textAlign={"left"}
                >
                  タイトル
                </Typography>
                <Typography sx={{ fontSize: 28 }} textAlign={"left"}>
                  {value}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  sx={{ width: "full" }}
                  onClick={() => onClickLink(value)}
                >
                  TODOへ
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              tags入力用フォーム<span style={{ color: "red" }}>*</span>
            </Typography>
            <TagFormComponent addData={onClickSendData} />
          </Box>
        </Modal>
      </Container>
    </>
  );
};
