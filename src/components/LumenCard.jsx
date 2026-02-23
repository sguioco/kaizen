import React from "react";

function ServiceIcon({ type, gradientId }) {
  return (
    <svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0" x2="0" y1="-0.2" y2="1">
          <stop offset="0%" stopColor="#bbb" />
          <stop offset="100%" stopColor="#555" />
        </linearGradient>
        <filter id={`${gradientId}-inner`}>
          <feFlood floodColor="#ffffff22" />
          <feComposite operator="out" in2="SourceGraphic" />
          <feMorphology operator="dilate" radius="2" />
          <feGaussianBlur stdDeviation="6" />
          <feComposite operator="atop" in2="SourceGraphic" />
        </filter>
      </defs>
      {type === "car" && (
        <>
          <path
            d="M12 38l6-12h28l6 12v8H12z"
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={`url(#${gradientId}-inner)`}
          />
          <path
            d="M18 38h28"
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="20"
            cy="46"
            r="4"
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="2.2"
          />
          <circle
            cx="44"
            cy="46"
            r="4"
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="2.2"
          />
        </>
      )}
      {type === "moto" && (
        <>
          <circle
            cx="18"
            cy="44"
            r="6"
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="2.2"
          />
          <circle
            cx="46"
            cy="44"
            r="6"
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="2.2"
          />
          <path
            d="M18 44l10-14h10l8 10"
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M28 30l-4-6h8"
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
      {type === "motorhome" && (
        <>
          <rect
            x="10"
            y="22"
            width="44"
            height="18"
            rx="3"
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="2.2"
          />
          <path
            d="M22 22v10h10V22"
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="22"
            cy="44"
            r="4"
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="2.2"
          />
          <circle
            cx="44"
            cy="44"
            r="4"
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="2.2"
          />
        </>
      )}
      {type === "yacht" && (
        <>
          <path
            d="M14 40l10-12h14l12 12"
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 40h44l-6 8H18z"
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M30 16v12"
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
      {type === "home" && (
        <>
          <rect
            x="12"
            y="22"
            width="40"
            height="22"
            rx="2"
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="2.2"
          />
          <path
            d="M12 30h40M12 38h40M24 22v22M36 22v22"
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
      {type === "secret" && (
        <>
          <path
            d="M32 16v24"
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <circle
            cx="32"
            cy="48"
            r="3"
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="2.2"
          />
          <circle
            cx="32"
            cy="32"
            r="18"
            stroke={`url(#${gradientId})`}
            strokeWidth="1.4"
            fill="none"
            opacity="0.4"
          />
        </>
      )}
    </svg>
  );
}

export function LumenCard({ title, mobileTitle, state, icon, index, className = "", soonLabel = "SOON", onClick, isSelected = false }) {
  const isActive = state === "active";
  const isAuto = icon === "car";
  const isSecret = state === "secret" || icon === "secret";
  const canClick = isActive && typeof onClick === "function";
  const computedMobileTitle = (mobileTitle || title)
    .replace(/\s+detailing$/i, "")
    .replace(/^detailing\s+/i, "")
    .replace(/^تفاصيل\s+/, "")
    .replace(/^تفصيل\s+/, "")
    .trim();

  return (
    <div
      className={`lumen-card ${state} service-${icon} ${isAuto ? "auto" : ""} ${isActive ? "active" : "inactive"} ${isSelected ? "selected" : ""} ${className}`}
      onClick={canClick ? onClick : undefined}
      style={canClick ? { cursor: "pointer" } : undefined}
      role={canClick ? "button" : undefined}
      tabIndex={canClick ? 0 : undefined}
      onKeyDown={canClick ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(); } } : undefined}
    >
      <div className="light-layer" aria-hidden="true">
        <div className="slit" />
        <div className="lumen">
          <div className="min" />
          <div className="mid" />
          <div className="hi" />
        </div>
        <div className="darken">
          <div className="sl" />
          <div className="ll" />
          <div className="slt" />
          <div className="srt" />
        </div>
      </div>
      <div className="content">
        <div className="icon">
          {isAuto ? (
            <div className="auto-icon" aria-hidden="true">
              <img className="auto-off service-img-auto" src="/rolls1.png" alt="" loading="lazy" decoding="async" />
              <img className="auto-on service-img-auto" src="/rolls2.png" alt="" loading="lazy" decoding="async" />
            </div>
          ) : isSecret ? (
            <div className="service-img-icon" aria-hidden="true">
                <img
                  src="/questionmark.png"
                  alt={title}
                  className="service-img service-img-secret"
                  loading="lazy"
                  decoding="async"
                />
            </div>
          ) : ["moto", "motorhome", "yacht", "home"].includes(icon) ? (
            <div className="service-img-icon" aria-hidden="true">
                <img
                  src={
                    icon === "moto" ? "/moto.png" :
                      icon === "motorhome" ? "/concord.png" :
                        icon === "yacht" ? "/yacht.png" :
                        "/home.png"
                  }
                  alt={title}
                  className={`service-img service-img-${icon}`}
                  loading="lazy"
                  decoding="async"
                />
            </div>
          ) : (
            <ServiceIcon type={icon} gradientId={`lumen-${icon}-${index}`} />
          )}
        </div>
        <div className="bottom">
          <h4 className={`service-title service-title-${icon}`}>
            <span className="service-title-desktop">{title}</span>
            <span className="service-title-mobile">{computedMobileTitle}</span>
          </h4>
        </div>
        {state === "soon" && <span className="soon-overlay">{soonLabel}</span>}
      </div>
    </div>
  );
}
