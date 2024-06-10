import { useState, useContext } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { AppContext } from "core/context";
import { Select, FileInput } from "core/components";
import { objectToFormData } from "core/utils/utils";
import { update } from "modules/productManagement/services/products.services";
import { Product } from "modules/productManagement/types";
import { ProductContext } from "modules/productManagement/context";
import { styles } from "./styles";

type EditProduct = {
  name: string;
  description: string;
  category_id: number;
  amount: number;
  price_production: number;
  currency_id: number;
  value: number;
  image?: File;
};
export const EditProductComponent: React.FC<{ handleClose: () => void; productInfo: Product }> = ({
  handleClose,
  productInfo,
}) => {
  const [data, setData] = useState<EditProduct>({
    name: productInfo.name,
    description: productInfo.description,
    category_id: productInfo.category_id,
    amount: productInfo.amount,
    price_production: productInfo.price_production,
    currency_id: productInfo.currency_id,
    value: productInfo.value,
  });
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
    update(productInfo.id, body)
      .then(() => {
        handleClose();
        setNotification({ message: "Producto editado correctamente", severity: "success" });
      })
      .catch(() => setNotification({ message: "Error al editar el producto", severity: "error" }));
  };

  return (
    <Box component={"form"} onSubmit={handleSubmit} sx={styles.root}>
      <Typography fontSize="24px" fontWeight="bold" textAlign="center" gutterBottom>
        Editar Producto
      </Typography>
      <TextField
        label="Nombre"
        name="name"
        onChange={handleChange}
        defaultValue={productInfo.name}
      />
      <TextField
        label="Descripcion"
        name="description"
        onChange={handleChange}
        defaultValue={productInfo.description}
      />
      <TextField
        label="Cantidad"
        name="amount"
        onChange={handleChange}
        type="number"
        defaultValue={productInfo.amount}
      />
      <TextField
        label="Precio de Produccion"
        name="price_production"
        onChange={handleChange}
        type="number"
        defaultValue={productInfo.price_production}
      />
      <TextField
        label="Precio de Venta"
        name="value"
        onChange={handleChange}
        type="number"
        defaultValue={productInfo.value}
      />
      <Select
        options={categories}
        label="Categoria"
        name="category_id"
        onChange={handleChange}
        defaultValue={productInfo.category_id}
      />
      <Select
        options={currencies}
        label="Moneda"
        name="currency_id"
        onChange={handleChange}
        defaultValue={productInfo.currency_id}
      />
      <FileInput label="Imagen" handleUpload={handleChange} disabled />
      <Button variant="contained" fullWidth type="submit">
        Editar Producto
      </Button>
    </Box>
  );
};
