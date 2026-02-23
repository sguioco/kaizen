import React, { useEffect, useRef } from "react";
import Vara from "vara";

export default function VaraText({ text, fontSize = 40, strokeWidth = 1, duration = 2000 }) {
    // Generate a stable unique ID for this instance
    const idRef = useRef(`vara-${Math.random().toString(36).substr(2, 9)}`);
    const varaInstance = useRef(null);

    useEffect(() => {
        // Ensure the element exists in the DOM
        const element = document.getElementById(idRef.current);
        if (!element) return;

        // cleanup previous instance contents if any (strict mode double render fix)
        element.innerHTML = "";

        const fontUrl = "https://raw.githubusercontent.com/akzhy/Vara/master/fonts/Satisfy/SatisfySL.json";

        varaInstance.current = new Vara(
            "#" + idRef.current, // Pass the ID selector string
            fontUrl,
            [
                {
                    text: text,
                    fontSize: fontSize,
                    strokeWidth: strokeWidth,
                    duration: duration,
                    width: "auto", // try to auto width
                    color: "currentColor", // inherit color
                    textAlign: "center"
                },
            ],
            {
                // Global options if needed
                strokeWidth: strokeWidth,
                fontSize: fontSize,
                textAlign: "center"
            }
        );
    }, [text, fontSize, strokeWidth, duration]);

    return (
        <div
            id={idRef.current}
            className="vara-container"
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
        />
    );
}
