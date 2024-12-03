'use client';

import { LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";
import { device_result } from "@/types";
// import MapComponent from "@/components/map-component";

function Home() {
  const position: LatLngExpression = [51.505, -0.09];
  const [deviceResults, setDeviceResults] = useState<device_result[]>([]);
  const [isLoading, setIsLoading] = useState(!0);

  useEffect(() => {
    (async () => {
      const data = await fetch('http://127.0.0.1:8000/api/contentors/');

      if (!data) return console.error("Oh não! Erro ao carregar a API!");

      const gps = await data.json(), { results } = gps;

      setIsLoading(!1);
      setDeviceResults(results);
      // console.table(results[0]);
    })();
  }, []);

  if (isLoading) return <div>Carregando...</div>;

  return <>
    <h1>Hello, World!</h1>
    <section className="map-container">
      {/* <MapComponent position={position}></MapComponent> */}
    </section>
  </>
}

export default Home;