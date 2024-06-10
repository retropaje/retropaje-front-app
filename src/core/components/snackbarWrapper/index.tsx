import * as React from "react";
import { Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const SnackbarWrapper = ({
  handleClose,
  message,
  severity = "success",
}: {
  handleClose: () => void;
  message: string | undefined;
  severity?: "success" | "info" | "warning" | "error" | undefined;
}) => {
  const [open, setOpen] = React.useState(false);

  const handleCloseSnackbar = () => {
    setOpen(false);
    sleep(500).then(handleClose);
  };

  React.useEffect(() => setOpen(!!message), [message]);

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleCloseSnackbar}>
      <Alert onClose={handleCloseSnackbar} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
