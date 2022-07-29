import { Event } from "../../types/api/Event";

export type User = {
  user_id: string;
  user_email: string;
  user_name: string;
  user_nickname: string;
  user_icon: string;
  user_coe: string;
  user_sl: string;
  user_bio: string;
  user_tags: Array<number>;
  user_lineqr: string;
  user_twitterid: string;
  user_instagramid: string;
  user_facebookid: string;
  host_event: Event[];
  join_event: Event[];
  past_event: Event[];
};