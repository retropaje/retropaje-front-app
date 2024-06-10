import { Roles } from "core/enums";

export type User = {
  id: number;
  name: string;
  email: string;
  email_verified_at: Date;
  role_id: Roles;
  created_at: Date;
  updated_at: Date;
};
