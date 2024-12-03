import { LatLngExpression } from "leaflet";
import { ReactElement } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

function MapComponent({ position, children }: { position: LatLngExpression, children?: ReactElement }) {
    return <section className="map-container">
        <MapContainer center={position} zoom={13} scrollWheelZoom={!1}>
        <TileLayer
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {children}
    </MapContainer>
        </section>
};

export default MapComponent;