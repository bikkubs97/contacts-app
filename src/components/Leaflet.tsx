import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet"; // Import Leaflet
import "leaflet/dist/leaflet.css";
import { useQuery } from "react-query";

// Create a custom icon using custom icon image
const customIcon = new L.Icon({
  iconUrl: "icon.png",
  iconSize: [32, 32], // Adjust the size of icon
  iconAnchor: [16, 32], // Adjust the anchor point
});

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
  // Function to fetch country data asynchronously
  async function fetchData(): Promise<Country[]> {
    const response = await fetch("https://disease.sh/v3/covid-19/countries");
    const data = await response.json();
    return data;
  }
  // Use react-query to fetch data and manage loading states
  const { data, isLoading } = useQuery<Country[]>("countryData", fetchData);
  // Render a loading message while data is being fetched
  if (isLoading) return <p>Loading...</p>;

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: "50vh", zIndex: 0 }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {data?.map((country) => (
        <Marker
          key={country.country}
          position={[country.countryInfo.lat, country.countryInfo.long]}
          icon={customIcon} // Use the custom icon
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
