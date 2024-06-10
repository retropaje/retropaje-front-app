import { Roles } from "core/enums";

export type LoginUserInfo = {
  data: {
    user: {
      id: number;
      name: string;
      email: string;
      email_verified_at: Date;
      role_id: Roles;
      created_at: Date;
      updated_at: Date;
      role: {
        id: Roles;
        name: string;
        created_at: Date;
        updated_at: Date;
      };
      sales: [];
    };
    token: string;
  };
};
