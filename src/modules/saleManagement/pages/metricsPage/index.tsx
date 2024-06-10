import { useState } from "react";
import { LinearProgress, Typography } from "@mui/material";
import { format } from "date-fns";
import { AnimatedContainer } from "core/components";
import { Font } from "core/enums";
import { DateRangeComponent } from "modules/saleManagement/components";
import { metrics } from "modules/saleManagement/services/sale.services";
import { Metrics } from "modules/saleManagement/types/metric.type";
import { BarChart } from "core/components/charts";

const colorsByIndex = ["#D31024", "#EA384D", "#F56A79", "#F98C9A", "#FCADBB"];
const toChartData = (
  metrics: Metrics
): {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
  }[];
} => {
  const { categories } = metrics;
  const categoriesEntries = Object.entries(categories ?? {});
  const labels = ["Categorias"];
  const datasets = categoriesEntries?.map(([key, value], index) => ({
    label: key,
    data: [value],
    backgroundColor: colorsByIndex[index],
  }));

  return { labels, datasets };
};

export const MetricsPage: React.FC = () => {
  const [metricsData, setMetricsData] = useState<Metrics>(Object({}));
  const handleSearch = (dates: { start: Date; end: Date }) => {
    const body = {
      date_start: format(dates.start, "yyyy-MM-dd"),
      date_end: format(dates.end, "yyyy-MM-dd"),
    };
    metrics(body).then(({ data }) => {
      if (!data) return;
      setMetricsData(data.data);
    });
  };

  if (!metricsData) return <LinearProgress />;
  console.log(metricsData);

  return (
    <AnimatedContainer paddingX={5} paddingTop={5}>
      <Typography color="#D31024" fontFamily={Font.AcuminPro} fontSize="1.2rem">
        Metricas de ventas
      </Typography>
      <DateRangeComponent onSearch={handleSearch} />
      <BarChart data={toChartData(metricsData)} title="Ventas por categoria" />
    </AnimatedContainer>
  );
};
