import { Card, Title, AreaChart } from "@tremor/react";

const dataFormatter = (number) => {
  return " " + Intl.NumberFormat("us").format(number).toString();
};

const ChartArea = ({ title, dataChart, days }) => {
  return (
    <Card>
      <Title>{title}</Title>
      <AreaChart
        className="h-72 mt-4"
        data={dataChart.slice(-days)}
        index="date"
        categories={["integration","installation"]}
        colors={["indigo","rose"]}
        valueFormatter={dataFormatter}
      />
    </Card>
  );
};

export default ChartArea;
