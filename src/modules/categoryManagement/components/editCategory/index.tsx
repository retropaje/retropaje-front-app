import { useState, useContext } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { AppContext } from "core/context";
import { update } from "core/services/category.services";
import { Category } from "core/types";
import { styles } from "./styles";

type EditCategory = {
  name: string;
  description: string;
};
export const EditCategoryComponent: React.FC<{
  handleClose: () => void;
  categoryInfo: Category;
}> = ({ handleClose, categoryInfo }) => {
  const [data, setData] = useState<EditCategory>({
    name: categoryInfo.name,
    description: categoryInfo.description,
  });
  const { setNotification } = useContext(AppContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    update(categoryInfo.id, data)
      .then(() => {
        handleClose();
        setNotification({ message: "Categoria editada correctamente", severity: "success" });
      })
      .catch(() => setNotification({ message: "Error al editar la categoria", severity: "error" }));
  };

  return (
    <Box component={"form"} onSubmit={handleSubmit} sx={styles.root}>
      <Typography fontSize="24px" fontWeight="bold" textAlign="center" gutterBottom>
        Editar Categoria
      </Typography>
      <TextField
        label="Nombre"
        name="name"
        onChange={handleChange}
        defaultValue={categoryInfo.name}
      />
      <TextField
        label="Descripcion"
        name="description"
        onChange={handleChange}
        defaultValue={categoryInfo.description}
      />

      <Button variant="contained" fullWidth type="submit">
        Editar Categoria
      </Button>
    </Box>
  );
};
