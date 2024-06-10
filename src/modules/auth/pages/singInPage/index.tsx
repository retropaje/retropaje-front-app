import { Box, Button, TextField, Typography } from "@mui/material";
import { login } from "modules/auth/services/auth.services";
import { Route } from "core/enums";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { setUserInformation } from "core/utils/localStorage.utils";
import { AppContext } from "core/context";
export const SingInPage = (): JSX.Element => {
  const [data, setData] = useState<{ email: string; password: string }>(Object({}));
  const { setIsAuthenticated } = useContext(AppContext);
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(data).then(({ data }) => {
      if (data) {
        setUserInformation(data);
        setIsAuthenticated(true);
        navigate(Route.Dashboard);
      }
    });
  };

  return (
    <Box display="flex" alignItems="center" flexDirection="column" paddingTop={10} gap={4}>
      <Box>
        <Typography fontSize="24px" fontWeight="bold" textAlign="center" gutterBottom>
          Inicio de Sesión
        </Typography>
        <Typography fontSize="20px" maxWidth={450} textAlign={"center"}>
          Por favor ingrese su correo electronico y contraseña para iniciar sesión
        </Typography>
      </Box>

      <Box
        minWidth={{ xs: 0, md: 380 }}
        display="flex"
        flexDirection="column"
        gap={3}
        component="form"
        onSubmit={handleSubmit}
      >
        <TextField
          label="Correo Electronico"
          variant="outlined"
          name="email"
          onChange={handleChange}
        />
        <TextField
          label="Contraseña"
          variant="outlined"
          type="password"
          name="password"
          onChange={handleChange}
        />
        <Button variant="contained" fullWidth type="submit">
          Iniciar Sesión
        </Button>
      </Box>
    </Box>
  );
};
