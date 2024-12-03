import { LatLngExpression } from "leaflet";
import { ReactElement } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

function MapComponent({ position, children }: { position: LatLngExpression, children?: ReactElement }) {
    return <section className="h-full w-full">
        <MapContainer center={position} zoom={16} scrollWheelZoom={!1}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {children}
        </MapContainer>
    </section>
};

export default MapComponent;