'use client';

import { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import { device_result } from "@/types";

function Home() {
  const position: LatLngExpression = [51.505, -0.09];
  const [deviceResults, setDeviceResults] = useState<device_result[]>([]);
  const [isLoading, setIsLoading] = useState(!0);

  useEffect(() => {
    async function getGPS() {
      const data = await fetch('http://127.0.0.1:8000/api/contentors/');
      const gps = (await data.json()) as device_result[];

      setIsLoading(!1);
      setDeviceResults(gps);
      console.log(gps);
    };

    getGPS();
  }, []);

  if (isLoading) {
    return <div> Carregando...</div>;
  }

  return <>
    <h1>Hello, World!</h1>
    <section className="map-container">
      <MapContainer center={position} zoom={13} scrollWheelZoom={!1}>
        <TileLayer
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position}>
          <Popup>
            A pretty CSS popup.
          </Popup>
        </Marker>
      </MapContainer>
    </section>
  </>
}

export default Home;