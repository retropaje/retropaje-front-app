import { Route, Routes } from "react-router-dom";
import { Route as AppRoute } from "core/enums";
import {
  UserManagementModule,
  ProductManagementModule,
  CategoryManagementModule,
  SaleManagementModule,
  MetricsPage,
} from "modules";

const getPath = (path: AppRoute) => path.replace("/dashboard", "");
export const RoutesProvider = () => {
  return (
    <Routes>
      <Route path={getPath(AppRoute.UsersGrid)} element={<UserManagementModule />} />
      <Route path={getPath(AppRoute.ProductsGrid)} element={<ProductManagementModule />} />
      <Route path={getPath(AppRoute.CategoriesGrid)} element={<CategoryManagementModule />} />
      <Route path={getPath(AppRoute.Metrics)} element={<MetricsPage />} />
      <Route path={getPath(AppRoute.SalesGrid) + "/*"} element={<SaleManagementModule />} />
      <Route path="/" element={<></>} />
    </Routes>
  );
};
