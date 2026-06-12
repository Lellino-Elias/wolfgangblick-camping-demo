"use client";

import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const pin = L.divIcon({
  className: "",
  html: `<div style="width:26px;height:26px;border-radius:50% 50% 50% 0;background:#e3b466;transform:rotate(-45deg);box-shadow:0 6px 16px rgba(0,0,0,0.4);border:2px solid #14100a"></div>`,
  iconSize: [26, 26],
  iconAnchor: [13, 26],
  popupAnchor: [0, -24],
});

export default function MapClient({
  lat,
  lng,
  label,
  approx = false,
}: {
  lat: number;
  lng: number;
  label: string;
  /** Orts- statt Punkt-Genauigkeit: Umgebungs-Kreis statt Pin — nie ein falscher Pin. */
  approx?: boolean;
}) {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={approx ? 12 : 15}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%", background: "#efe8da" }}
    >
      {/* Attribution ist Lizenzpflicht (OSM/CARTO) — nie abschalten. */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      {approx ? (
        /* User-Pick 12.06.: Variante B „Tal-Kontext" — gestrichelter Kreis, Ortsname sichtbar. */
        <Circle
          center={[lat, lng]}
          radius={1200}
          pathOptions={{ color: "#e3b466", weight: 2, dashArray: "6 8", fillColor: "#e3b466", fillOpacity: 0.1 }}
        />
      ) : (
        <Marker position={[lat, lng]} icon={pin}>
          <Popup>{label}</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
