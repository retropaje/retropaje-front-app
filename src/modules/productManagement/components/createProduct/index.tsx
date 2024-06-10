import { useState, useContext } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { FileInput, Select } from "core/components";
import { AppContext } from "core/context";
import { Category } from "core/enums";
import { objectToFormData } from "core/utils/utils";
import { create } from "modules/productManagement/services/products.services";
import { ProductContext } from "modules/productManagement/context";
import { styles } from "./styles";

type NewProduct = {
  name: string;
  description: string;
  category_id: number;
  amount: number;
  price_production: number;
  currency_id: number;
  image?: File;
  value?: number;
};
export const CreateProductComponent: React.FC<{ handleClose: () => void }> = ({ handleClose }) => {
  const [data, setData] = useState<NewProduct>(Object({ category_id: Category.Shirt }));
  const { setNotification } = useContext(AppContext);
  const { categories, currencies } = useContext(ProductContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (event.target.files) setData((prev) => ({ ...prev, image: event.target.files?.[0] }));
    else setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = objectToFormData(data);
    create(body)
      .then(() => {
        handleClose();
        setNotification({ message: "Producto creado correctamente", severity: "success" });
      })
      .catch(() => setNotification({ message: "Error al crear el producto", severity: "error" }));
  };

  return (
    <Box component={"form"} onSubmit={handleSubmit} sx={styles.root}>
      <Typography fontSize="24px" fontWeight="bold" textAlign="center" gutterBottom>
        Crear Producto
      </Typography>
      <TextField label="Nombre" name="name" onChange={handleChange} />
      <TextField label="Descripcion" name="description" onChange={handleChange} />
      <TextField label="Cantidad" name="amount" onChange={handleChange} type="number" />
      <TextField
        label="Precio de Produccion"
        name="price_production"
        onChange={handleChange}
        type="number"
      />
      <TextField label="Precio de Venta" name="value" onChange={handleChange} type="number" />
      <Select options={categories} label="Categoria" name="category_id" onChange={handleChange} />
      <Select options={currencies} label="Moneda" name="currency_id" onChange={handleChange} />

      <FileInput label="Imagen" handleUpload={handleChange} disabled />
      <Button variant="contained" fullWidth type="submit">
        Crear Producto
      </Button>
    </Box>
  );
};
