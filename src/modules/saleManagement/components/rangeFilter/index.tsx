import { useState } from "react";
import { Button, Stack } from "@mui/material";
import { DatePickerComponent } from "core/components";

type DateRangeComponentProps = {
  onSearch: (dates: { start: Date; end: Date }) => void;
};

export const DateRangeComponent: React.FC<DateRangeComponentProps> = ({ onSearch }) => {
  const [dates, setDates] = useState<{ start: Date; end: Date }>(Object({}));
  const handleDateChange = (date: Date | null, type: "start" | "end") => {
    if (!date) return;
    setDates((prev) => ({ ...prev, [type]: date }));
  };

  const handleSearch = () => {
    onSearch(dates);
  };
  return (
    <Stack spacing={2} direction="row">
      <DatePickerComponent
        label="Fecha inicial"
        onChange={(date) => handleDateChange(date, "start")}
      />
      <DatePickerComponent label="Fecha final" onChange={(date) => handleDateChange(date, "end")} />
      <Button variant="contained" onClick={handleSearch} sx={{ minWidth: "100px" }}>
        Buscar
      </Button>
    </Stack>
  );
};
