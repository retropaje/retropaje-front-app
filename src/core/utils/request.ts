import { AsyncReturnType } from "core/types";
import { getUserInformation } from "./localStorage.utils";

const baseApiURL = import.meta.env.VITE_API_URL;

async function GET<T = unknown>(url: string, key?: string): AsyncReturnType<T> {
  const token = getUserInformation();
  try {
    const response = await fetch(baseApiURL + url, {
      method: "GET",
      headers: {
        ...(!!token && { Authorization: `Bearer ${token.data.token}` }),
        "Content-Type": "application/json",
        Accept: "*/*",
        ...(key && { "x-api-key": key }),
      },
    });
    const json = await response.json();
    if (response.status <= 299) return { data: json, error: null };
    return { data: null, error: json };
  } catch (error) {
    return { data: null, error: error };
  }
}

async function POST<T = unknown, P = object | string | number>(
  url: string,
  body: P,
  key?: string
): AsyncReturnType<T> {
  try {
    const token = getUserInformation();
    const response = await fetch(baseApiURL + url, {
      method: "POST",
      headers: {
        ...(!!token && { Authorization: `Bearer ${token.data.token}` }),
        "Content-Type": "application/json",
        Accept: "*/*",
        ...(key && { "x-api-key": key }),
      },

      body: JSON.stringify(body),
    });
    const json: T = await response.json();
    if (response.status <= 299) return { data: json, error: null };
    return { data: null, error: json };
  } catch (error) {
    return { data: null, error: error };
  }
}

async function POSTFILE<T = unknown>(url: string, body: FormData): AsyncReturnType<T> {
  try {
    const token = getUserInformation();
    const response = await fetch(baseApiURL + url, {
      method: "POST",
      headers: {
        ...(!!token && { Authorization: `Bearer ${token.data.token}` }),
        Accept: "*/*",
      },
      body: body,
    });
    const json: T = await response.json();
    if (response.status <= 299) return { data: json, error: null };
    return { data: null, error: json };
  } catch (error) {
    return { data: null, error: error };
  }
}

async function PUT<T = unknown, P = object | string | number>(
  url: string,
  body: P,
  key?: string
): AsyncReturnType<T> {
  try {
    const token = getUserInformation();
    const response = await fetch(baseApiURL + url, {
      method: "PUT",
      headers: {
        ...(!!token && { Authorization: `Bearer ${token.data.token}` }),
        ...(key && { "x-api-key": key }),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const json = await response.json();
    if (response.status <= 299) return { data: json, error: null };
    return { data: null, error: json };
  } catch (error) {
    return { data: null, error: body };
  }
}

async function PUTFILE<T = unknown>(url: string, body: FormData): AsyncReturnType<T> {
  try {
    const token = getUserInformation();
    const response = await fetch(baseApiURL + url, {
      method: "PUT",
      headers: {
        ...(!!token && { Authorization: `Bearer ${token.data.token}` }),
        Accept: "*/*",
      },
      body: body,
    });
    const json = await response.json();
    if (response.status <= 299) return { data: json, error: null };
    return { data: null, error: json };
  } catch (error) {
    return { data: null, error: error };
  }
}

async function DELETE<T = unknown>(url: string, key?: string): AsyncReturnType<T> {
  try {
    const token = getUserInformation();
    const response = await fetch(baseApiURL + url, {
      method: "DELETE",
      headers: {
        ...(!!token && { Authorization: `Bearer ${token.data.token}` }),
        ...(key && { "x-api-key": key }),
        "Content-type": "application/json",
      },
    });
    const json = await response.json();
    if (response.status <= 299) return { data: json, error: null };
    return { data: null, error: json };
  } catch (error) {
    return { data: null, error: error };
  }
}

export { GET, POST, PUT, DELETE, POSTFILE, PUTFILE };
