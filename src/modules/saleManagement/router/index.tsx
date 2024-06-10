import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import { Route as AppRoute } from "core/enums";
import {
  CreateSaleComponent,
  SalesGridPage,
  EditSaleComponent,
} from "modules/saleManagement/pages";
import { SaleContextProvider } from "../context";

const onlyPath = (path: string) => {
  const pathArray = path.split("/");
  const lastPath = pathArray[pathArray.length - 1];
  return lastPath === "" ? path : `/${lastPath}`;
};
export const RoutesProvider = () => {
  return (
    <SaleContextProvider>
      <Box minHeight={"100vh"}>
        <Routes>
          <Route path={"/"} element={<SalesGridPage />} />
          <Route path={onlyPath(AppRoute.CreateSale)} element={<CreateSaleComponent />} />
          <Route path={onlyPath(AppRoute.EditSale)} element={<EditSaleComponent />} />
        </Routes>
      </Box>
    </SaleContextProvider>
  );
};
