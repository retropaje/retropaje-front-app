import { LocalizationProvider, DatePicker, DatePickerProps } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import es from "date-fns/locale/es";
export const DatePickerComponent: React.FC<DatePickerProps<Date>> = (props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
      <DatePicker {...props} />
    </LocalizationProvider>
  );
};
