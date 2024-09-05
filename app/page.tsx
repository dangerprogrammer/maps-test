'use client';

import { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function Home() {
  const position: LatLngExpression = [51.505, -0.09];

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