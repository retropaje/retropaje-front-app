import { AsyncReturnType } from "core/types";
import { DELETE, GET, POST, PUT } from "core/utils/request";
import { Tax } from "core/types";

const baseApiURL = "/api/taxes";

export const getAll = async (): AsyncReturnType<{ data: Tax[] }> => {
  return await GET(baseApiURL);
};
export const get = async (id: string) => {
  return await GET<{ data: Tax }>(`${baseApiURL}/${id}`);
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
