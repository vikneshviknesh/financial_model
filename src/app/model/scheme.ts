export interface CreateSchemeInterface {
  days: string;
  interest_rate: string;
}

export interface SchemeListInterface extends CreateSchemeInterface {
  id: string;
  created_at: string;
  updated_at: string;
}
