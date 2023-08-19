import Chart from "react-google-charts";
import { useQuery } from "react-query";

interface HistoricalData {
  cases: { [date: string]: number };
  data:number;
}

export default function LineChart(): JSX.Element {
  async function fetchData(): Promise<HistoricalData> {
    const response = await fetch(
      "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
    );
    const data = await response.json();
    return data;
  }

  const { data, isLoading } = useQuery<HistoricalData>(
    "historicData",
    fetchData
  );

  if (isLoading) return <p>Loading...</p>;

  const chartData = [];
  for (const date in data?.cases) {
    chartData.push([new Date(date), data.cases[date]]);
  }

  const options = {
    title: "COVID-19 Cases Over Time",
    curveType: "function",
    legend: { position: "bottom" },
  };

  return (
    <Chart
      chartType="LineChart"
      data={[["Date", "Cases"], ...chartData]}
      options={options}
      width="100%"
      height="300px"
    />
  );
}
