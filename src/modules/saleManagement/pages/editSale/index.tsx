import { useContext, useMemo, useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { Font, Route } from "core/enums";
import { SaleContext } from "modules/saleManagement/context";
import { AnimatedContainer, GridProvider, Select } from "core/components";
import { GridColDef } from "@mui/x-data-grid";
import { formatMoney } from "core/utils/formats";
import { getUserInformation } from "core/utils/localStorage.utils";
import { update } from "modules/saleManagement/services/sale.services";
import { AppContext } from "core/context";
import { useNavigate } from "react-router-dom";
import { ProductSale, Sale } from "modules/saleManagement/types";

type EditSale = {
  name_client: string;
  email_client: string;
  number_phone_client: string;
  user_id: number;
};

const setInitialValues = (sale?: Sale): EditSale => {
  if (!sale) return Object({});
  return {
    name_client: sale.name_client,
    email_client: sale.email_client,
    number_phone_client: sale.number_phone_client,
    user_id: sale.user_id,
  };
};
export const EditSaleComponent: React.FC = () => {
  const { currencies, editedSale } = useContext(SaleContext);
  const { setNotification } = useContext(AppContext);
  const navigate = useNavigate();
  const [editSale, setEditSale] = useState<EditSale>(setInitialValues(editedSale));
  const columns: GridColDef<ProductSale>[] = useMemo(
    () => [
      {
        field: "id",
        headerName: "Id",
        flex: 1,
      },
      {
        field: "name",
        headerName: "Nombre",
        flex: 1,
      },
      {
        field: "amount",
        headerName: "Cantidad",
        renderCell: ({ row: { pivot } }) => pivot?.amount,
      },
      {
        field: "price",
        headerName: "Total",
        renderCell: ({ row: { value, pivot } }) => {
          return formatMoney(pivot?.amount * value);
        },
      },
    ],
    [editedSale?.products]
  );

  const rows: ProductSale[] = useMemo(() => editedSale?.products ?? [], [editedSale?.products]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditSale((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = () => {
    const user = getUserInformation();
    if (!user || !editedSale) return;
    const body = { ...editSale, user_id: user.data.user.id };
    update(editedSale.id, body).then(({ error }) => {
      if (error)
        return setNotification({
          message: "Productos sin stock por favor verifique",
          severity: "error",
        });
      setNotification({ message: "Venta editada correctamente", severity: "success" });
      navigate(Route.SalesGrid);
    });
  };

  return (
    <AnimatedContainer paddingX={5} paddingTop={5}>
      <Typography color="#D31024" fontFamily={Font.AcuminPro} fontSize="1.2rem">
        Editar venta
      </Typography>
      <Stack direction="row" spacing={2} marginTop={2}>
        <TextField
          label="Nombre del cliente"
          variant="outlined"
          name="name_client"
          onChange={handleChange}
          defaultValue={editedSale?.name_client}
        />
        <TextField
          label="Correo del cliente"
          variant="outlined"
          name="email_client"
          onChange={handleChange}
          defaultValue={editedSale?.email_client}
        />
        <TextField
          label="Número de teléfono"
          variant="outlined"
          name="number_phone_client"
          onChange={handleChange}
          defaultValue={editedSale?.number_phone_client}
        />
        <Select
          label="Moneda"
          name="currency_id"
          options={currencies}
          disabled
          defaultValue={editedSale?.currency_id}
        />
      </Stack>

      <Box my={5} />

      <GridProvider
        title="Listado de productos"
        columns={columns}
        rows={rows}
        searchPlaceHolder="Buscar Venta"
      />

      <Box sx={{ display: "flex", justifyContent: "space-between", paddingX: 3 }}>
        <Typography fontFamily={Font.AcuminPro} fontSize="1.2rem">
          Total a pagar: {formatMoney(editedSale?.total)}
        </Typography>
        <Button variant="contained" onClick={handleSubmit}>
          Editar Venta
        </Button>
      </Box>
    </AnimatedContainer>
  );
};
