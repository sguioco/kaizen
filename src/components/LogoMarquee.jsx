import React from "react";

const logos = [
  { name: "Audi", file: "/brands/audi-svgrepo-com.svg" },
  { name: "Bentley", file: "/brands/bentley-svgrepo-com.svg" },
  { name: "BMW", file: "/brands/bmw-svgrepo-com.svg" },
  { name: "Bugatti", file: "/brands/bugatti-svgrepo-com.svg" },
  { name: "Cadillac", file: "/brands/cadillac-svgrepo-com.svg" },
  { name: "Ferrari", file: "/brands/ferrari-logo-svgrepo-com.svg" },
  { name: "Lamborghini", file: "/brands/lamborghini-svgrepo-com.svg" },
  { name: "Lexus", file: "/brands/lexus-svgrepo-com.svg" },
  { name: "Maserati", file: "/brands/maserati-svgrepo-com.svg" },
  { name: "Maybach", file: "/brands/maybach-svgrepo-com.svg" },
  { name: "McLaren", file: "/brands/mclaren-alt-svgrepo-com.svg" },
  { name: "Mercedes-Benz", file: "/brands/mercedes-benz-svgrepo-com.svg" },
  { name: "Porsche", file: "/brands/porsche-svgrepo-com.svg" },
  { name: "Rolls-Royce", file: "/brands/rolls-royce-svgrepo-com.svg" },
  { name: "Tesla", file: "/brands/tesla.svg" }
];

export function LogoMarquee({ ariaLabel = "Luxury brands" }) {
  return (
    <div className="logo-marquee" aria-label={ariaLabel}>
      <div className="logo-marquee__track">
        {[...logos, ...logos, ...logos].map((logo, index) => (
          <div
            className={`logo-marquee__item${
              logo.name === "BMW" ? " logo-marquee__item--bmw" : ""
            }`}
            key={`${logo.name}-${index}`}
          >
            <img src={logo.file} alt={logo.name} />
          </div>
        ))}
      </div>
    </div>
  );
}
