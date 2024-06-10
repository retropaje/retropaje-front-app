export type Change = {
  id: number;
  value: number;
  currency_id: number;
  currency_change_id: number;
  created_at: Date;
  updated_at: Date;
  currency: {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
  };
  currency_change: {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
  };
};
