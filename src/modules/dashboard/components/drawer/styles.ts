import { SxStyles } from "core/types";

export const useStyles = (width: number): SxStyles<"root" | "item"> => ({
  root: {
    width: width + "px !important",
    transition: "width 0.2s ease-in-out",
    backgroundColor: "#888D91",
    overflowX: "hidden",
  },
  item: {
    "&.Mui-selected": { backgroundColor: "primary.main" },
    transition: "background-color 0.2s ease-in-out",
  },
});
