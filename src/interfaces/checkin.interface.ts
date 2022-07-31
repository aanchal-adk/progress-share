export interface CheckinInterface {
  id: number;
  tracker_id: number;
  day_num: number;
  is_checked_in: boolean;
  is_repaired: boolean;
  created_at: string;
  updated_at: string;
};

export interface CheckinRequestInterface {
  tracker_id: number;
  day_num: number;
  is_repaired: boolean;
}
