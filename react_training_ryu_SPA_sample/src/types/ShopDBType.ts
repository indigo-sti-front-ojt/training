export type ShopDBType = {
  uid: string;
  name: string;
  price?: string;
  closingDay?: number[];
  fromOpenToCleseTime?: {
    open: string;
    close: string;
  };
  phoneNumber?: string;
  links?: TagTextObject[];
  ShopLink?: string;
  instagramLink?: string;
  photoData?: string[];
  contents?: TagTextObject[];
  areaTag?: number[];
  freeTag?: number[];
};

type TagTextObject = {
  tag: string;
  text: string;
};
