import React, { useEffect, useRef } from "react";

const SMOKE_TEXTURE =
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/Smoke-Element.png";

export function SmokeOverlay({ className = "" }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const dpr = window.devicePixelRatio || 1;
    let width = 0;
    let height = 0;
    let particles = [];
    let fadeGradient = null;
    let running = true;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      fadeGradient = ctx.createLinearGradient(0, 0, 0, height);
      fadeGradient.addColorStop(0, "rgba(0,0,0,0.95)");
      fadeGradient.addColorStop(0.55, "rgba(0,0,0,0.75)");
      fadeGradient.addColorStop(0.8, "rgba(0,0,0,0.25)");
      fadeGradient.addColorStop(1, "rgba(0,0,0,0)");
    };

    const createParticles = (count) =>
      Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: -Math.random() * height * 0.6,
        size: 140 + Math.random() * 180,
        alpha: 0.08 + Math.random() * 0.18,
        speed: 0.12 + Math.random() * 0.24,
        drift: -0.08 + Math.random() * 0.16,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.002
      }));

    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = SMOKE_TEXTURE;

    const animate = () => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";
      particles.forEach((p) => {
        p.y += p.speed;
        p.x += p.drift;
        p.rotation += p.rotationSpeed;

        if (p.y > height + p.size) {
          p.y = -Math.random() * height * 0.4;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.drawImage(image, -p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });
      if (fadeGradient) {
        ctx.globalCompositeOperation = "destination-in";
        ctx.fillStyle = fadeGradient;
        ctx.fillRect(0, 0, width, height);
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const start = () => {
      resize();
      particles = createParticles(Math.max(24, Math.floor(width / 28)));
      animate();
    };

    if (image.complete) {
      start();
    } else {
      image.onload = start;
    }

    window.addEventListener("resize", resize);
    return () => {
      running = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className={`smoke-overlay ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
