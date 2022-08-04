import { Tag } from "./Tag";

type UserInfo = {
  user_id?: string;
  user_name?: string;
  user_icon?: string;
  user_nickname?: string;
  user_email?: string;
}

export type Event = {
  id: number;
  event_owner: UserInfo;
  event_owner_name?:string;
  event_owner_icon?:string;
  event_left_date?: number;
  event_imgurl?: string;
  event_name?: string;
  event_note?: string;
  event_deadline?: string;
  event_date?: string;
  event_place?: string;
  event_budget?: number;
  event_min_guest?: number;
  event_max_guest?: number;
  event_created_date?: string;
  event_guests?: UserInfo[];
  event_tags?: Tag[];
};
