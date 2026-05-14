import { useEffect, useState } from "react";
import axios from "axios";
import { useMapContext } from "../context/MapContext";
export default function LiveServices() {
  const [services, setServices] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [selectedCategory, setSelectedCategory] =
    useState("all");

  const [userLocation, setUserLocation] =
    useState(null);
  const { setDestination } =
    useMapContext();
  // 📥 FETCH SERVICES
  const fetchServices = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:5000/api/business/live"
      );

      setServices(res.data);

      setLoading(false);
    } catch (err) {
      console.log(err);

      setLoading(false);
    }
  };

  // 📍 USER LOCATION
  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      }
    );
  };

  useEffect(() => {
    fetchServices();

    getUserLocation();

    const interval = setInterval(() => {
      fetchServices();
    }, 10000);

    return () =>
      clearInterval(interval);
  }, []);

  // 📍 NAVIGATION


  // 📏 DISTANCE
  const calculateDistance = (
    lat1,
    lon1,
    lat2,
    lon2
  ) => {
    const R = 6371;

    const dLat =
      ((lat2 - lat1) * Math.PI) /
      180;

    const dLon =
      ((lon2 - lon1) * Math.PI) /
      180;

    const a =
      Math.sin(dLat / 2) *
        Math.sin(dLat / 2) +
      Math.cos(
        (lat1 * Math.PI) / 180
      ) *
        Math.cos(
          (lat2 * Math.PI) / 180
        ) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c =
      2 *
      Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1 - a)
      );

    return R * c;
  };

  // 🎨 CATEGORY STYLES
  const categoryData = {
    food: {
      icon: "🍔",
      color: "#f97316",
      label: "Food",
    },

    medical: {
      icon: "💊",
      color: "#22c55e",
      label: "Medical",
    },

    mechanic: {
      icon: "🔧",
      color: "#eab308",
      label: "Mechanic",
    },
  };

  // 🎯 FILTER
  let filteredServices =
    selectedCategory === "all"
      ? [...services]
      : services.filter(
          (service) =>
            service.category ===
            selectedCategory
        );

  // 📍 SORT NEAREST
    if (userLocation) {

  // 📏 FILTER WITHIN 5KM
  filteredServices =
    filteredServices.filter(
      (service) => {

        const lat =
          service.location
            ?.coordinates?.[1];

        const lng =
          service.location
            ?.coordinates?.[0];

        if (
          lat === undefined ||
          lng === undefined
        ) {
          return false;
        }

        const distance =
          calculateDistance(
            userLocation.lat,
            userLocation.lng,
            lat,
            lng
          );

        return distance <= 5;
      }
    );

  // 📍 SORT NEAREST
  filteredServices.sort(
    (a, b) => {

      const aLat =
        a.location?.coordinates?.[1];

      const aLng =
        a.location?.coordinates?.[0];

      const bLat =
        b.location?.coordinates?.[1];

      const bLng =
        b.location?.coordinates?.[0];

      const distanceA =
        calculateDistance(
          userLocation.lat,
          userLocation.lng,
          aLat,
          aLng
        );

      const distanceB =
        calculateDistance(
          userLocation.lat,
          userLocation.lng,
          bLat,
          bLng
        );

      return distanceA - distanceB;
    }
  );
}
  return (
    <div
      style={{
        position: "fixed",
        left: 20,
        top: 20,
        width: "340px",
        background:
          "rgba(17,25,40,0.75)",
        backdropFilter: "blur(20px)",
        padding: "22px",
        borderRadius: "24px",
        color: "white",
        zIndex: 99999,
        maxHeight: "88vh",
        overflowY: "auto",
        border:
          "1px solid rgba(255,255,255,0.1)",
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.4)",
      }}
    >
      {/* 🌙 TITLE */}
      <h2
        style={{
          marginBottom: "18px",
          fontSize: "24px",
        }}
      >
        🌙 Nearby Open Services
      </h2>

      {/* 🎯 FILTERS */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "18px",
          flexWrap: "wrap",
        }}
      >
        {[
          "all",
          "food",
          "medical",
          "mechanic",
        ].map((category) => (
          <button
            key={category}
            onClick={() =>
              setSelectedCategory(
                category
              )
            }
            style={{
              padding: "9px 15px",
              borderRadius: "14px",
              border: "none",
              cursor: "pointer",
              background:
                selectedCategory ===
                category
                  ? "#2563eb"
                  : "rgba(255,255,255,0.08)",
              color: "white",
              fontWeight: "bold",
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 🔄 LOADING */}
      {loading ? (
        <div
          style={{
            textAlign: "center",
            padding: "30px 0",
          }}
        >
          <div
            style={{
              fontSize: "40px",
              animation:
                "pulse 1s infinite",
            }}
          >
            🌙
          </div>

          <p
            style={{
              marginTop: "12px",
              opacity: 0.8,
            }}
          >
            Finding nearby services...
          </p>
        </div>
      ) : filteredServices.length === 0 ? (
        <p>
          No nearby services found 🌙
        </p>
      ) : (
        filteredServices.map((service) => {
          const lat =
            service.location
              ?.coordinates?.[1];

          const lng =
            service.location
              ?.coordinates?.[0];

          if (
            lat === undefined ||
            lng === undefined
          ) {
            return null;
          }

          let distance = null;

          if (userLocation) {
            distance =
              calculateDistance(
                userLocation.lat,
                userLocation.lng,
                lat,
                lng
              ).toFixed(1);
          }

          const category =
            categoryData[
              service.category
            ];

          return (
            <div
              key={service._id}
              style={{
                background:
                  "rgba(255,255,255,0.06)",
                padding: "16px",
                borderRadius: "18px",
                marginBottom: "16px",
                border: `1px solid ${category?.color}55`,
                boxShadow:
                  "0 4px 20px rgba(0,0,0,0.3)",
              }}
            >
              {/* 🏪 NAME */}
              <h3
                style={{
                  fontSize: "20px",
                  marginBottom: "6px",
                }}
              >
                {service.name}
              </h3>

              {/* 📂 CATEGORY */}
              <p
                style={{
                  color:
                    category?.color,
                  fontWeight: "bold",
                  marginTop: "4px",
                }}
              >
                {category?.icon}{" "}
                {category?.label}
              </p>

              {/* 📏 DISTANCE */}
              {distance && (
                <p
                  style={{
                    color: "#93c5fd",
                    marginTop: "6px",
                  }}
                >
                  📍 {distance} km away
                </p>
              )}

              {/* 🟢 STATUS */}
              <p
                style={{
                  color: "#4ade80",
                  fontWeight: "bold",
                  marginTop: "6px",
                }}
              >
                🟢 OPEN NOW
              </p>

              {/* 🕒 TIMING */}
              <p
                style={{
                  color: "#facc15",
                  marginTop: "4px",
                  fontWeight: "bold",
                }}
              >
                🕒 Open till{" "}
                {service.openTill ||
                  "Late Night"}
              </p>

              {/* 📍 NAVIGATE */}
              <button
                onClick={() =>
                    setDestination([
                        lat,
                        lng,
                    ])
                }
                style={{
                  marginTop: "14px",
                  width: "100%",
                  padding: "12px",
                  background:
                    "linear-gradient(135deg,#2563eb,#4f46e5)",
                  color: "white",
                  border: "none",
                  borderRadius: "14px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                📍 Navigate
              </button>

              {/* 📞 CALL */}
              <button
                onClick={() =>
                  window.open(
                    `tel:${service.phone}`
                  )
                }
                style={{
                  marginTop: "10px",
                  width: "100%",
                  padding: "12px",
                  background:
                    "linear-gradient(135deg,#16a34a,#22c55e)",
                  color: "white",
                  border: "none",
                  borderRadius: "14px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                📞 Call Now
              </button>
            </div>
          );
        })
      )}
    </div>
  );
}