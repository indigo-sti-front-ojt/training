import { Tag } from "./Tag";

export type Event = {
  id: number;
  event_owner: string;
  event_owner_icon:string;
  event_left_date: number;
  event_imgurl: string,
  event_name: string;
  event_note: string;
  event_deadline: string;
  event_date: string;
  event_place: string;
  event_budget: number;
  event_min_guest: number;
  event_max_guest: number;
  event_draft_public: boolean;
  event_created_date: string;
  event_guest_id: Array<string>;
  event_tags: Tag[];
};
