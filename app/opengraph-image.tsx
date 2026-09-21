import { ImageResponse } from "next/og";

export const alt = "Daniel Raban — Senior Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 72,
          background: "#07040f",
          color: "#c77dff",
          fontFamily: "monospace",
        }}
      >
        <div style={{ fontSize: 28, color: "#41ead4", letterSpacing: 8 }}>
          DANIEL.LONDON
        </div>
        <div style={{ fontSize: 72, marginTop: 24, color: "#f4eaff" }}>
          DANIEL RABAN
        </div>
        <div style={{ fontSize: 32, marginTop: 24, color: "#ff4fd8" }}>
          SENIOR SOFTWARE ENGINEER
        </div>
        <div style={{ fontSize: 24, marginTop: 40, color: "#b39bcf" }}>
          PRESS START
        </div>
      </div>
    ),
    { ...size },
  );
}
