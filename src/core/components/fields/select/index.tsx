import { MenuItem, TextField, TextFieldProps } from "@mui/material";

type SelectProps = {
  options: { label: string; value: string | number }[];
} & TextFieldProps;

export const Select: React.FC<SelectProps> = ({ options, ...rest }) => {
  return (
    <TextField {...rest} select>
      {options.map(({ value, label }, index) => (
        <MenuItem key={index} value={value}>
          {label}
        </MenuItem>
      ))}
    </TextField>
  );
};
