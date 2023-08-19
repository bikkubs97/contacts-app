import Chart from "react-google-charts";
import { useQuery } from "react-query";

// Define the shape of the historical data
interface HistoricalData {
  cases: { [date: string]: number };
  data:number;
}

export default function LineChart(): JSX.Element {
   // Function to fetch historical COVID-19 data 
  async function fetchData(): Promise<HistoricalData> {
    const response = await fetch(
      "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
    );
    const data = await response.json();
    return data;
  }
  // Use react-query to fetch data and manage loading states
  const { data, isLoading } = useQuery<HistoricalData>(
    "historicData",
    fetchData
  );
// Render a loading message while data is being fetched
if (isLoading) return (<div className="flex"><img src="loading.gif"/><p>Loading...</p></div>)

  const chartData = [];
  for (const date in data?.cases) {
    chartData.push([new Date(date), data.cases[date]]);
  }
  //chart options
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
