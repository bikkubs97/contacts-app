import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useQuery } from "react-query";

interface Country {
  country: string;
  active: number;
  recovered: number;
  deaths: number;
  countryInfo: {
    lat: number;
    long: number;
  };
}

export default function Leaflet(): JSX.Element {
  async function fetchData(): Promise<Country[]> {
    const response = await fetch("https://disease.sh/v3/covid-19/countries");
    const data = await response.json();
    return data;
  }

  const { data, isLoading } = useQuery<Country[]>("countryData", fetchData);

  if (isLoading) return <p>Loading...</p>;

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: "50vh", zIndex: "0" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {data?.map((country) => (
        <Marker
          key={country.country}
          position={[country.countryInfo.lat, country.countryInfo.long]}
        >
          <Popup>
            <div>
              <h2>{country.country}</h2>
              <p>Active Cases: {country.active}</p>
              <p>Recovered Cases: {country.recovered}</p>
              <p>Deaths: {country.deaths}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
