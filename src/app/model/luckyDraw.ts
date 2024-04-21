export type TimeOfDayInterface = "morning" | "afternoon" | "evening";

export interface CreateLuckyDrawInterface {
  selected_numbers: string;
  time_of_day: TimeOfDayInterface;
}

export interface ListLuckyDrawInterface extends CreateLuckyDrawInterface {
  id: string;
  created_at: string;
  updated_at: string;
}

// export interface ModifiedLuckDrawListInterface {
//   [string]: string
// }
