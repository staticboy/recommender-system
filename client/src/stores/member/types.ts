export interface ProductDetails {
  prod_id: string
  prod_name: string,
  prod_description: string,
  prod_price: number,
  prod_stockqty: number,
  prod_modelnum: string,
  cat_id: string,
  sub_cat: string,
  biz_id: string,
  prod_dateadded: Date,
  prod_status: string,
}
export interface MemberDetails {
  user_id: string,
  user_email: string,
  user_password: string,
  user_name: string,
  user_dob: string,
  user_phoneno: number,
  user_address: string,
  user_country: string,
  user_gender: string,
}
export interface MemberPreferences {
  preference_id: string,
  user_id: string,
  cat_id: string,
  skill_level: SkillLevel,
  frequency: Frequency,
  draft?: boolean,
}
export enum SkillLevel {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
}
export enum Frequency {
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
}