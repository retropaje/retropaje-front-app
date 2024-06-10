import { Box } from "@mui/material";
import { Drawer } from "../components";
import { RoutesProvider } from "modules/dashboard/router";
export const Layout: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 75px)",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Drawer />
      <Box flexGrow={1} overflow={"hidden"}>
        <RoutesProvider />
      </Box>
    </Box>
  );
};
