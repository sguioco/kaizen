import React from "react";

export default function MenuButton({ onClick, isOpen }) {
    return (
        <button
            onClick={onClick}
            className="menu-button"
            aria-label="Menu"
            style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                padding: "0.5rem",
                zIndex: 201 // Above overlay if needed, though usually overlay has close button
            }}
        >
            <span
                style={{
                    display: "block",
                    width: "24px",
                    height: "2px",
                    background: "white",
                    transition: "transform 0.3s ease",
                    transform: isOpen ? "rotate(45deg) translate(6px, 6px)" : "none"
                }}
            />
            <span
                style={{
                    display: "block",
                    width: "24px",
                    height: "2px",
                    background: "white",
                    opacity: isOpen ? 0 : 1,
                    transition: "opacity 0.3s ease"
                }}
            />
            <span
                style={{
                    display: "block",
                    width: "24px",
                    height: "2px",
                    background: "white",
                    transition: "transform 0.3s ease",
                    transform: isOpen ? "rotate(-45deg) translate(5px, -5px)" : "none"
                }}
            />
        </button>
    );
}
