import { useEffect, useState, useCallback, useContext } from "react";
import { IconButton, Stack, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { GridColDef } from "@mui/x-data-grid";
import { AnimatedContainer, GridProvider, Modal } from "core/components";
import { AppContext } from "core/context";
import { getAll, remove } from "core/services/category.services";
import { Category } from "core/types";
import {
  CreateCategoryComponent,
  EditCategoryComponent,
} from "modules/categoryManagement/components";

export const CategoriesGridPage: React.FC = () => {
  const [rows, setRows] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalInfo, setModalInfo] = useState<{ open: boolean; data?: Category }>({ open: false });
  const { setNotification } = useContext(AppContext);

  const columns: GridColDef<Category>[] = [
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
        setNotification({ message: "Categoria eliminada correctamente", severity: "success" });
      })
      .catch(() =>
        setNotification({ message: "Error al eliminar la categoria", severity: "error" })
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
    <AnimatedContainer paddingX={5} paddingTop={5}>
      <GridProvider
        title="Gestión de Categorias"
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        pageSizeOptions={[10, 20, 40, 60, 80, 100]}
        searchPlaceHolder="Buscar Categoria"
        onCreate={() => setModalInfo({ data: undefined, open: true })}
        loading={loading}
      />
      <Modal
        open={modalInfo.open}
        onClose={() => setModalInfo({ data: undefined, open: false })}
        closeButton
      >
        {modalInfo.data ? (
          <EditCategoryComponent handleClose={handleClose} categoryInfo={modalInfo.data} />
        ) : (
          <CreateCategoryComponent handleClose={handleClose} />
        )}
      </Modal>
    </AnimatedContainer>
  );
};
