import { AsyncReturnType } from "core/types";
import { DELETE, GET, POST, PUT } from "core/utils/request";
import { Sale } from "../types";
import { Metrics } from "../types/metric.type";

const baseApiURL = "/api/sales";

export const getAll = async (): AsyncReturnType<{ data: Sale[] }> => {
  return await GET(baseApiURL);
};
export const get = async (id: string) => {
  return await GET<{ data: Sale }>(`${baseApiURL}/${id}`);
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
export const metrics = async (dates: { date_start: string; date_end: string }) => {
  return await GET<{ data: Metrics }>(
    `${baseApiURL}/metrics?date_start=${dates.date_start}&date_end=${dates.date_end}`
  );
};
