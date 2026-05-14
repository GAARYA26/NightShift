import L from "leaflet";

export const glowIcon = L.divIcon({
  className: "",
  html: `
    <div style="
      width:16px;
      height:16px;
      background:#22c55e;
      border-radius:50%;
      box-shadow:0 0 15px #22c55e;
      animation:pulse 1.5s infinite;
    "></div>
  `,
});