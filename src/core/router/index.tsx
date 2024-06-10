import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import { Route as AppRoute } from "core/enums";
import { Toolbar } from "core/components";
import { AppContext } from "core/context";
import { AuthModule, CatalogModule, DashboardModule } from "modules";
import { PrivateRoute } from "./privateRoute";

export const RoutesProvider = () => {
  const { isAuthenticated } = useContext(AppContext);
  return (
    <Box minHeight={"100vh"}>
      <Toolbar />
      <Routes>
        <Route path={"/"} element={<CatalogModule />} />
        <Route
          path={AppRoute.Login}
          element={
            <PrivateRoute
              element={<AuthModule />}
              validation={!isAuthenticated}
              validationPath={AppRoute.Dashboard}
            />
          }
        />
        <Route
          path={AppRoute.Dashboard + "/*"}
          element={<PrivateRoute element={<DashboardModule />} validation={isAuthenticated} />}
        />
      </Routes>
    </Box>
  );
};
