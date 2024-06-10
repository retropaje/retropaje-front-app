import { useEffect, useState, useCallback, useContext } from "react";
import { IconButton, Stack, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { GridColDef } from "@mui/x-data-grid";
import { AnimatedContainer, GridProvider, Modal } from "core/components";
import { RolesLabel } from "core/enums";
import { AppContext } from "core/context";
import { getAll, remove } from "modules/userManagement/services/user.services";
import { User } from "modules/userManagement/types";
import { CreateUserComponent, EditUserComponent } from "modules/userManagement/components";

export const UsersGridPage: React.FC = () => {
  const [rows, setRows] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalInfo, setModalInfo] = useState<{ open: boolean; data?: User }>({ open: false });
  const { setNotification } = useContext(AppContext);
  const columns: GridColDef<User>[] = [
    { field: "id", headerName: "Id", flex: 1 },
    {
      field: "name",
      headerName: "Nombre",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Correo Electronico",
      flex: 1,
    },
    {
      field: "role_id",
      headerName: "Rol",
      renderCell: ({ value }) => RolesLabel.get(value),
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
    fetchUsers();
    setModalInfo({ open: false, data: undefined });
  };

  const handleDelete = (id: number) => {
    remove(id)
      .then(() => {
        fetchUsers();
        setNotification({ message: "Usuario eliminado correctamente", severity: "success" });
      })
      .catch(() => setNotification({ message: "Error al eliminar el usuario", severity: "error" }));
  };

  const fetchUsers = useCallback(() => {
    setLoading(true);
    getAll().then(({ data }) => {
      setRows(data?.data ?? []);
      setLoading(false);
    });
  }, []);

  useEffect(() => fetchUsers(), [fetchUsers]);

  return (
    <AnimatedContainer paddingX={5} paddingTop={5}>
      <GridProvider
        title="Gestión de Usuarios"
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        pageSizeOptions={[10, 20, 40, 60, 80, 100]}
        searchPlaceHolder="Buscar Usuario"
        onCreate={() => setModalInfo({ data: undefined, open: true })}
        loading={loading}
      />
      <Modal
        open={modalInfo.open}
        onClose={() => setModalInfo({ data: undefined, open: false })}
        closeButton
      >
        {modalInfo.data ? (
          <EditUserComponent handleClose={handleClose} userInfo={modalInfo.data} />
        ) : (
          <CreateUserComponent handleClose={handleClose} />
        )}
      </Modal>
    </AnimatedContainer>
  );
};
