// INSTALAR: npm install leaflet react-leaflet @types/leaflet
import { Icon } from "leaflet";
import { CircleMarker, MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Pontos de exemplo da rota com altitude
const routePoints: { lat: number; lng: number; alt: number }[] = [
  { lat: -23.812558218839115, lng: -46.720761875013594, alt: 24 },
  { lat: -23.81324328419048, lng: -46.71967023243088, alt: 26 },
  { lat: -23.81392834592689, lng: -46.71681030930096, alt: 27 },
  { lat: -23.815804849877246, lng: -46.71570375449862, alt: 29 },
  { lat: -23.818072154538616, lng: -46.7113049318389, alt: 31 },
  { lat: -23.818935879229603, lng: -46.70964196226216, alt: 33 }
];

// Ícones customizados
const startIcon = new Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const endIcon = new Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface HikingMapProps {
  className?: string;
}

export default function HikingMap({ className = "" }: HikingMapProps) {
  const center = routePoints[Math.floor(routePoints.length / 2)];
  const polylinePositions: [number, number][] = routePoints.map(p => [p.lat, p.lng]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={15}
        scrollWheelZoom={false}
        className="w-full h-full"
        zoomControl={false}
      >
        {/* Tiles minimalistas - Carto Light */}
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {/* Linha da rota */}
        <Polyline
          positions={polylinePositions}
          pathOptions={{
            color: "#7c3aed",
            weight: 3,
            opacity: 0.8,
            lineCap: "round",
            lineJoin: "round"
          }}
        />

        {/* Pontos intermediários */}
        {routePoints.slice(1, -1).map((point, index) => (
          <CircleMarker
            // biome-ignore lint/suspicious/noArrayIndexKey: <nah>
            key={index}
            center={[point.lat, point.lng]}
            radius={5}
            pathOptions={{
              color: "#7c3aed",
              fillColor: "#ffffff",
              fillOpacity: 1,
              weight: 2
            }}
          >
            <Popup>
              <span className="text-sm">
                <strong>Ponto {index + 2}</strong>
                <br />
                Altitude: {point.alt}m
              </span>
            </Popup>
          </CircleMarker>
        ))}

        {/* Marcador de início */}
        <Marker position={[routePoints[0].lat, routePoints[0].lng]} icon={startIcon}>
          <Popup>
            <strong>Início</strong>
            <br />
            Altitude: {routePoints[0].alt}m
          </Popup>
        </Marker>

        {/* Marcador de fim */}
        <Marker 
          position={[routePoints[routePoints.length - 1].lat, routePoints[routePoints.length - 1].lng]} 
          icon={endIcon}
        >
          <Popup>
            <strong>Fim</strong>
            <br />
            Altitude: {routePoints[routePoints.length - 1].alt}m
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}