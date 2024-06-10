export type Currency = {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  changes: {
    id: number;
    value: number;
    currency_id: number;
    currency_change_id: number;
    created_at: Date;
    updated_at: Date;
  }[];
};
