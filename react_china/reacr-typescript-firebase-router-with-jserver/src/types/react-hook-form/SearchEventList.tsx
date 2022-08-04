import { Tag } from "../api/Tag";

export type SearchEventList = {
  tags?: Tag[];
  badget?: string;
  minguest?: string;
  maxguest?: string;
  fromdate?: string;
  todate?: string;
  num?: number;
};