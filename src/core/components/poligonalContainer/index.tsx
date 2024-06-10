import { styled, Box, BoxProps } from "@mui/material";
import { Images } from "core/enums";

const toobarHeight = 75;
export const PoligonalContainer = styled(Box)<BoxProps>(() => ({
  width: "100%",
  minHeight: `calc(100vh - ${toobarHeight}px)`,
  position: "relative",
  backgroundImage: `url(${Images.Polygons})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
}));
