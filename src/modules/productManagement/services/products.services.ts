import { AsyncReturnType } from "core/types";
import { DELETE, GET, POSTFILE } from "core/utils/request";
import { Product } from "../types";

const baseApiURL = "/api/products";

export const getAll = async (): AsyncReturnType<{ data: Product[] }> => {
  return await GET(baseApiURL);
};
export const get = async (id: string) => {
  return await GET(`${baseApiURL}/${id}`);
};
export const create = async (body: FormData) => {
  return await POSTFILE(baseApiURL, body);
};
export const update = async (id: string | number, body: FormData) => {
  return await POSTFILE(`${baseApiURL}/update/${id}`, body);
};
export const remove = async (id: string | number) => {
  return await DELETE(`${baseApiURL}/${id}`);
};
