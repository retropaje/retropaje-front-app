import { SelectType } from "core/types";

export const toSelect = <T extends Record<string, any>[] = { name: string; id: string | number }[]>(
  array: T,
  keys?: { label?: string; value: string }
): SelectType[] => {
  if (keys)
    return array.map((item) => ({
      label: item[keys.label || "name"],
      value: item[keys.value],
    })) as SelectType[];
  const options = array.map((item) => ({ label: item.name, value: item.id })) as SelectType[];
  return options;
};

export const objectToFormData = (obj: Record<string, any>) => {
  const formData = new FormData();
  Object.keys(obj).forEach((key) => {
    if (obj[key] instanceof File) formData.append(key, obj[key], obj[key].name);
    else if (obj[key] instanceof Array) obj[key].forEach((item: any) => formData.append(key, item));
    else formData.append(key, obj[key]);
  });
  return formData;
};
