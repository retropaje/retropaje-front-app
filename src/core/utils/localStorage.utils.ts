import { LoginUserInfo } from "core/types";

export const getUserInformation = (): LoginUserInfo | null => {
  const userInformation = localStorage.getItem("userInformation");
  if (userInformation) return JSON.parse(userInformation);
  return null;
};

export const setUserInformation = (userInformation: LoginUserInfo): void => {
  localStorage.setItem("userInformation", JSON.stringify(userInformation));
};

export const removeUserInformation = (): void => {
  localStorage.removeItem("userInformation");
};
