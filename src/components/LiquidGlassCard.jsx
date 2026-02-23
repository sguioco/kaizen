import React from "react";

export default function LiquidGlassCard({
  children,
  className = "",
  borderRadius = "18px",
  style
}) {
  return (
    <div
      className={`liquid-glass-card ${className}`.trim()}
      style={{ borderRadius, ...style }}
    >
      {children}
    </div>
  );
}
