import { LatLngExpression } from "leaflet";
import { ReactElement } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

function MapComponent({ position, children }: { position: LatLngExpression, children?: ReactElement }) {
    return <MapContainer center={position} zoom={13} scrollWheelZoom={!1}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {children}
    </MapContainer>
};

export default MapComponent;