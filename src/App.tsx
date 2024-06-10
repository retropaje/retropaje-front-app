import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "core/theme";
import { RoutesProvider } from "core/router";
import { AppContextProvider } from "core/context";

function App() {
  return (
    <AppContextProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter basename="/">
          <RoutesProvider />
        </BrowserRouter>
      </ThemeProvider>
    </AppContextProvider>
  );
}

export default App;
