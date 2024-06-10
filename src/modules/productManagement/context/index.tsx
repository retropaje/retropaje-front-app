import { createContext, useState, useEffect } from "react";
import { LinearProgress } from "@mui/material";
import { getAll as getAllCartegories } from "core/services/category.services";
import { getAll as getAllCurrencies } from "core/services/currency.services";
import { SelectType } from "core/types";
import { toSelect } from "core/utils/utils";

type ProductContextProps = {
  categories: SelectType[];
  currencies: SelectType[];
};
export const ProductContext = createContext<ProductContextProps>(Object({}));

export const ProductContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<SelectType[]>([]);
  const [currencies, setCurrencies] = useState<SelectType[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    setIsFetching(true);
    const handleFetch = async () => {
      const [categories, currencies] = await Promise.all([getAllCartegories(), getAllCurrencies()]);
      if (categories.data && currencies.data) {
        setCategories(toSelect(categories.data.data));
        setCurrencies(toSelect(currencies.data.data));
      }
      setIsFetching(false);
    };
    handleFetch();
  }, []);

  if (isFetching) return <LinearProgress />;
  return (
    <ProductContext.Provider value={{ categories, currencies }}>{children}</ProductContext.Provider>
  );
};
