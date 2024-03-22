import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerImage from '../../../../../public/assets/location.png'; 

interface Iprop {
  setLatLong: React.Dispatch<React.SetStateAction<{ lat: number; long: number }>>;
  initialLat: number;
  initialLong: number;
}

const Map: React.FC<Iprop> = (props) => {
  const { setLatLong, initialLat, initialLong } = props;
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    const initializeMap = async () => {
      if (!mapContainer.current) return;

      try {
        const L = (await import("leaflet")).default;

        mapInstance.current = L.map(mapContainer.current!).setView([initialLat, initialLong], 12);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
        }).addTo(mapInstance.current);

        // Create a marker with an initial position and a custom icon
        markerRef.current = L.marker([initialLat, initialLong], {
          icon: L.icon({
            iconUrl: markerImage.src,
            iconSize: [32, 32], // Adjust the size of your marker image
            iconAnchor: [16, 32], // Adjust the anchor point based on your image
          }),
        }).addTo(mapInstance.current!);

        mapInstance.current.on("click", (e) => {
          const { lat, lng } = e.latlng;
          // Update the marker position on click
          if (markerRef.current) {
            markerRef.current.setLatLng([lat, lng]);
          } else {
            // Create a new marker if it doesn't exist
            markerRef.current = L.marker([lat, lng], {
              icon: L.icon({
                iconUrl: markerImage.src,
                iconSize: [32, 32],
                iconAnchor: [16, 32],
              }),
            }).addTo(mapInstance.current!);
          }

          setLatLong({ lat, long: lng });
        });
      } catch (error) {
        console.error("Failed to load Leaflet:", error);
      }
    };

    initializeMap();

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [setLatLong, initialLat, initialLong]);

  return (
    <div
      ref={mapContainer}
      style={{ height: "250px", width: "100%", boxSizing: "border-box", cursor: "pointer", borderRadius: "10px" }}
      className="forMap"
    />
  );
};

export default Map;
