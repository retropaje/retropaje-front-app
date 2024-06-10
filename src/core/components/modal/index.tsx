import { Close } from "@mui/icons-material";
import { Box, Dialog, IconButton, Paper } from "@mui/material";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  closeButton?: boolean;
};

export const Modal: React.FC<ModalProps> = ({ onClose, open, children, closeButton }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <Paper elevation={3} sx={{ minHeight: 200, minWidth: 300 }}>
        {closeButton && (
          <Box display="flex" justifyContent="flex-end">
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </Box>
        )}
        {children}
      </Paper>
    </Dialog>
  );
};
