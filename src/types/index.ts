export type DealBreakers = {
  smokes?: boolean;
  diet_conflict?: string;
  max_age_gap_years?: number;
  distance_limit_km?: number;
  education_required?: boolean;
  income_importance?: string;
};

export type Preferences = {
  body_type: string[];
  diet: string[];
  education: string[];
  religion: string[];
  ethnicity: string[];
  drinks: string[];
};

export type Activity = {
  likes_given: number[];
  likes_received: number[];
  matches: number[];
  dates: number[];
  last_online: string;
  weekly_app_opens: number;
};

export type User = {
  id: number;
  age: number;
  sex: string;
  personal_essay: string;
  personality: string;
  orientation: string;
  location: string;
  body_type: string;
  diet: string;
  drinks: string;
  education: string;
  ethnicity: string;
  height: number;
  income: number;
  job: string;
  religion: string;
  sign: string;
  smokes: boolean;
  speaks: string[];
  pets: string[];
  interests: string[];
  preferred_age_range: number[];
  preferred_distance_km: number;
  dealbreakers: DealBreakers;
  preferences: Preferences;
  activity: Activity;
};
