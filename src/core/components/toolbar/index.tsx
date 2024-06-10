import { useMemo, useContext } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Box, Button, IconButton, Paper} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { Images, Route } from "core/enums";
import { AppContext } from "core/context";
import { styles } from "./styles";
import { removeUserInformation } from "core/utils/localStorage.utils";

export const Toolbar: React.FC = () => {
  const navigate = useNavigate();
  const { setOpenDrawer, isAuthenticated, setIsAuthenticated } = useContext(AppContext);
  const location = useLocation().pathname;
  const isDashboard = useMemo(() => location.includes(Route.Dashboard), [location]);

  const handleNavigate = () => {
    const route = !isAuthenticated ? Route.Login : Route.UsersGrid;
    navigate(route);
  };

  const handleLogout = () => {
    removeUserInformation();
    setIsAuthenticated(false);
    navigate(Route.Login);
  };
  return (
    <Paper elevation={3} sx={styles.root}>
      <Box sx={styles.buttonContainer}>
        {isDashboard && (
          <IconButton onClick={(): void => setOpenDrawer((prev) => !prev)}>
            <Menu />
          </IconButton>
        )}
        <Link to={"/"}>
        <img
            src={Images.logoRetropaje}
            width={188.15}
            height={62.54}
            className="logo"
            style={{ marginTop: 6 }}
          />
        </Link>
      </Box>

      {isAuthenticated && isDashboard ? (
        <Button variant="text" onClick={handleLogout}>
          Cerrar Sesión
        </Button>
      ) : (
        <Button variant="text" onClick={handleNavigate}>
          Administracion
        </Button>
      )}
    </Paper>
  );
};
