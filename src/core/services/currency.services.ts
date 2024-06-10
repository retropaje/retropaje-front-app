import { AsyncReturnType } from "core/types";
import { DELETE, GET, POST, PUT } from "core/utils/request";
import { Currency } from "../types";

const baseApiURL = "/api/currencies";

export const getAll = async (): AsyncReturnType<{ data: Currency[] }> => {
  return await GET(baseApiURL);
};
export const get = async (id: string) => {
  return await GET<{ data: Currency }>(`${baseApiURL}/${id}`);
};
export const create = async (body: object) => {
  return await POST(baseApiURL, body);
};
export const update = async (id: string | number, body: object) => {
  return await PUT(`${baseApiURL}/${id}`, body);
};
export const remove = async (id: string | number) => {
  return await DELETE(`${baseApiURL}/${id}`);
};
