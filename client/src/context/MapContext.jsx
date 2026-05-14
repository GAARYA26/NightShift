import {
  createContext,
  useContext,
  useState,
} from "react";

const MapContext =
  createContext();

export function MapProvider({
  children,
}) {

  const [destination, setDestination] =
    useState(null);

  return (
    <MapContext.Provider
      value={{
        destination,
        setDestination,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

export function useMapContext() {
  return useContext(
    MapContext
  );
}