import { FileUploadOutlined } from "@mui/icons-material";
import { IconButton, TextField, TextFieldProps } from "@mui/material";

type FileInputProps = {
  handleUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & TextFieldProps;

export const FileInput: React.FC<FileInputProps> = ({ handleUpload, ...rest }) => {
  return (
    <TextField
      {...rest}
      InputProps={{
        endAdornment: (
          <IconButton component="label">
            <FileUploadOutlined />
            <input
              style={{ display: "none" }}
              type="file"
              hidden
              onChange={handleUpload}
              name="[licenseFile]"
            />
          </IconButton>
        ),
      }}
    />
  );
};
