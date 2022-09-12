import { TodoType } from "./TodoType";

export type TodoViewDataType = TodoType & {
  uuid: string;
};
