import { useEffect, useState, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Stack, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { GridColDef } from "@mui/x-data-grid";
import { AnimatedContainer, GridProvider } from "core/components";
import { AppContext } from "core/context";
import { getAll, remove } from "modules/saleManagement/services/sale.services";
import { Sale } from "modules/saleManagement/types";
import { formatDate, formatMoney } from "core/utils/formats";
import { Route } from "core/enums";
import { SaleContext } from "modules/saleManagement/context";

export const SalesGridPage: React.FC = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState<Sale[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { setNotification } = useContext(AppContext);
  const { setEditedSale } = useContext(SaleContext);

  const columns: GridColDef<Sale>[] = [
    { field: "id", headerName: "Id", flex: 1 },
    {
      field: "name_client",
      headerName: "Nombre del Cliente",
      flex: 1,
    },
    {
      field: "user",
      headerName: "Vendedor",
      renderCell: ({ row }) => row.user?.name,
      flex: 1,
    },
    {
      field: "total",
      headerName: "Total",
      flex: 1,
      renderCell: ({ row }) => formatMoney(row.total),
    },
    {
      field: "created_at",
      headerName: "Fecha de Creación",
      flex: 1,
      renderCell: ({ row }) => formatDate(row.created_at),
    },
    {
      field: "updated_at",
      headerName: "Fecha de Actualización",
      flex: 1,
      renderCell: ({ row }) => formatDate(row.updated_at),
    },
    {
      field: "actions",
      headerName: "Acciones",
      sortable: false,
      renderCell: ({ row }) => (
        <Stack direction="row">
          <IconButton color="info" onClick={() => handleEdit(row)}>
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

  const handleEdit = (sale: Sale) => {
    setEditedSale(sale);
    navigate(Route.EditSale);
  };

  const handleDelete = (id: number) => {
    remove(id)
      .then(() => {
        fetchProducts();
        setNotification({ message: "Venta eliminada correctamente", severity: "success" });
      })
      .catch(() => setNotification({ message: "Error al eliminar la venta", severity: "error" }));
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
    <AnimatedContainer paddingX={5} paddingTop={5}>
      <GridProvider
        title="Gestión de Ventas"
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        pageSizeOptions={[10, 20, 40, 60, 80, 100]}
        searchPlaceHolder="Buscar Venta"
        onCreate={() => navigate(Route.CreateSale)}
        loading={loading}
      />
    </AnimatedContainer>
  );
};
