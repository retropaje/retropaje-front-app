import { createTheme } from "@mui/material";
import { esES } from "@mui/x-data-grid";
import { esES as coreEsES } from "@mui/material/locale";
import type {} from "@mui/x-data-grid/themeAugmentation";
import "assets/fonts/fonts.css";

export const theme = createTheme(
  {
    palette: {
      primary: { main: "#198C7D" },
      secondary: { main: "#F3AF06" },
      background: { default: "#FEFAF4" },
      text: { primary: "#0C0801" },
      info: { main: "#25dac2" },
      warning: { main: "#f9b406" },
      error: { main: "#e20337" },
    },
    typography: {
      fontFamily: "Average, serif",
      h1: { fontFamily: "Cormorant Infant, sans-serif", },
      h2: { fontFamily: "Cormorant Infant, sans-serif" },
      h3: { fontFamily: "Cormorant Infant, sans-serif" },
      h4: { fontFamily: "Cormorant Infant, sans-serif" },
      h5: { fontFamily: "Cormorant Infant, sans-serif" },
      h6: { fontFamily: "Cormorant Infant, sans-serif" },
      subtitle1: { fontFamily: "Average, serif" },
      subtitle2: { fontFamily: "Average, serif" },
      body1: { fontFamily: "Average, serif" },
      body2: { fontFamily: "Average, serif" },
      button: { fontFamily: "Average, serif" },
      caption: { fontFamily: "Average, serif" },
      overline: { fontFamily: "Average, serif" },
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
