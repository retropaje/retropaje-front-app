import { useState, useContext } from "react";
import { Box, TextField, Button, Typography, Autocomplete } from "@mui/material";
import { AppContext } from "core/context";
import { SaleContext } from "modules/saleManagement/context";
import { styles } from "./styles";

type NewProduct = {
  product_id?: number | string;
  amount: number;
};
export const AddProductComponent: React.FC<{
  handleClose: () => void;
  onSubmit: (product: { id: number; amount: number }) => void;
}> = ({ handleClose, onSubmit }) => {
  const [data, setData] = useState<NewProduct>(Object({}));
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
    setNotification({ message: "Producto agregado correctamente", severity: "success" });
  };

  return (
    <Box component={"form"} onSubmit={handleSubmit} sx={styles.root}>
      <Typography fontSize="24px" fontWeight="bold" textAlign="center" gutterBottom>
        Añadir Producto
      </Typography>

      <Autocomplete
        disablePortal
        id="product_id"
        options={products}
        fullWidth
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
      <TextField label="Unidades" name="amount" onChange={handleChange} type="text" />

      <Button variant="contained" fullWidth type="submit">
        Añadir Producto
      </Button>
    </Box>
  );
};
