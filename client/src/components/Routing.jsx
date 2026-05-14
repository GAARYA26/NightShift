import { useEffect } from "react";

import { useMap } from "react-leaflet";

import L from "leaflet";

import "leaflet-routing-machine";

export default function Routing({
  userLocation,
  destination,
}) {

  const map = useMap();

  useEffect(() => {

    if (
      !userLocation ||
      !destination
    ) {
      return;
    }

    const routingControl =
      L.Routing.control({

        waypoints: [

          L.latLng(
            userLocation[0],
            userLocation[1]
          ),

          L.latLng(
            destination[0],
            destination[1]
          ),
        ],

        routeWhileDragging: false,

        addWaypoints: false,

        draggableWaypoints: false,

        fitSelectedRoutes: true,

        show: false,

        createMarker: () => null,

        lineOptions: {
          styles: [
            {
              color: "#2563eb",
              weight: 6,
            },
          ],
        },

      }).addTo(map);

    return () => {

      map.removeControl(
        routingControl
      );
    };

  }, [
    map,
    userLocation,
    destination,
  ]);

  return null;
}