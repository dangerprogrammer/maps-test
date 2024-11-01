'use client';

import { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import axios from 'axios';
import { useEffect, useState } from "react";

function Home() {
  const position: LatLngExpression = [51.505, -0.09];
  // const [dados, setDados] = useState([]);
  // const [isLoading, setIsLoading] = useState(!0);

  useEffect(() => {
    // axios.get('http://127.0.0.1:8000/api/gps')
    //   .then(response => {
    //     setDados(response.data);
    //     console.log(response.data);
    //     setIsLoading(!1);
    //   })
    //   .catch(error => {
    //     console.error('Erro:', error);
    //     setIsLoading(!1);
    //   });
  }, []);

  // if (isLoading) {
  //   return <div> Carregando...</div>;
  // }

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