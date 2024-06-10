import { Box, IconButton, TextField } from "@mui/material";
import { Search, AddCircle } from "@mui/icons-material";
import { styles } from "./styles";

type GridToolBarProps = {
  setSearch: React.Dispatch<React.SetStateAction<string | undefined>>;
  searchPlaceHolder?: string;
  onCreate?: (...args: any[]) => void; //eslint-disable-line
};
export const GridToolBar: React.FC<GridToolBarProps> = ({
  setSearch,
  searchPlaceHolder,
  onCreate,
}) => {
  return (
    <Box sx={styles.root}>
      <TextField
        size="small"
        placeholder={searchPlaceHolder ?? "Buscar"}
        InputProps={{
          sx: styles.inputProps,
          endAdornment: <Search />,
        }}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth={false}
      />
      {!!onCreate && (
        <IconButton sx={styles.iconButton} onClick={onCreate}>
          <AddCircle sx={styles.icon} />
        </IconButton>
      )}
    </Box>
  );
};
