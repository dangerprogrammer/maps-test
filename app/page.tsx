'use client';

import L from "leaflet";
import { useEffect, useState } from "react";
import { device_result } from "@/types";
import dynamic from "next/dynamic";
import { decimalToSexagesimal } from "geolib";
import { Marker, Popup } from "react-leaflet";

function Home() {
  const [deviceResults, setDeviceResults] = useState<device_result[]>([]);
  const [isLoading, setIsLoading] = useState(!0);

  useEffect(() => {
    (async () => {
      const data = await fetch('http://127.0.0.1:8000/api/Contentors/');

      if (!data) return console.error("Oh não! Erro ao carregar a API!");

      const gps = await data.json(), { results } = gps;

      setTimeout(() => setIsLoading(!1), 1e3);
      setDeviceResults(results);
    })();
  }, []);

  const MapContent = dynamic(() => import('@/components/map-component'), { ssr: !1 });

  const meuIcone = L.icon({
    iconUrl: '/trash-bin.png', // Substitua pelo caminho do seu arquivo PNG
    iconSize: [38, 38], // Tamanho do ícone
    iconAnchor: [19, 38], // Ponto de ancoragem (base do ícone)
    popupAnchor: [0, -38], // Posição do popup em relação ao ícone
  });

  return <>
    <main className="flex items-center justify-center min-h-screen overflow-hidden">
      <span className="flex items-center justify-center fixed bg-black h-full w-full">
        <video className="opacity-50 flex object-cover pointer-events-none h-full w-full" autoPlay loop disablePictureInPicture src="./background-video.mp4"></video>
      </span>
      <h1 className="text-6xl font-extrabold max-w-[60vw] text-center z-[100]"><span className="drop-shadow-[0_2px_.2em_#0006]">Saiba para onde o lixo vai com a </span><span className="font-black text-green-400 text-nowrap">Smart Container</span></h1>
    </main>
    <main className="bg-[#0003] flex items-center justify-center min-h-screen z-[100]">
      {isLoading ? <div>Carregando...</div> : <section className="flex gap-3 h-[80vh] w-[80vw] max-w-[96rem] overflow-x-auto pb-2.5 snap-proximity snap-x">
        {deviceResults.map((result, ind) => <li className="flex flex-col gap-2 shrink-0 grow h-full w-[calc(100%-4rem)] overflow-hidden snap-center" key={ind}>
          <p>
            <span>Latitude: {decimalToSexagesimal(result.latitude)}</span><br />
            <span>Longitude: {decimalToSexagesimal(result.longitude)}</span><br />
            <span>Data e horário: {new Date(result.timestamp).toLocaleString()}</span>
          </p>
          <span className="bg-white h-full w-full rounded-2xl overflow-hidden">
            <MapContent position={[result.latitude, result.longitude]}>
              <Marker position={[result.latitude, result.longitude]} icon={meuIcone}>
                <Popup>Device address: {result.device_addr}<br />Battery Level: {result.battery_level}<br />Is tipped over: {result.is_tipped_over ? 'Verdadeiro' : 'Falso'}</Popup>
              </Marker>
            </MapContent>
          </span>
        </li>)}
      </section>}
    </main>
  </>
}

export default Home;