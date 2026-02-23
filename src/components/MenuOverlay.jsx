import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function MenuOverlay({
    isOpen,
    onClose,
    links,
    language,
    onLanguageChange,
    uiCopy,
    onNavigateServices,
    onNavigatePricing,
    onNavigateMembership,
    onNavigatePortfolio,
    showPortfolio = true
}) {
    const overlayRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            gsap.to(overlayRef.current, {
                autoAlpha: 1,
                duration: 0.4,
                ease: "power3.out"
            });
            gsap.fromTo(
                contentRef.current.children,
                { y: 20, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.4,
                    stagger: 0.05,
                    ease: "power3.out",
                    delay: 0.1
                }
            );
        } else {
            gsap.to(overlayRef.current, {
                autoAlpha: 0,
                duration: 0.3,
                ease: "power3.in"
            });
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            ref={overlayRef}
            className="menu-overlay"
            style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(5, 5, 5, 0.95)",
                backdropFilter: "blur(10px)",
                zIndex: 200, // Higher than header
                opacity: 0,
                visibility: "hidden",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "2rem"
            }}
        >
            <button
                onClick={onClose}
                style={{
                    position: "absolute",
                    top: "1.5rem",
                    right: "1.5rem",
                    background: "transparent",
                    border: "none",
                    color: "#fff",
                    fontSize: "2rem",
                    cursor: "pointer"
                }}
            >
                &times;
            </button>

            <div
                ref={contentRef}
                className="menu-content"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "2rem",
                    width: "100%"
                }}
            >
                {/* Navigation Links */}
                <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); onClose(); }} style={linkStyle}>{uiCopy.nav.home[language]}</a>
                <a href="#services" onClick={(e) => { e.preventDefault(); onNavigateServices?.(); }} style={linkStyle}>{uiCopy.nav.services[language]}</a>
                <a href="#pricing" onClick={(e) => { e.preventDefault(); onNavigatePricing?.(); }} style={linkStyle}>{uiCopy.nav.pricing[language]}</a>
                <a href="#pricing" onClick={(e) => { e.preventDefault(); onNavigateMembership?.(); }} style={linkStyle}>{uiCopy.nav.membership[language]}</a>
                <a href="#why" onClick={onClose} style={linkStyle}>{uiCopy.nav.aboutUs[language]}</a>
                {showPortfolio ? (
                    <a href="#portfolio" onClick={(e) => { e.preventDefault(); onNavigatePortfolio?.(); }} style={linkStyle}>{uiCopy.nav.portfolio[language]}</a>
                ) : null}
                <a href="#trust" onClick={onClose} style={linkStyle}>{uiCopy.nav.partners[language]}</a>
                <a href="#contact" onClick={onClose} style={linkStyle}>{uiCopy.nav.contact[language]}</a>

                <div style={{ width: "100%", height: "1px", background: "rgba(255,255,255,0.1)", margin: "1rem 0" }} />

                {/* Language Switcher */}
                <div className="lang-switch-mobile" style={{ display: "flex", gap: "1rem" }}>
                    {["EN", "RU", "AR"].map((lang) => (
                        <button
                            key={lang}
                            onClick={() => onLanguageChange(lang)}
                            style={{
                                background: language === lang ? "white" : "transparent",
                                color: language === lang ? "black" : "white",
                                border: "1px solid rgba(255,255,255,0.3)",
                                padding: "0.5rem 1rem",
                                borderRadius: "999px",
                                fontSize: "1rem",
                                cursor: "pointer",
                                transition: "all 0.3s ease"
                            }}
                        >
                            {lang === "AR" ? "عربي" : lang}
                        </button>
                    ))}
                </div>

                {/* Book Now Button */}
                <a
                    href="https://wa.me/971543720101" // Or existing whatsapp logic
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                    className="btn btn-primary"
                    style={{
                        marginTop: "1rem",
                        width: "100%",
                        textAlign: "center",
                        maxWidth: "300px"
                    }}
                >
                    {uiCopy.nav.bookNow[language]}
                </a>
            </div>
        </div>
    );
}

const linkStyle = {
    fontSize: "1.5rem",
    color: "#fff",
    textDecoration: "none",
    fontWeight: "500"
};
