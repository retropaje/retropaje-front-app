import { useState, useContext } from "react";
import { Box, TextField, Button, Typography, Autocomplete } from "@mui/material";
import { AppContext } from "core/context";
import { SaleContext } from "modules/saleManagement/context";
import { styles } from "./styles";

type EditProduct = {
  product_id?: number | string;
  amount: number;
};
export const EditProductComponent: React.FC<{
  handleClose: () => void;
  product: { id: number | string; amount: number };
  onSubmit: (product: { id: number; amount: number }) => void;
}> = ({ handleClose, onSubmit, product }) => {
  const [data, setData] = useState<EditProduct>({ product_id: product.id, amount: product.amount });
  const { products } = useContext(SaleContext);
  const { setNotification } = useContext(AppContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!data.product_id || !data.amount) {
      return setNotification({
        message: "Todos los campos son requeridos",
        severity: "error",
      });
    }
    const product = {
      id: typeof data.product_id === "string" ? parseInt(data.product_id) : data.product_id,
      amount: data.amount,
    };
    onSubmit(product);
    handleClose();
    setNotification({ message: "Producto editado correctamente", severity: "success" });
  };

  return (
    <Box component={"form"} onSubmit={handleSubmit} sx={styles.root}>
      <Typography fontSize="24px" fontWeight="bold" textAlign="center" gutterBottom>
        Editar Producto
      </Typography>

      <Autocomplete
        disablePortal
        id="product_id"
        options={products}
        fullWidth
        disabled
        defaultValue={products.find((product) => product.value === data.product_id)}
        slotProps={{
          popper: {
            sx: {
              "& .MuiAutocomplete-listbox": {
                maxHeight: "200px",
              },
            },
          },
        }}
        renderInput={(params) => <TextField {...params} label="Seleccionar Producto" />}
        onChange={(_, value) => {
          handleChange({ target: { name: "product_id", value: value?.value } } as any);
        }}
      />
      <TextField
        label="Unidades"
        name="amount"
        onChange={handleChange}
        type="text"
        defaultValue={data.amount}
      />

      <Button variant="contained" fullWidth type="submit">
        Editar Producto
      </Button>
    </Box>
  );
};
