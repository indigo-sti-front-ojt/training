import { TagTextObject } from "./TagTextObject";

export type ShopDBType = {
  uid: string;
  title: string;
  mainImage: string;
  name: string;
  access?: string;
  map?: string;
  price?: string;
  closingDay?: number[];
  fromOpenToCleseTime?: {
    open: string;
    close: string;
  };
  phoneNumber?: string;
  ShopLink?: string;
  photoData?: string[];
  links?: TagTextObject[];
  contents?: TagTextObject[];
  areaTag?: string[];
  freeTag?: string[];
  writer: string;
};
