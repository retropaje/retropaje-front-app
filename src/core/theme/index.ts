import { createTheme } from "@mui/material";
import { esES } from "@mui/x-data-grid";
import { esES as coreEsES } from "@mui/material/locale";
import type {} from "@mui/x-data-grid/themeAugmentation";
import "assets/fonts/fonts.css";

export const theme = createTheme(
  {
    palette: {
      primary: { main: "#d31024" },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            margin: 0,
            padding: 0,
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          variant: "outlined",
          fullWidth: true,
          size: "small",
        },
      },
      MuiDataGrid: {
        defaultProps: {
          density: "compact",
          autoHeight: true,
          disableRowSelectionOnClick: true,
        },
        styleOverrides: {
          root: {
            "& .MuiDataGrid-colCell, & .MuiDataGrid-cell": {
              borderRadius: 0,
              backgroundColor: "#ffffff",
            },
            "& .MuiDataGrid-cell:focus, .MuiDataGrid-columnHeader:focus, .MuiDataGrid-columnHeader:focus-within":
              { outline: "none" },
            "& .MuiDataGrid-columnHeaders": {
              borderRadius: 0,
              backgroundColor: "#3b3b3b",
              color: "#ffffff",
              "& .MuiButtonBase-root": {
                color: "#ffffff",
                borderRadius: 0,
                border: "none",
                backgroundColor: "#3b3b3b",
                "&:hover": {
                  backgroundColor: "#3b3b3b",
                },
              },
            },
          },
        },
      },
    },
  },
  esES,
  coreEsES
);
