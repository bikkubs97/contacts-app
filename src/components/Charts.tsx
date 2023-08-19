import LineChart from "./LineChart";
import Leaflet from "./Leaflet";

export default function Charts(): JSX.Element {
  return (
    <>
      <div className="md:ml-[15vw]">
        <h1 className="text-center font-bold p-5 bg-blue-400 text-white ">
          Charts and Maps
        </h1>
        <h1 className="font-bold p-1 text-blue-800">Line Graph</h1>
        <LineChart />
        <h1 className="font-bold p-1 text-blue-800">Country Data</h1>
        <Leaflet />
      </div>
    </>
  );
}
