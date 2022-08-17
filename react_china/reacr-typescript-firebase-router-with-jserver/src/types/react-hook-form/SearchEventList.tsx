import { Tag } from "../api/Tag";

export type SearchEventList = {
  tags?: Tag[];
  budget?: number;
  minguest?: number;
  maxguest?: number;
  fromdate?: string;
  todate?: string;
  num?: number;
};