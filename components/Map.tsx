"use client";

import dynamic from "next/dynamic";

const DynamicMap = dynamic(
  async () => {
    const { MapContainer, TileLayer, Marker, Popup } = await import("react-leaflet");

    return function Map() {
      return (
        <MapContainer
          center={[5.3599517, -4.0082563]}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={[5.3599517, -4.0082563]}>
            <Popup>Salon Beauté CI</Popup>
          </Marker>
        </MapContainer>
      );
    };
  },
  {
    ssr: false,
  }
);

export default DynamicMap;
 
//update
