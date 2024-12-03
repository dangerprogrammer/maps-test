'use client';

import { LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";
import { device_result } from "@/types";
import dynamic from "next/dynamic";

function Home() {
  const position: LatLngExpression = [51.505, -0.09];
  const [deviceResults, setDeviceResults] = useState<device_result[]>([]);
  const [isLoading, setIsLoading] = useState(!0);

  useEffect(() => {
    (async () => {
      const data = await fetch('http://127.0.0.1:8000/api/contentors/');

      if (!data) return console.error("Oh não! Erro ao carregar a API!");

      const gps = await data.json(), { results } = gps;

      setTimeout(() => setIsLoading(!1), 1e3);
      setDeviceResults(results);
      console.clear();
      console.table(results);
    })();
  }, []);

  const MapContent = dynamic(() => import('@/components/map-component'), { ssr: !1 });

  return <>
    <main className="flex items-center justify-center min-h-screen">
      <span className="flex items-center justify-center absolute bg-black h-full w-full">
        <video className="opacity-50 flex object-cover pointer-events-none h-full w-full" autoPlay playsInline disablePictureInPicture src="./background-video.mp4"></video>
      </span>
      <h1 className="text-6xl font-extrabold max-w-[50vw] text-center z-[100]">Saiba para onde o lixo vai com a <span className="font-black text-green-400 text-nowrap">Smart Container</span></h1>
    </main>
    <main className="flex items-center justify-center min-h-screen">
      {isLoading ? <div>Carregando...</div> : <MapContent position={position}></MapContent>}
    </main>
  </>
}

export default Home;