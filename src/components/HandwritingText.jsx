import React, { useEffect, useRef, useState } from "react";
import anime from "animejs";
import opentype from "opentype.js";

export default function HandwritingText({ text = "Why Kaizen?" }) {
    const svgRef = useRef(null);
    const [letterPaths, setLetterPaths] = useState([]);
    const [viewBox, setViewBox] = useState("0 0 600 150");

    useEffect(() => {
        opentype.load("/Haymila-Regular.otf", (err, font) => {
            if (err) {
                console.error("Font could not be loaded: " + err);
                return;
            }

            const fontSize = 100;
            const startX = 0;
            const startY = 100;
            let currentX = startX;

            const paths = [];
            let minX = Infinity;
            let maxX = -Infinity;

            // Generate path for each character
            for (let i = 0; i < text.length; i++) {
                const char = text[i];

                // Get path for the char
                const path = font.getPath(char, currentX, startY, fontSize);
                const pathData = path.toPathData(2);
                const bbox = path.getBoundingBox();

                // Calculate advance width for next char
                const advance = font.getAdvanceWidth(char, fontSize);

                if (char !== " ") {
                    paths.push({
                        d: pathData,
                        id: `letter - ${i} `
                    });
                    minX = Math.min(minX, bbox.x1);
                    maxX = Math.max(maxX, bbox.x2);
                }

                currentX += advance;
            }

            // Keep the SVG tightly fit to glyph bounds so text starts from the real left edge.
            if (Number.isFinite(minX) && Number.isFinite(maxX)) {
                const paddingX = 0;
                const width = Math.max(1, (maxX - minX) + paddingX * 2);
                setViewBox(`${minX - paddingX} -20 ${width} 150`);
            }

            setLetterPaths(paths);
        });
    }, [text]);

    useEffect(() => {
        if (letterPaths.length === 0 || !svgRef.current) return;

        const elements = svgRef.current.querySelectorAll('.letter-path');

        // Reset state
        elements.forEach(el => {
            const len = el.getTotalLength();
            el.style.strokeDasharray = len;
            el.style.strokeDashoffset = len;
            el.style.fillOpacity = 0;
        });

        // Animate
        anime.remove(elements);

        // Timeline to coordinate separate animations if needed, 
        // or just a staggered animation on all elements.

        // Create animation instance (paused by default)
        const animation = anime({
            targets: elements,
            strokeDashoffset: [anime.setDashoffset, 0],
            fillOpacity: [0, 1], // Fade in fill WHILE drawing
            easing: 'easeInOutCubic',
            duration: 800, // Duration per letter
            delay: anime.stagger(200), // Delay between letters
            loop: false,
            autoplay: false // Wait for scroll
        });

        // Setup Intersection Observer
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        animation.play();
                    } else {
                        animation.pause();
                        animation.seek(0);
                    }
                });
            },
            { threshold: 0.3 } // Trigger when 30% visible
        );

        if (svgRef.current) {
            observer.observe(svgRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [letterPaths]);

    return (
        <div className="handwriting-container">
            <svg
                ref={svgRef}
                viewBox={viewBox}
                preserveAspectRatio="xMinYMid meet"
                style={{ width: "100%", maxHeight: "160px", overflow: "visible" }}
            >
                <g fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {letterPaths.map((item, index) => (
                        <path
                            key={item.id}
                            className="letter-path"
                            d={item.d}
                            style={{ fillOpacity: 0 }}
                        />
                    ))}
                </g>
            </svg>
        </div>
    );
}
