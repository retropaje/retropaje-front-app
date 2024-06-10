import { useEffect, useState, useCallback, useContext } from "react";
import { IconButton, Stack, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { GridColDef } from "@mui/x-data-grid";
import { AnimatedContainer, GridProvider, Modal } from "core/components";
import { formatMoney } from "core/utils/formats";
import { AppContext } from "core/context";
import { getAll, remove } from "modules/productManagement/services/products.services";
import { Product } from "modules/productManagement/types";
import { CreateProductComponent, EditProductComponent } from "modules/productManagement/components";
import { ProductContextProvider } from "modules/productManagement/context";

export const ProductsGridPage: React.FC = () => {
  const [rows, setRows] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalInfo, setModalInfo] = useState<{ open: boolean; data?: Product }>({ open: false });
  const { setNotification } = useContext(AppContext);

  const columns: GridColDef<Product>[] = [
    { field: "id", headerName: "Id", flex: 1 },
    {
      field: "name",
      headerName: "Nombre",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Descripcion",
      flex: 1,
    },
    {
      field: "category_id",
      headerName: "Categoria",
      renderCell: ({ row }) => row.category?.name,
      flex: 1,
    },
    {
      field: "amount",
      flex: 1,
      headerName: "Cantidad",
    },
    {
      field: "price_production",
      flex: 1,
      renderCell: ({ row }) => formatMoney(row.price_production),
      headerName: "Precio de Produccion",
    },
    {
      field: "value",
      flex: 1,
      renderCell: ({ row }) => formatMoney(row.value),
      headerName: "Precio de Venta",
    },
    {
      field: "actions",
      headerName: "Acciones",
      sortable: false,
      renderCell: ({ row }) => (
        <Stack direction="row">
          <IconButton color="info" onClick={() => setModalInfo({ open: true, data: row })}>
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
  ];

  const handleClose = () => {
    fetchProducts();
    setModalInfo({ open: false, data: undefined });
  };

  const handleDelete = (id: number) => {
    remove(id)
      .then(() => {
        fetchProducts();
        setNotification({ message: "Producto eliminado correctamente", severity: "success" });
      })
      .catch(() =>
        setNotification({ message: "Error al eliminar el producto", severity: "error" })
      );
  };

  const fetchProducts = useCallback(() => {
    setLoading(true);
    getAll().then(({ data }) => {
      setRows(data?.data ?? []);
      setLoading(false);
    });
  }, []);

  useEffect(() => fetchProducts(), [fetchProducts]);

  return (
    <ProductContextProvider>
      <AnimatedContainer paddingX={5} paddingTop={5}>
        <GridProvider
          title="Gestión de Inventario"
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          pageSizeOptions={[10, 20, 40, 60, 80, 100]}
          searchPlaceHolder="Buscar Producto"
          onCreate={() => setModalInfo({ data: undefined, open: true })}
          loading={loading}
        />
        <Modal
          open={modalInfo.open}
          onClose={() => setModalInfo({ data: undefined, open: false })}
          closeButton
        >
          {modalInfo.data ? (
            <EditProductComponent handleClose={handleClose} productInfo={modalInfo.data} />
          ) : (
            <CreateProductComponent handleClose={handleClose} />
          )}
        </Modal>
      </AnimatedContainer>
    </ProductContextProvider>
  );
};
