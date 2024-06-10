import { createContext, useState, useEffect } from "react";
import { LinearProgress } from "@mui/material";
import { getAll as getAllProducts } from "modules/productManagement/services/products.services";
import { Product } from "modules/productManagement/types";
import { getAll as getAllCurrencies } from "core/services/currency.services";
import { SelectType } from "core/types";
import { toSelect } from "core/utils/utils";
import { Sale } from "../types";

type SaleContextProps = {
  products: SelectType[];
  currencies: SelectType[];
  productsInfo: Product[];
  editedSale?: Sale;
  setEditedSale: React.Dispatch<React.SetStateAction<Sale | undefined>>;
};
export const SaleContext = createContext<SaleContextProps>(Object({}));

export const SaleContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<SelectType[]>([]);
  const [currencies, setCurrencies] = useState<SelectType[]>([]);
  const [productsInfo, setProductsInfo] = useState<Product[]>([]);
  const [editedSale, setEditedSale] = useState<Sale>();
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    setIsFetching(true);
    const handleFetch = async () => {
      const [products, currencies] = await Promise.all([getAllProducts(), getAllCurrencies()]);
      if (products.data && currencies.data) {
        setProducts(toSelect(products.data.data));
        setProductsInfo(products.data.data);
        setCurrencies(toSelect(currencies.data.data, { value: "id" }));
      }
      setIsFetching(false);
    };
    handleFetch();
  }, []);

  if (isFetching) return <LinearProgress />;
  return (
    <SaleContext.Provider value={{ products, currencies, productsInfo, editedSale, setEditedSale }}>
      {children}
    </SaleContext.Provider>
  );
};
