import { Box, BoxProps, Fade } from "@mui/material";

export const AnimatedContainer: React.FC<BoxProps> = (props) => {
  return (
    <Fade in={true} timeout={1000} unmountOnExit>
      <Box {...props} />
    </Fade>
  );
};
