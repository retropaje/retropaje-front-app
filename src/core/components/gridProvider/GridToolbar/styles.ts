import { SxStyles } from "core/types";

export const styles: SxStyles<"root" | "inputProps" | "iconButton" | "icon"> = {
  root: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 1,
    "&:before": {
      content: '""',
      display: "block",
      height: "1px",
      background: "#c1c1c1",
      flexGrow: 1,
      position: "relative",
      bottom: 7,
    },
  },
  inputProps: { background: "#F4F4F4" },
  iconButton: { padding: 0, ml: 1 },
  icon: { fontSize: "2.5rem", color: "#151515" },
};
