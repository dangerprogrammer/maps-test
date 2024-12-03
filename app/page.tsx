'use client';

import { LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";
import { device_result } from "@/types";
import dynamic from "next/dynamic";
import { decimalToSexagesimal } from "geolib";

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
    })();
  }, []);

  const MapContent = dynamic(() => import('@/components/map-component'), { ssr: !1 });

  return <>
    <main className="flex items-center justify-center min-h-screen">
      <span className="flex items-center justify-center absolute bg-black h-full w-full">
        <video className="opacity-50 flex object-cover pointer-events-none h-full w-full" autoPlay loop disablePictureInPicture src="./background-video.mp4"></video>
      </span>
      <h1 className="text-6xl font-extrabold max-w-[60vw] text-center z-[100]"><span className="drop-shadow-[0_2px_.2em_#0006]">Saiba para onde o lixo vai com a </span><span className="font-black text-green-400 text-nowrap">Smart Container</span></h1>
    </main>
    <main className="flex items-center justify-center min-h-screen">
      {isLoading ? <div>Carregando...</div> : <section className="flex gap-3 h-[80vh] w-[80vw] max-w-[96rem] overflow-x-auto pb-2.5 snap-proximity snap-x">
        {deviceResults.map(({ latitude, longitude, timestamp }, ind) => <li className="flex flex-col gap-2 shrink-0 grow h-full w-[calc(100%-4rem)] overflow-hidden snap-center" key={ind}>
          <p>
            <span>Latitude: {decimalToSexagesimal(latitude)}</span><br />
            <span>Longitude: {decimalToSexagesimal(longitude)}</span><br />
            <span>Data e horário: {new Date(timestamp).toLocaleString()}</span>
          </p>
          <span className="bg-white h-full w-full rounded-2xl overflow-hidden">
          <MapContent position={[latitude, longitude]}></MapContent>
          </span>
        </li>)}
      </section>}
    </main>
  </>
}

export default Home;