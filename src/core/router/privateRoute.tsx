import { Navigate } from "react-router-dom";
import { Route } from "core/enums";

type PrivateRouteProps = {
  validation: boolean;
  validationPath?: string;
  element: React.ReactNode;
};
export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  validation,
  validationPath,
  element,
}) => {
  return validation ? element : <Navigate to={validationPath ?? Route.Login} replace />;
};
