import { Tag } from "./api/Tag" 

export type MyPageState = {
  user_icon: string;
  user_nickname: string;
  user_name: string;
  user_coe: string;
  user_sl: string;
  user_bio: string;
  user_tags: Tag[];
  user_email: string;
  user_instagramid: string;
  user_twitterid: string;
  user_facebookid: string;
  user_lineqr: string;
  all_tag: Array<Tag>;
};