import { AsyncReturnType, LoginUserInfo } from "core/types";
import { POST } from "core/utils/request";

export const login = async (body: {
  email: string;
  password: string;
}): AsyncReturnType<LoginUserInfo> => {
  return await POST("/api/login", body);
};
