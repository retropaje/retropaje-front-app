export type Product = {
  id: number;
  name: string;
  description: string;
  amount: number;
  value: number;
  price_production: number;
  image: string;
  category_id: number;
  currency_id: 2;
  created_at: Date;
  updated_at: Date;
  category: {
    id: number;
    name: string;
    description: string;
    created_at: Date;
    updated_at: Date;
  };
  currency: {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
  };
  sales: [];
};
