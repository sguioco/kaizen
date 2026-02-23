import React from "react";
import "./UaeCoverageMap.css";

const REGIONS = [
  { id: "abudhabi", defaultLabel: "Abu Dhabi", x: 255, y: 300, align: "end" },
  { id: "dubai", defaultLabel: "Dubai", x: 520, y: 245, align: "start" },
  { id: "sharjah", defaultLabel: "Sharjah", x: 580, y: 220, align: "start" }
];

export default function UaeCoverageMap({ active = "dubai", onChange, labels }) {
  const setActive = (id) => {
    if (typeof onChange === "function") onChange(id);
  };

  const onKey = (e, id) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActive(id);
    }
  };

  return (
    <div className="uae-map-wrap">
      <svg
        className="uae-map"
        viewBox="0 0 900 520"
        role="img"
        aria-label="United Arab Emirates coverage map"
      >
        <defs>
          <linearGradient id="uaeFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="rgba(255,255,255,0.06)" />
            <stop offset="0.6" stopColor="rgba(255,255,255,0.02)" />
            <stop offset="1" stopColor="rgba(255,255,255,0.01)" />
          </linearGradient>
          <linearGradient id="coastSheen" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="rgba(255,255,255,0)" />
            <stop offset="0.35" stopColor="rgba(250,0,0,0.28)" />
            <stop offset="0.7" stopColor="rgba(0,190,190,0.18)" />
            <stop offset="1" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <pattern id="grid" width="36" height="36" patternUnits="userSpaceOnUse">
            <path
              d="M36 0 H0 V36"
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
            />
          </pattern>
          <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 0.55 0"
              result="glow"
            />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect x="0" y="0" width="900" height="520" fill="url(#grid)" opacity="0.18" />

        {/* Stylized UAE silhouette (not a street map; just a premium contour). */}
        <path
          className="uae-outline"
          d="M120 365
             L165 325
             L240 302
             L310 285
             L410 268
             L510 248
             L620 228
             L715 214
             L790 225
             L845 270
             L865 320
             L840 352
             L765 372
             L665 392
             L545 407
             L420 410
             L305 402
             L210 390
             Z"
          fill="url(#uaeFill)"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="2"
          filter="url(#softGlow)"
        />

        {/* A subtle coastal sheen to make it feel "alive" without clutter. */}
        <path
          d="M165 325
             L240 302
             L310 285
             L410 268
             L510 248
             L620 228
             L715 214
             L790 225"
          fill="none"
          stroke="url(#coastSheen)"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.7"
        />

        {REGIONS.map((r) => {
          const isActive = active === r.id;
          const label = labels?.[r.id] ?? r.defaultLabel;
          return (
            <g
              key={r.id}
              className={`uae-pin ${isActive ? "active" : ""}`}
              transform={`translate(${r.x} ${r.y})`}
              role="button"
              tabIndex={0}
              aria-label={label}
              onClick={() => setActive(r.id)}
              onKeyDown={(e) => onKey(e, r.id)}
            >
              <circle className="pin-ring" r="18" />
              <circle className="pin-halo" r="10" />
              <circle className="pin-core" r="4" />

              <g className="pin-label" transform={`translate(${r.align === "end" ? -14 : 14} -14)`}>
                <rect className="pin-pill" x={r.align === "end" ? -140 : 0} y="-18" width="140" height="30" rx="15" />
                <text
                  className="pin-text"
                  x={r.align === "end" ? -70 : 70}
                  y="2"
                  textAnchor="middle"
                >
                  {label}
                </text>
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
