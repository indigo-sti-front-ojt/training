import { Tag } from "./Tag";
import { UserMinInfo } from "./UserMinInfo";

export type Event = {
  id: number;
  event_owner: UserMinInfo;
  event_owner_name?: string;
  event_owner_icon?: string;
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
  event_guests?: UserMinInfo[];
  event_guest_length?: number;
  event_tags?: Tag[];
  event_tags_id?: Array<number>;
};
