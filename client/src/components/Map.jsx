import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import { useEffect, useState } from "react";

import axios from "axios";

import L from "leaflet";

import Routing from "./Routing";

import { useMapContext } from "../context/MapContext";

// 🔥 FIX ICONS
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// 📍 USER ICON
const userIcon = new L.Icon({
  iconUrl:
    "https://cdn-icons-png.flaticon.com/512/149/149060.png",

  iconSize: [35, 35],
});

export default function Map() {

  const [businesses, setBusinesses] =
    useState([]);

  const [userLocation, setUserLocation] =
    useState(null);

  const {
    destination,
    setDestination,
  } = useMapContext();

  // 📥 FETCH
  const fetchBusinesses = async () => {

    try {

      const res = await axios.get(
        "https://nightshift-server.onrender.com/api/business/live"
      );

      setBusinesses(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  // 📍 USER LOCATION
  const getUserLocation = () => {

    navigator.geolocation.getCurrentPosition(

      (position) => {

        setUserLocation([
          position.coords.latitude,
          position.coords.longitude,
        ]);
      },

      (err) => {
        console.log(err);
      }
    );
  };

  useEffect(() => {

    fetchBusinesses();

    getUserLocation();

  }, []);

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
      }}
    >
      <MapContainer
        center={
          userLocation || [
            17.6805,
            75.3300,
          ]
        }
        zoom={13}
        style={{
          height: "100%",
          width: "100%",
        }}
      >

        {/* 🌍 MAP */}
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {/* 📍 USER */}
        {userLocation && (
          <>
            <Marker
              position={userLocation}
              icon={userIcon}
            >
              <Popup>
                📍 You are here
              </Popup>
            </Marker>

            <Circle
              center={userLocation}
              radius={500}
              pathOptions={{
                color: "#2563eb",
                fillColor: "#2563eb",
                fillOpacity: 0.15,
              }}
            />
          </>
        )}

        {/* 🏪 SERVICES */}
        {businesses.map((business) => {

          const lat =
            business.location
              ?.coordinates?.[1];

          const lng =
            business.location
              ?.coordinates?.[0];

          if (
            lat === undefined ||
            lng === undefined
          ) {
            return null;
          }

          return (
            <Marker
              key={business._id}
              position={[lat, lng]}
            >
              <Popup>

                <strong>
                  {business.name}
                </strong>

                <br />

                {business.category}

                <br />

                🟢 OPEN NOW

                <br />

                <button
                  onClick={() =>
                    setDestination([
                      lat,
                      lng,
                    ])
                  }
                  style={{
                    marginTop: "10px",
                    padding: "10px 14px",
                    border: "none",
                    borderRadius: "12px",
                    background:
                      "#2563eb",
                    color: "white",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  📍 Start Route
                </button>

              </Popup>
            </Marker>
          );
        })}

        {/* 🛣️ ROUTING */}
        {userLocation &&
          destination && (
            <Routing
              userLocation={
                userLocation
              }
              destination={
                destination
              }
            />
          )}

      </MapContainer>
    </div>
  );
}