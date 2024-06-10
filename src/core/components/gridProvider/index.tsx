import { useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid, DataGridProps } from "@mui/x-data-grid";
import { Font } from "core/enums";
import { GridToolBar } from "./GridToolbar";

type GridProviderProps = DataGridProps & {
  title: string;
  searchPlaceHolder?: string;
  onCreate?: (...args: any[]) => void;
};

export const GridProvider: React.FC<GridProviderProps> = ({
  columns,
  rows,
  title,
  searchPlaceHolder,
  onCreate,
  ...rest
}) => {
  const columnsNames = useMemo(() => columns.map((column) => column.field), [columns]);
  const [search, setSearch] = useState<string>();

  const filteredRows = useMemo(
    () =>
      rows.filter((row) =>
        columnsNames.some((column): boolean => {
          const value: string | number | React.ReactElement = row[column];
          if (!search) return true;
          if (typeof value === "number") return value.toString().includes(search);
          if (typeof value === "string") return value.toLowerCase().includes(search.toLowerCase());
          return false;
        })
      ),
    [rows, columnsNames, search]
  );
  return (
    <Box>
      {!!title && (
        <Typography color="#D31024" fontFamily={Font.AcuminPro} fontSize="1.2rem">
          {title}
        </Typography>
      )}

      <Box padding={3} mt={1} maxWidth="100%" overflow={"hidden"}>
        <GridToolBar
          setSearch={setSearch}
          searchPlaceHolder={searchPlaceHolder}
          onCreate={onCreate}
        />
        <DataGrid columns={columns} rows={filteredRows} {...rest} />
      </Box>
    </Box>
  );
};
