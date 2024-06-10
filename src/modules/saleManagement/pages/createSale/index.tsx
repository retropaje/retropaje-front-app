import { useContext, useMemo, useState } from "react";
import { Box, Button, IconButton, Stack, TextField, Tooltip, Typography } from "@mui/material";
import { Font, Route } from "core/enums";
import { SaleContext } from "modules/saleManagement/context";
import { AnimatedContainer, GridProvider, Modal, Select } from "core/components";
import { Product } from "modules/productManagement/types";
import { AddProductComponent, EditProductComponent } from "modules/saleManagement/components";
import { Delete, Edit } from "@mui/icons-material";
import { GridColDef } from "@mui/x-data-grid";
import { formatMoney } from "core/utils/formats";
import { getUserInformation } from "core/utils/localStorage.utils";
import { create } from "modules/saleManagement/services/sale.services";
import { AppContext } from "core/context";
import { useNavigate } from "react-router-dom";

type CreateSale = {
  name_client: string;
  email_client: string;
  number_phone_client: string;
  user_id: number;
  currency_id: number;
  total: number;
  products: { id: number; amount: number }[];
};

export const CreateSaleComponent: React.FC = () => {
  const { currencies, productsInfo } = useContext(SaleContext);
  const { setNotification } = useContext(AppContext);
  const navigate = useNavigate();
  const [newSale, setNewSale] = useState<CreateSale>(Object({}));
  const [modalInfo, setModalInfo] = useState<{
    open: boolean;
    data?: { id: number; amount: number };
  }>({
    open: false,
  });

  const findProduct = (id: number) => {
    return newSale.products?.find((product) => product.id === id);
  };
  const columns: GridColDef<Product>[] = useMemo(
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
        renderCell: ({ id }) => newSale.products?.find((product) => product.id === id)?.amount,
      },
      {
        field: "price",
        headerName: "Total",
        renderCell: ({ id, row: { value } }) => {
          const product = newSale.products?.find((product) => product.id === id);
          return product?.amount ? formatMoney(product.amount * value) : formatMoney(0);
        },
      },
      {
        field: "actions",
        headerName: "Acciones",
        sortable: false,
        renderCell: ({ row }) => (
          <Stack direction="row">
            <IconButton
              color="info"
              onClick={() => {
                const product = findProduct(row.id);
                if (product) setModalInfo({ open: true, data: product });
              }}
            >
              <Tooltip title="Editar" placement="right">
                <Edit />
              </Tooltip>
            </IconButton>
            <IconButton color="error" onClick={() => handleDelete(row.id)}>
              <Tooltip title="Eliminar" placement="right">
                <Delete />
              </Tooltip>
            </IconButton>
          </Stack>
        ),
      },
    ],
    [newSale.products]
  );

  const rows: Product[] = useMemo(
    () =>
      productsInfo.filter(({ id }) => {
        const selectedsIds = newSale.products?.map(({ id }) => id);
        return selectedsIds?.includes(id);
      }),
    [newSale.products]
  );

  const total = useMemo(() => {
    return rows.reduce((acc, { value, id }) => {
      const product = findProduct(id);
      return acc + (product?.amount ?? 0) * value;
    }, 0);
  }, [rows]);
  const handleClose = () => {
    setModalInfo({ open: false, data: undefined });
  };

  const handleDelete = async (id: number) => {
    const newProducts = newSale.products?.filter((product) => product.id !== id);
    setNewSale((prev) => ({ ...prev, products: newProducts }));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewSale((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = () => {
    const user = getUserInformation();
    if (!user) return;
    const body = { ...newSale, user_id: user.data.user.id, total };
    create(body).then(({ error }) => {
      if (error)
        return setNotification({
          message: "Productos sin stock por favor verifique",
          severity: "error",
        });
      setNotification({ message: "Venta registrada correctamente", severity: "success" });
      navigate(Route.SalesGrid);
    });
  };
  /* product handlers */
  const handleAddProduct = (product: { id: number; amount: number }) => {
    setNewSale((prev) => ({ ...prev, products: [...(prev?.products ?? []), product] }));
  };
  const handleEditProduct = (product: { id: number; amount: number }) => {
    const newProducts = newSale.products?.map((prev) =>
      prev.id === product.id ? { ...prev, amount: product.amount } : prev
    );
    setNewSale((prev) => ({ ...prev, products: newProducts }));
  };

  return (
    <AnimatedContainer paddingX={5} paddingTop={5}>
      <Typography color="#D31024" fontFamily={Font.AcuminPro} fontSize="1.2rem">
        Agregar nueva venta
      </Typography>
      <Stack direction="row" spacing={2} marginTop={2}>
        <TextField
          label="Nombre del cliente"
          variant="outlined"
          name="name_client"
          onChange={handleChange}
        />
        <TextField
          label="Correo del cliente"
          variant="outlined"
          name="email_client"
          onChange={handleChange}
        />
        <TextField
          label="Número de teléfono"
          variant="outlined"
          name="number_phone_client"
          onChange={handleChange}
        />
        <Select label="Moneda" name="currency_id" options={currencies} onChange={handleChange} />
      </Stack>

      <Box my={5} />

      <GridProvider
        title="Listado de productos"
        columns={columns}
        rows={rows}
        searchPlaceHolder="Buscar Venta"
        onCreate={() => setModalInfo({ open: true })}
      />

      <Box sx={{ display: "flex", justifyContent: "space-between", paddingX: 3 }}>
        <Typography fontFamily={Font.AcuminPro} fontSize="1.2rem">
          Total a pagar: {formatMoney(total)}
        </Typography>
        <Button variant="contained" onClick={handleSubmit}>
          Registrar Venta
        </Button>
      </Box>

      <Modal
        open={modalInfo.open}
        onClose={() => setModalInfo({ data: undefined, open: false })}
        closeButton
      >
        {modalInfo.data ? (
          <EditProductComponent
            handleClose={handleClose}
            product={modalInfo.data}
            onSubmit={handleEditProduct}
          />
        ) : (
          <AddProductComponent handleClose={handleClose} onSubmit={handleAddProduct} />
        )}
      </Modal>
    </AnimatedContainer>
  );
};
