import {
  Avatar,
  Box,
  Button,
  Checkbox,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { TodoViewDataType } from "../../Types/TodoViewDataType";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
type Props = {
  onClickFin: (uuid: string) => void;
  onClickDelete: (uuid: string) => void;
  value: TodoViewDataType;
};

export const TodoItemComponent = (props: Props) => {
  const { value, onClickFin, onClickDelete } = props;
  return (
    <>
      {/* <Box sx={{ width: "100%" }}>
        <div>{value.text}</div>
        <Button onClick={() => onClickDelete(value.uuid)}>削除</Button>
        <Button onClick={() => onClickFin(value.uuid)}>完了</Button>
      </Box> */}
      <ListItem
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => onClickDelete(value.uuid)}
          >
            <DeleteIcon />
          </IconButton>
        }
      >
        <ListItemButton
          sx={{ width: "20px" }}
          onClick={() => onClickFin(value.uuid)}
        >
          <ListItemIcon>
            <Checkbox checked={value.fin} disableRipple />
          </ListItemIcon>
          <ListItemText primary={value.text} />
        </ListItemButton>
      </ListItem>
    </>
  );
};
