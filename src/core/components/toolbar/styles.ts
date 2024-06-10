import { SxStyles } from "core/types";

export const styles: SxStyles<"root" | "buttonContainer"> = {
  root: {
    background: "light.main",
    width: "100%",
    height: "75px",
    display: "flex",
    padding: "0 32px 0 8px",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 0,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& .logo": {
      paddingLeft: 3,
    },
  },
};
