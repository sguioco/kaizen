import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import React, { useState, useRef, useEffect, useCallback, lazy, Suspense } from "react";
import ReactDOMServer from "react-dom/server";
import { BeforeAfter } from "react-simple-before-after";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotionValue, useAnimationFrame, useTransform, motion, useInView } from "motion/react";
import { Renderer, Triangle, Program, Mesh, Color } from "ogl";
function ServiceIcon({ type, gradientId }) {
  return /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 64 64", width: "56", height: "56", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsxs("defs", { children: [
      /* @__PURE__ */ jsxs("linearGradient", { id: gradientId, x1: "0", x2: "0", y1: "-0.2", y2: "1", children: [
        /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "#bbb" }),
        /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "#555" })
      ] }),
      /* @__PURE__ */ jsxs("filter", { id: `${gradientId}-inner`, children: [
        /* @__PURE__ */ jsx("feFlood", { floodColor: "#ffffff22" }),
        /* @__PURE__ */ jsx("feComposite", { operator: "out", in2: "SourceGraphic" }),
        /* @__PURE__ */ jsx("feMorphology", { operator: "dilate", radius: "2" }),
        /* @__PURE__ */ jsx("feGaussianBlur", { stdDeviation: "6" }),
        /* @__PURE__ */ jsx("feComposite", { operator: "atop", in2: "SourceGraphic" })
      ] })
    ] }),
    type === "car" && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        "path",
        {
          d: "M12 38l6-12h28l6 12v8H12z",
          fill: "none",
          stroke: `url(#${gradientId})`,
          strokeWidth: "2.2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          filter: `url(#${gradientId}-inner)`
        }
      ),
      /* @__PURE__ */ jsx(
        "path",
        {
          d: "M18 38h28",
          fill: "none",
          stroke: `url(#${gradientId})`,
          strokeWidth: "2.2",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      ),
      /* @__PURE__ */ jsx(
        "circle",
        {
          cx: "20",
          cy: "46",
          r: "4",
          fill: "none",
          stroke: `url(#${gradientId})`,
          strokeWidth: "2.2"
        }
      ),
      /* @__PURE__ */ jsx(
        "circle",
        {
          cx: "44",
          cy: "46",
          r: "4",
          fill: "none",
          stroke: `url(#${gradientId})`,
          strokeWidth: "2.2"
        }
      )
    ] }),
    type === "moto" && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        "circle",
        {
          cx: "18",
          cy: "44",
          r: "6",
          fill: "none",
          stroke: `url(#${gradientId})`,
          strokeWidth: "2.2"
        }
      ),
      /* @__PURE__ */ jsx(
        "circle",
        {
          cx: "46",
          cy: "44",
          r: "6",
          fill: "none",
          stroke: `url(#${gradientId})`,
          strokeWidth: "2.2"
        }
      ),
      /* @__PURE__ */ jsx(
        "path",
        {
          d: "M18 44l10-14h10l8 10",
          fill: "none",
          stroke: `url(#${gradientId})`,
          strokeWidth: "2.2",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      ),
      /* @__PURE__ */ jsx(
        "path",
        {
          d: "M28 30l-4-6h8",
          fill: "none",
          stroke: `url(#${gradientId})`,
          strokeWidth: "2.2",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      )
    ] }),
    type === "motorhome" && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        "rect",
        {
          x: "10",
          y: "22",
          width: "44",
          height: "18",
          rx: "3",
          fill: "none",
          stroke: `url(#${gradientId})`,
          strokeWidth: "2.2"
        }
      ),
      /* @__PURE__ */ jsx(
        "path",
        {
          d: "M22 22v10h10V22",
          fill: "none",
          stroke: `url(#${gradientId})`,
          strokeWidth: "2.2",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      ),
      /* @__PURE__ */ jsx(
        "circle",
        {
          cx: "22",
          cy: "44",
          r: "4",
          fill: "none",
          stroke: `url(#${gradientId})`,
          strokeWidth: "2.2"
        }
      ),
      /* @__PURE__ */ jsx(
        "circle",
        {
          cx: "44",
          cy: "44",
          r: "4",
          fill: "none",
          stroke: `url(#${gradientId})`,
          strokeWidth: "2.2"
        }
      )
    ] }),
    type === "yacht" && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        "path",
        {
          d: "M14 40l10-12h14l12 12",
          fill: "none",
          stroke: `url(#${gradientId})`,
          strokeWidth: "2.2",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      ),
      /* @__PURE__ */ jsx(
        "path",
        {
          d: "M10 40h44l-6 8H18z",
          fill: "none",
          stroke: `url(#${gradientId})`,
          strokeWidth: "2.2",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      ),
      /* @__PURE__ */ jsx(
        "path",
        {
          d: "M30 16v12",
          fill: "none",
          stroke: `url(#${gradientId})`,
          strokeWidth: "2.2",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      )
    ] }),
    type === "home" && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        "rect",
        {
          x: "12",
          y: "22",
          width: "40",
          height: "22",
          rx: "2",
          fill: "none",
          stroke: `url(#${gradientId})`,
          strokeWidth: "2.2"
        }
      ),
      /* @__PURE__ */ jsx(
        "path",
        {
          d: "M12 30h40M12 38h40M24 22v22M36 22v22",
          fill: "none",
          stroke: `url(#${gradientId})`,
          strokeWidth: "2.2",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      )
    ] }),
    type === "secret" && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        "path",
        {
          d: "M32 16v24",
          fill: "none",
          stroke: `url(#${gradientId})`,
          strokeWidth: "2.2",
          strokeLinecap: "round"
        }
      ),
      /* @__PURE__ */ jsx(
        "circle",
        {
          cx: "32",
          cy: "48",
          r: "3",
          fill: "none",
          stroke: `url(#${gradientId})`,
          strokeWidth: "2.2"
        }
      ),
      /* @__PURE__ */ jsx(
        "circle",
        {
          cx: "32",
          cy: "32",
          r: "18",
          stroke: `url(#${gradientId})`,
          strokeWidth: "1.4",
          fill: "none",
          opacity: "0.4"
        }
      )
    ] })
  ] });
}
function LumenCard({ title, mobileTitle, state, icon, index, className = "", soonLabel = "SOON", onClick, isSelected = false }) {
  const isActive = state === "active";
  const isAuto = icon === "car";
  const isSecret = state === "secret" || icon === "secret";
  const canClick = isActive && typeof onClick === "function";
  const computedMobileTitle = (mobileTitle || title).replace(/\s+detailing$/i, "").replace(/^detailing\s+/i, "").replace(/^تفاصيل\s+/, "").replace(/^تفصيل\s+/, "").trim();
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `lumen-card ${state} service-${icon} ${isAuto ? "auto" : ""} ${isActive ? "active" : "inactive"} ${isSelected ? "selected" : ""} ${className}`,
      onClick: canClick ? onClick : void 0,
      style: canClick ? { cursor: "pointer" } : void 0,
      role: canClick ? "button" : void 0,
      tabIndex: canClick ? 0 : void 0,
      onKeyDown: canClick ? (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      } : void 0,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "light-layer", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsx("div", { className: "slit" }),
          /* @__PURE__ */ jsxs("div", { className: "lumen", children: [
            /* @__PURE__ */ jsx("div", { className: "min" }),
            /* @__PURE__ */ jsx("div", { className: "mid" }),
            /* @__PURE__ */ jsx("div", { className: "hi" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "darken", children: [
            /* @__PURE__ */ jsx("div", { className: "sl" }),
            /* @__PURE__ */ jsx("div", { className: "ll" }),
            /* @__PURE__ */ jsx("div", { className: "slt" }),
            /* @__PURE__ */ jsx("div", { className: "srt" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "content", children: [
          /* @__PURE__ */ jsx("div", { className: "icon", children: isAuto ? /* @__PURE__ */ jsxs("div", { className: "auto-icon", "aria-hidden": "true", children: [
            /* @__PURE__ */ jsx("img", { className: "auto-off service-img-auto", src: "/rolls1.webp", alt: "", loading: "eager", fetchpriority: "high", decoding: "async" }),
            /* @__PURE__ */ jsx("img", { className: "auto-on service-img-auto", src: "/rolls2.webp", alt: "", loading: "eager", fetchpriority: "high", decoding: "async" })
          ] }) : isSecret ? /* @__PURE__ */ jsx("div", { className: "service-img-icon", "aria-hidden": "true", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: "/questionmark.webp",
              alt: title,
              className: "service-img service-img-secret",
              loading: "eager",
              fetchpriority: "high",
              decoding: "async"
            }
          ) }) : ["moto", "motorhome", "yacht", "home"].includes(icon) ? /* @__PURE__ */ jsx("div", { className: "service-img-icon", "aria-hidden": "true", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: icon === "moto" ? "/moto.webp" : icon === "motorhome" ? "/concord.webp" : icon === "yacht" ? "/yacht.webp" : "/home.webp",
              alt: title,
              className: `service-img service-img-${icon}`,
              loading: "eager",
              fetchpriority: "high",
              decoding: "async"
            }
          ) }) : /* @__PURE__ */ jsx(ServiceIcon, { type: icon, gradientId: `lumen-${icon}-${index}` }) }),
          /* @__PURE__ */ jsx("div", { className: "bottom", children: /* @__PURE__ */ jsxs("h4", { className: `service-title service-title-${icon}`, children: [
            /* @__PURE__ */ jsx("span", { className: "service-title-desktop", children: title }),
            /* @__PURE__ */ jsx("span", { className: "service-title-mobile", children: computedMobileTitle })
          ] }) }),
          state === "soon" && /* @__PURE__ */ jsx("span", { className: "soon-overlay", children: soonLabel })
        ] })
      ]
    }
  );
}
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
function LogoMarquee({ ariaLabel = "Luxury brands" }) {
  return /* @__PURE__ */ jsx("div", { className: "logo-marquee", "aria-label": ariaLabel, children: /* @__PURE__ */ jsx("div", { className: "logo-marquee__track", children: [...logos, ...logos, ...logos].map((logo, index) => /* @__PURE__ */ jsx(
    "div",
    {
      className: `logo-marquee__item${logo.name === "BMW" ? " logo-marquee__item--bmw" : ""}`,
      children: /* @__PURE__ */ jsx("img", { src: logo.file, alt: logo.name })
    },
    `${logo.name}-${index}`
  )) }) });
}
function ShinyText({
  text,
  disabled = false,
  speed = 2,
  className = "",
  color = "#8f8f8f",
  shineColor = "#ffffff",
  spread = 96,
  yoyo = false,
  pauseOnHover = false,
  direction = "left",
  delay = 0
}) {
  const [isPaused, setIsPaused] = useState(false);
  const progress = useMotionValue(0);
  const elapsedRef = useRef(0);
  const lastTimeRef = useRef(null);
  const directionRef = useRef(direction === "left" ? 1 : -1);
  const animationDuration = speed * 1e3;
  const delayDuration = delay * 1e3;
  useAnimationFrame((time) => {
    if (disabled || isPaused) {
      lastTimeRef.current = null;
      return;
    }
    if (lastTimeRef.current === null) {
      lastTimeRef.current = time;
      return;
    }
    const deltaTime = time - lastTimeRef.current;
    lastTimeRef.current = time;
    elapsedRef.current += deltaTime;
    if (yoyo) {
      const cycleDuration = animationDuration + delayDuration;
      const fullCycle = cycleDuration * 2;
      const cycleTime = elapsedRef.current % fullCycle;
      if (cycleTime < animationDuration) {
        const p = cycleTime / animationDuration * 100;
        progress.set(directionRef.current === 1 ? p : 100 - p);
      } else if (cycleTime < cycleDuration) {
        progress.set(directionRef.current === 1 ? 100 : 0);
      } else if (cycleTime < cycleDuration + animationDuration) {
        const reverseTime = cycleTime - cycleDuration;
        const p = 100 - reverseTime / animationDuration * 100;
        progress.set(directionRef.current === 1 ? p : 100 - p);
      } else {
        progress.set(directionRef.current === 1 ? 0 : 100);
      }
    } else {
      const cycleDuration = animationDuration + delayDuration;
      const cycleTime = elapsedRef.current % cycleDuration;
      if (cycleTime < animationDuration) {
        const p = cycleTime / animationDuration * 100;
        progress.set(directionRef.current === 1 ? p : 100 - p);
      } else {
        progress.set(directionRef.current === 1 ? 100 : 0);
      }
    }
  });
  useEffect(() => {
    directionRef.current = direction === "left" ? 1 : -1;
    elapsedRef.current = 0;
    progress.set(0);
  }, [direction, progress]);
  const backgroundPosition = useTransform(progress, (p) => `${200 - p * 3}% center`);
  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsPaused(true);
  }, [pauseOnHover]);
  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setIsPaused(false);
  }, [pauseOnHover]);
  const gradientStyle = {
    backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 42%, ${shineColor} 50%, ${color} 58%, ${color} 100%)`,
    backgroundSize: "280% auto",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent"
  };
  return /* @__PURE__ */ jsx(
    motion.span,
    {
      className: `shiny-text ${className}`,
      style: { ...gradientStyle, backgroundPosition },
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      children: text
    }
  );
}
gsap.registerPlugin(ScrollTrigger);
function JourneyMap({ language = "EN", isRTL = false, performanceLite = false }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const vanRef = useRef(null);
  const tireFrontRef = useRef(null);
  const tireBackRef = useRef(null);
  const [isMobileLayout, setIsMobileLayout] = useState(false);
  const [isCompactDesktop, setIsCompactDesktop] = useState(false);
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const geoRef = useRef(null);
  const lightningRef = useRef(null);
  const handshakeRef = useRef(null);
  const inspectionRef = useRef(null);
  const guaranteeRef = useRef(null);
  const journeyCopy = {
    EN: {
      titleScript: "Why Kaizen Detailers?",
      titlePlain: "Why Kaizen Detailers?",
      headline: "Perfection in every detail",
      subtitle: "We bring quiet, fully equipped and well trained staff at your doorstep",
      milestones: [
        { key: "masters", title: "Master Detailers", text: "Trained professionals with years of experience." },
        { key: "materials", title: "Premium Materials", text: "Only certified, top-tier products and equipment." },
        { key: "bodycam", title: "Body Cam Control", text: "Full transparency — every step recorded." },
        { key: "inspection", title: "Final Inspection", text: "Rigorous quality check before handover." },
        { key: "guarantee", title: "Guarantee", text: "We stand behind every job we deliver." }
      ]
    },
    RU: {
      titleScript: "Почему Kaizen Detailers?",
      titlePlain: "Почему Kaizen Detailers?",
      headline: "Совершенство в каждой детали",
      subtitle: "Мы привозим тихий, полностью обученный персонал прямо к вашему порогу",
      milestones: [
        { key: "masters", title: "Мастера детейлинга", text: "Обученные профессионалы с многолетним опытом." },
        { key: "materials", title: "Премиальные материалы", text: "Только сертифицированные продукты и оборудование." },
        { key: "bodycam", title: "Контроль Body Cam", text: "Полная прозрачность — каждый этап записывается." },
        { key: "inspection", title: "Финальная проверка", text: "Строгий контроль качества перед сдачей." },
        { key: "guarantee", title: "Гарантия", text: "Мы отвечаем за каждую выполненную работу." }
      ]
    },
    AR: {
      titleScript: "لماذا كايزن ديتيلرز؟",
      titlePlain: "لماذا كايزن ديتيلرز؟",
      headline: "الكمال في كل تفصيلة",
      subtitle: "نوفر فريقًا هادئًا ومجهزًا بالكامل ومدربًا عند بابك",
      milestones: [
        { key: "masters", title: "محترفو الديتيلنج", text: "متخصصون مدربون بسنوات من الخبرة." },
        { key: "materials", title: "مواد فاخرة", text: "فقط المنتجات والمعدات المعتمدة من الدرجة الأولى." },
        { key: "bodycam", title: "مراقبة بكاميرا الجسم", text: "شفافية كاملة — كل خطوة مسجلة." },
        { key: "inspection", title: "الفحص النهائي", text: "فحص جودة صارم قبل التسليم." },
        { key: "guarantee", title: "ضمان", text: "نحن نتحمل مسؤولية كل عمل ننجزه." }
      ]
    }
  };
  const copy = journeyCopy[language] || journeyCopy.EN;
  const isRuLanguage = language === "RU";
  const vanImage = isRTL ? "/keizenCARar.webp" : "/keizenCAR.webp";
  const tireBackImg = isRTL ? "/tireBackar.webp" : "/tireBack.webp";
  const tireFrontImg = isRTL ? "/tireFrontar.webp" : "/tireFront.webp";
  const tireBackOrigin = isRTL ? "80.43% 67.15%" : "19.41% 68.36%";
  const tireFrontOrigin = isRTL ? "14.73% 66.98%" : "84.88% 68.09%";
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const van = vanRef.current;
    const tireFront = tireFrontRef.current;
    const tireBack = tireBackRef.current;
    if (!section) {
      return void 0;
    }
    if (isMobileLayout) {
      const mobileMilestones = section.querySelectorAll(".journey-mobile-milestone");
      gsap.set(mobileMilestones, { opacity: 1, scale: 1, clearProps: "transform" });
      return () => {
        gsap.killTweensOf(mobileMilestones);
      };
    }
    if (!track || !van) {
      return void 0;
    }
    const isMobile = isMobileLayout || window.matchMedia("(max-width: 780px)").matches;
    const liteMode = isLowPerformance || isMobile;
    const scrollDistance = liteMode ? 420 : 1e3;
    const scrubValue = liteMode ? 0.4 : 1;
    const shouldPin = !liteMode;
    const travelDistance = Math.max(track.clientWidth - van.clientWidth, 0);
    const startX = isRTL ? travelDistance : 0;
    const endX = isRTL ? 0 : travelDistance;
    const desktopMilestones = section.querySelectorAll(".milestone-marker");
    const forceStaticDesktop = performanceLite && !isMobileLayout;
    if (forceStaticDesktop) {
      gsap.set(van, { x: endX, force3D: true });
      if (tireBack) {
        gsap.set(tireBack, {
          x: 0,
          y: 0,
          rotation: 0,
          transformOrigin: tireBackOrigin
        });
      }
      if (tireFront) {
        gsap.set(tireFront, {
          x: 0,
          y: 0,
          rotation: 0,
          transformOrigin: tireFrontOrigin
        });
      }
      gsap.set(desktopMilestones, { opacity: 1, scale: 1, clearProps: "transform" });
      return () => {
        gsap.killTweensOf([vanRef.current, tireFrontRef.current, tireBackRef.current, ...desktopMilestones]);
      };
    }
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top+=100",
        end: `+=${scrollDistance}`,
        scrub: scrubValue,
        pin: shouldPin,
        pinSpacing: shouldPin,
        anticipatePin: 1,
        fastScrollEnd: true,
        invalidateOnRefresh: true
      }
    });
    gsap.set(van, {
      x: startX,
      force3D: true
    });
    tl.to(van, {
      x: endX,
      duration: 1,
      ease: "none",
      force3D: true
    });
    const wheelRotation = travelDistance * (isRTL ? -1 : 1);
    if (!liteMode && tireBack) {
      gsap.set(tireBack, {
        x: 0,
        y: 0,
        rotation: 0,
        transformOrigin: tireBackOrigin
      });
      tl.to(tireBack, {
        rotation: wheelRotation,
        duration: 1,
        ease: "none"
      }, 0);
    }
    if (!liteMode && tireFront) {
      gsap.set(tireFront, {
        x: 0,
        y: 0,
        rotation: 0,
        transformOrigin: tireFrontOrigin
      });
      tl.to(tireFront, {
        rotation: wheelRotation,
        duration: 1,
        ease: "none"
      }, 0);
    }
    const positions = isMobile ? [0.12, 0.3, 0.5, 0.7, 0.9] : [0.15, 0.35, 0.58, 0.8, 0.98];
    desktopMilestones.forEach((ms, i) => {
      if (ms) {
        tl.fromTo(
          ms,
          { opacity: 0 },
          { opacity: 1, duration: 0.08, ease: "power2.out" },
          positions[i]
        );
      }
    });
    return () => {
      var _a;
      (_a = tl.scrollTrigger) == null ? void 0 : _a.kill();
      tl.kill();
      gsap.killTweensOf([
        tireFrontRef.current,
        tireBackRef.current,
        geoRef.current,
        lightningRef.current,
        handshakeRef.current,
        inspectionRef.current,
        guaranteeRef.current
      ]);
    };
  }, [isRTL, isMobileLayout, isLowPerformance, performanceLite]);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const syncLayout = () => setIsMobileLayout(media.matches);
    syncLayout();
    media.addEventListener("change", syncLayout);
    return () => media.removeEventListener("change", syncLayout);
  }, []);
  useEffect(() => {
    const syncLayout = () => {
      const isDesktop = window.innerWidth >= 769;
      setIsCompactDesktop(isDesktop && (window.innerWidth <= 1500 || window.innerHeight <= 900));
    };
    syncLayout();
    window.addEventListener("resize", syncLayout);
    return () => window.removeEventListener("resize", syncLayout);
  }, []);
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cpuCores = navigator.hardwareConcurrency || 8;
    const ramGb = navigator.deviceMemory || 8;
    setIsLowPerformance(reduceMotion || cpuCores <= 4 || ramGb <= 4);
  }, []);
  const markerPositions = isMobileLayout ? isRTL ? ["94%", "74%", "54%", "34%", "14%"] : ["6%", "26%", "46%", "66%", "86%"] : isCompactDesktop ? isRTL ? ["100%", "80%", "60%", "40%", "20%"] : ["0%", "20%", "40%", "60%", "80%"] : isRTL ? ["94%", "74%", "54%", "34%", "14%"] : ["6%", "26%", "46%", "66%", "86%"];
  const milestoneIcons = ["/crown3d.webp", "/diamond3d.webp", "/cam3d.webp", "/order3d.webp", "/shield3d.webp"];
  if (isMobileLayout) {
    return /* @__PURE__ */ jsx("div", { ref: sectionRef, className: "journey-wrapper journey-wrapper-mobile", children: /* @__PURE__ */ jsxs("div", { className: "journey-content", children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "section-heading journey-heading",
          style: {
            textAlign: isRTL ? "right" : "left",
            marginLeft: isRTL ? "auto" : "0",
            marginRight: isRTL ? "0" : "auto"
          },
          children: [
            /* @__PURE__ */ jsx("h2", { className: "reveal-item", children: /* @__PURE__ */ jsx(
              ShinyText,
              {
                text: copy.titlePlain,
                speed: 6,
                delay: 0,
                color: "#cdbbb8ff",
                shineColor: "#ffffff",
                spread: 108,
                direction: isRTL ? "right" : "left",
                yoyo: false,
                pauseOnHover: false,
                disabled: isMobileLayout
              }
            ) }),
            /* @__PURE__ */ jsx("p", { className: "section-subtitle reveal-item journey-subtitle", children: copy.subtitle })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: `journey-mobile-road-wrap ${isRTL ? "rtl" : ""}`, children: /* @__PURE__ */ jsx("div", { className: "track-container journey-mobile-track", children: /* @__PURE__ */ jsx("div", { className: `van-wrapper journey-mobile-van journey-mobile-van-end ${isRTL ? "rtl" : ""}`, children: /* @__PURE__ */ jsx("img", { src: vanImage, alt: "Kaizen Car", className: "journey-van-img", loading: "lazy", decoding: "async" }) }) }) }),
      /* @__PURE__ */ jsx("div", { className: `journey-mobile-milestones ${isRTL ? "rtl" : ""}`, children: copy.milestones.map((ms, i) => /* @__PURE__ */ jsxs("div", { className: "milestone-marker journey-mobile-milestone", children: [
        /* @__PURE__ */ jsx("img", { ref: [geoRef, lightningRef, handshakeRef, inspectionRef, guaranteeRef][i], src: milestoneIcons[i], alt: ms.title, loading: "lazy", decoding: "async" }),
        /* @__PURE__ */ jsx("h4", { children: ms.title })
      ] }, ms.key)) })
    ] }) });
  }
  return /* @__PURE__ */ jsx("div", { ref: sectionRef, className: "journey-wrapper", style: {
    height: "auto",
    // Removed fixed 100vh to fit content
    minHeight: "600px",
    // Minimum height for presence
    width: "100%",
    position: "relative",
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "column",
    alignItems: isRTL ? "flex-end" : "flex-start",
    justifyContent: "flex-start",
    paddingTop: "30px",
    paddingBottom: "40px"
    // Tighten gap before next section
  }, children: /* @__PURE__ */ jsxs("div", { className: "journey-content", children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "section-heading journey-heading",
        style: {
          textAlign: isRTL ? "right" : "left",
          marginLeft: isRTL ? "auto" : "0",
          marginRight: isRTL ? "0" : "auto"
        },
        children: [
          /* @__PURE__ */ jsx("h2", { className: "reveal-item", children: /* @__PURE__ */ jsx(
            ShinyText,
            {
              text: copy.titlePlain,
              speed: 6,
              delay: 0,
              color: "#cdbbb8ff",
              shineColor: "#ffffff",
              spread: 108,
              direction: isRTL ? "right" : "left",
              yoyo: false,
              pauseOnHover: false,
              disabled: false
            }
          ) }),
          /* @__PURE__ */ jsx("p", { className: "section-subtitle reveal-item journey-subtitle", children: copy.subtitle })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { ref: trackRef, className: "track-container", style: { position: "relative", borderBottom: "2px dashed #333", display: "flex", alignItems: "flex-end" }, children: [
      /* @__PURE__ */ jsxs("div", { ref: vanRef, className: "van-wrapper", style: { position: "absolute", left: "0", bottom: "-10px", zIndex: 10 }, children: [
        /* @__PURE__ */ jsx("img", { src: vanImage, alt: "Kaizen Car", className: "journey-van-img", loading: "lazy", decoding: "async", style: { width: "100%", height: "auto", display: "block", position: "relative", zIndex: 1 } }),
        /* @__PURE__ */ jsx(
          "img",
          {
            ref: tireBackRef,
            src: tireBackImg,
            alt: "Back Tire",
            className: "journey-tire",
            style: {
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: "auto",
              zIndex: 2,
              display: "block"
            }
          }
        ),
        /* @__PURE__ */ jsx(
          "img",
          {
            ref: tireFrontRef,
            src: tireFrontImg,
            alt: "Front Tire",
            className: "journey-tire",
            style: {
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: "auto",
              zIndex: 2,
              display: "block"
            }
          }
        )
      ] }),
      copy.milestones.map((ms, i) => {
        const iconRefs = [geoRef, lightningRef, handshakeRef, inspectionRef, guaranteeRef];
        const icons = milestoneIcons;
        const isFirst = i === 0;
        const compactTitleWidth = isCompactDesktop && ms.key !== "guarantee" ? isFirst ? isRuLanguage ? "138px" : "124px" : isRuLanguage ? "124px" : "112px" : void 0;
        const compactTitleWhiteSpace = isCompactDesktop && ms.key !== "guarantee" ? "normal" : isRuLanguage ? "normal" : "nowrap";
        return /* @__PURE__ */ jsxs("div", { className: "milestone-marker", style: { position: "absolute", left: markerPositions[i], bottom: "-1px", width: "12px", height: "12px", borderRadius: "50%", background: "#fff", transform: "translate(-50%, 50%)", zIndex: 20 }, children: [
          /* @__PURE__ */ jsx("div", { className: "journey-icon-wrap", style: { position: "absolute", bottom: "25px", left: "50%", transform: "translateX(-50%)", textAlign: "center", display: "flex", alignItems: "flex-end", justifyContent: "center" }, children: /* @__PURE__ */ jsx("img", { ref: iconRefs[i], src: icons[i], alt: ms.title, loading: "lazy", decoding: "async", style: { width: "100%", height: "auto", display: "block" } }) }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: "journey-text-wrap",
              style: {
                position: "absolute",
                top: "25px",
                left: "50%",
                right: "auto",
                transform: "translateX(-50%)",
                textAlign: "center",
                width: isCompactDesktop ? compactTitleWidth : isRuLanguage ? "210px" : void 0
              },
              children: [
                /* @__PURE__ */ jsx(
                  "h4",
                  {
                    className: "journey-title",
                    style: {
                      margin: "0 0 0.3rem 0",
                      color: "#fff",
                      whiteSpace: compactTitleWhiteSpace,
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 600,
                      fontSize: isRuLanguage ? "1.08rem" : void 0,
                      lineHeight: isCompactDesktop ? "1.12" : isRuLanguage ? "1.18" : void 0,
                      textWrap: isCompactDesktop && ms.key !== "guarantee" ? "balance" : void 0
                    },
                    children: ms.title
                  }
                ),
                !isCompactDesktop ? /* @__PURE__ */ jsx(
                  "p",
                  {
                    className: "journey-desc",
                    style: {
                      color: "#888",
                      margin: 0,
                      lineHeight: "1.3",
                      fontSize: isRuLanguage ? "0.96rem" : void 0
                    },
                    children: ms.text
                  }
                ) : null
              ]
            }
          )
        ] }, ms.key);
      })
    ] })
  ] }) });
}
const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;
const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;

out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v){
  const vec4 C = vec4(
      0.211324865405187, 0.366025403784439,
      -0.577350269189626, 0.024390243902439
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);

  vec3 p = permute(
      permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
      0.5 - vec3(
          dot(x0, x0),
          dot(x12.xy, x12.xy),
          dot(x12.zw, x12.zw)
      ),
      0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);

  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

struct ColorStop {
  vec3 color;
  float position;
};

#define COLOR_RAMP(colors, factor, finalColor) {                int index = 0;                                              for (int i = 0; i < 2; i++) {                                    ColorStop currentColor = colors[i];                         bool isInBetween = currentColor.position <= factor;         index = int(mix(float(index), float(i), float(isInBetween)));   }                                                           ColorStop currentColor = colors[index];                     ColorStop nextColor = colors[index + 1];                    float range = nextColor.position - currentColor.position;   float lerpFactor = (factor - currentColor.position) / range;   finalColor = mix(currentColor.color, nextColor.color, lerpFactor); }

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;

  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);

  vec3 rampColor;
  COLOR_RAMP(colors, uv.x, rampColor);

  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height = exp(height);
  height = (uv.y * 2.0 - height + 0.2);
  float intensity = 0.6 * height;

  float midPoint = 0.20;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);

  vec3 auroraColor = intensity * rampColor;

  fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
}
`;
function Aurora({
  colorStops = ["#5227FF", "#7cff67", "#5227FF"],
  amplitude = 1,
  blend = 0.5,
  time,
  speed = 1
}) {
  const propsRef = useRef({ colorStops, amplitude, blend, time, speed });
  propsRef.current = { colorStops, amplitude, blend, time, speed };
  const ctnDom = useRef(null);
  useEffect(() => {
    var _a, _b;
    const ctn = ctnDom.current;
    if (!ctn) return;
    const prefersReducedMotion = (_b = (_a = window.matchMedia) == null ? void 0 : _a.call(
      window,
      "(prefers-reduced-motion: reduce)"
    )) == null ? void 0 : _b.matches;
    if (prefersReducedMotion) return;
    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: true,
      antialias: true
    });
    renderer.dpr = Math.min(2, window.devicePixelRatio || 1);
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.canvas.style.backgroundColor = "transparent";
    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) delete geometry.attributes.uv;
    const toStops = (stops) => stops.slice(0, 3).map((hex) => {
      const c = new Color(hex);
      return [c.r, c.g, c.b];
    });
    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: amplitude },
        uColorStops: { value: toStops(colorStops) },
        uResolution: { value: [1, 1] },
        uBlend: { value: blend }
      }
    });
    const mesh = new Mesh(gl, { geometry, program });
    ctn.replaceChildren(gl.canvas);
    const resize = () => {
      if (!ctn) return;
      const width = ctn.offsetWidth || 1;
      const height = ctn.offsetHeight || 1;
      renderer.setSize(width, height);
      program.uniforms.uResolution.value = [width, height];
    };
    window.addEventListener("resize", resize);
    resize();
    let raf = 0;
    const update = (t) => {
      raf = requestAnimationFrame(update);
      const p = propsRef.current;
      const effectiveTime = (p.time ?? t * 0.01) * (p.speed ?? 1) * 0.1;
      program.uniforms.uTime.value = effectiveTime;
      program.uniforms.uAmplitude.value = p.amplitude ?? 1;
      program.uniforms.uBlend.value = p.blend ?? 0.5;
      program.uniforms.uColorStops.value = toStops(p.colorStops ?? colorStops);
      renderer.render({ scene: mesh });
    };
    raf = requestAnimationFrame(update);
    return () => {
      var _a2;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      if (ctn && gl.canvas.parentNode === ctn) ctn.removeChild(gl.canvas);
      (_a2 = gl.getExtension("WEBGL_lose_context")) == null ? void 0 : _a2.loseContext();
    };
  }, []);
  return /* @__PURE__ */ jsx("div", { ref: ctnDom, className: "aurora-container" });
}
function CountUp({
  to,
  from = 0,
  direction = "up",
  delay = 0,
  duration = 1.2,
  className = "",
  startCounting = true,
  startWhen,
  separator = "",
  onStart,
  onEnd
}) {
  const ref = useRef(null);
  const frameRef = useRef(null);
  const delayRef = useRef(null);
  const startValue = direction === "down" ? to : from;
  const endValue = direction === "down" ? from : to;
  const safeDuration = Math.max(0.2, duration);
  const isInView = useInView(ref, { once: false, margin: "0px" });
  const shouldStart = startWhen ?? startCounting;
  const getDecimalPlaces = (num) => {
    const str = String(num);
    if (!str.includes(".")) return 0;
    const decimals = str.split(".")[1];
    return Number(decimals) !== 0 ? decimals.length : 0;
  };
  const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));
  const minValue = Math.min(from, to);
  const maxValue = Math.max(from, to);
  const formatValue = useCallback(
    (latest) => {
      const clamped = Math.min(Math.max(latest, minValue), maxValue);
      const fixed = maxDecimals > 0 ? Number(clamped.toFixed(maxDecimals)) : Math.round(clamped);
      const formatted = Intl.NumberFormat("en-US", {
        useGrouping: !!separator,
        minimumFractionDigits: maxDecimals > 0 ? maxDecimals : 0,
        maximumFractionDigits: maxDecimals > 0 ? maxDecimals : 0
      }).format(fixed);
      return separator ? formatted.replace(/,/g, separator) : formatted;
    },
    [maxDecimals, maxValue, minValue, separator]
  );
  useEffect(() => {
    if (!ref.current) return;
    ref.current.textContent = formatValue(startValue);
  }, [formatValue, startValue]);
  useEffect(() => {
    if (delayRef.current) clearTimeout(delayRef.current);
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    if (!shouldStart) return;
    if (!isInView) {
      if (ref.current) ref.current.textContent = formatValue(startValue);
      return;
    }
    if (typeof onStart === "function") onStart();
    if (ref.current) ref.current.textContent = formatValue(startValue);
    const animateFromTo = () => {
      const startedAt = performance.now();
      const delta = endValue - startValue;
      const tick = (now) => {
        const progress = Math.min((now - startedAt) / (safeDuration * 1e3), 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = startValue + delta * eased;
        if (ref.current) ref.current.textContent = formatValue(value);
        if (progress < 1) {
          frameRef.current = requestAnimationFrame(tick);
        } else {
          if (ref.current) ref.current.textContent = formatValue(endValue);
          if (typeof onEnd === "function") onEnd();
          frameRef.current = null;
        }
      };
      frameRef.current = requestAnimationFrame(tick);
    };
    delayRef.current = setTimeout(animateFromTo, delay * 1e3);
    return () => {
      if (delayRef.current) clearTimeout(delayRef.current);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [
    delay,
    endValue,
    formatValue,
    isInView,
    onEnd,
    onStart,
    safeDuration,
    shouldStart,
    startValue
  ]);
  return /* @__PURE__ */ jsx("span", { className, ref });
}
function MenuOverlay({
  isOpen,
  onClose,
  links,
  language,
  onLanguageChange,
  uiCopy: uiCopy2,
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
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: overlayRef,
      className: "menu-overlay",
      style: {
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(5, 5, 5, 0.95)",
        backdropFilter: "blur(10px)",
        zIndex: 200,
        // Higher than header
        opacity: 0,
        visibility: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem"
      },
      children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: onClose,
            style: {
              position: "absolute",
              top: "1.5rem",
              right: "1.5rem",
              background: "transparent",
              border: "none",
              color: "#fff",
              fontSize: "2rem",
              cursor: "pointer"
            },
            children: "×"
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            ref: contentRef,
            className: "menu-content",
            style: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2rem",
              width: "100%"
            },
            children: [
              /* @__PURE__ */ jsx("a", { href: "#top", onClick: (e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
                onClose();
              }, style: linkStyle, children: uiCopy2.nav.home[language] }),
              /* @__PURE__ */ jsx("a", { href: "#services", onClick: (e) => {
                e.preventDefault();
                onNavigateServices == null ? void 0 : onNavigateServices();
              }, style: linkStyle, children: uiCopy2.nav.services[language] }),
              /* @__PURE__ */ jsx("a", { href: "#pricing", onClick: (e) => {
                e.preventDefault();
                onNavigatePricing == null ? void 0 : onNavigatePricing();
              }, style: linkStyle, children: uiCopy2.nav.pricing[language] }),
              /* @__PURE__ */ jsx("a", { href: "#pricing", onClick: (e) => {
                e.preventDefault();
                onNavigateMembership == null ? void 0 : onNavigateMembership();
              }, style: linkStyle, children: uiCopy2.nav.membership[language] }),
              /* @__PURE__ */ jsx("a", { href: "#why", onClick: onClose, style: linkStyle, children: uiCopy2.nav.aboutUs[language] }),
              showPortfolio ? /* @__PURE__ */ jsx("a", { href: "#portfolio", onClick: (e) => {
                e.preventDefault();
                onNavigatePortfolio == null ? void 0 : onNavigatePortfolio();
              }, style: linkStyle, children: uiCopy2.nav.portfolio[language] }) : null,
              /* @__PURE__ */ jsx("a", { href: "#trust", onClick: onClose, style: linkStyle, children: uiCopy2.nav.partners[language] }),
              /* @__PURE__ */ jsx("a", { href: "#contact", onClick: onClose, style: linkStyle, children: uiCopy2.nav.contact[language] }),
              /* @__PURE__ */ jsx("div", { style: { width: "100%", height: "1px", background: "rgba(255,255,255,0.1)", margin: "1rem 0" } }),
              /* @__PURE__ */ jsx("div", { className: "lang-switch-mobile", style: { display: "flex", gap: "1rem" }, children: ["EN", "RU", "AR"].map((lang) => /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => onLanguageChange(lang),
                  style: {
                    background: language === lang ? "white" : "transparent",
                    color: language === lang ? "black" : "white",
                    border: "1px solid rgba(255,255,255,0.3)",
                    padding: "0.5rem 1rem",
                    borderRadius: "999px",
                    fontSize: "1rem",
                    cursor: "pointer",
                    transition: "all 0.3s ease"
                  },
                  children: lang === "AR" ? "عربي" : lang
                },
                lang
              )) }),
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "https://wa.me/971543720101",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  onClick: onClose,
                  className: "btn btn-primary",
                  style: {
                    marginTop: "1rem",
                    width: "100%",
                    textAlign: "center",
                    maxWidth: "300px"
                  },
                  children: uiCopy2.nav.bookNow[language]
                }
              )
            ]
          }
        )
      ]
    }
  );
}
const linkStyle = {
  fontSize: "1.5rem",
  color: "#fff",
  textDecoration: "none",
  fontWeight: "500"
};
function MenuButton({ onClick, isOpen }) {
  return /* @__PURE__ */ jsxs(
    "button",
    {
      onClick,
      className: "menu-button",
      "aria-label": "Menu",
      style: {
        background: "transparent",
        border: "none",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        padding: "0.5rem",
        zIndex: 201
        // Above overlay if needed, though usually overlay has close button
      },
      children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            style: {
              display: "block",
              width: "24px",
              height: "2px",
              background: "white",
              transition: "transform 0.3s ease",
              transform: isOpen ? "rotate(45deg) translate(6px, 6px)" : "none"
            }
          }
        ),
        /* @__PURE__ */ jsx(
          "span",
          {
            style: {
              display: "block",
              width: "24px",
              height: "2px",
              background: "white",
              opacity: isOpen ? 0 : 1,
              transition: "opacity 0.3s ease"
            }
          }
        ),
        /* @__PURE__ */ jsx(
          "span",
          {
            style: {
              display: "block",
              width: "24px",
              height: "2px",
              background: "white",
              transition: "transform 0.3s ease",
              transform: isOpen ? "rotate(-45deg) translate(5px, -5px)" : "none"
            }
          }
        )
      ]
    }
  );
}
const ADMIN_API_BASE = "".replace(/\/$/, "");
const ADMIN_CONTENT_PATH = "/api/admin-content";
function buildAdminContentUrl(path = "") {
  return `${ADMIN_API_BASE}${ADMIN_CONTENT_PATH}${path}`;
}
async function parseJsonResponse(response) {
  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error((payload == null ? void 0 : payload.error) || `Admin content API error (${response.status})`);
  }
  return payload;
}
async function fetchAdminContent({ signal } = {}) {
  const response = await fetch(buildAdminContentUrl(), {
    cache: "no-store",
    signal
  });
  const payload = await parseJsonResponse(response);
  return (payload == null ? void 0 : payload.content) || {};
}
gsap.registerPlugin(ScrollTrigger);
const BeholdFallback = ({
  message = "Instagram feed will appear here after you add your Behold feedId"
}) => /* @__PURE__ */ jsx("div", { className: "widget-fallback", children: message });
const ReviewsFallback = ({
  message = "Google reviews widget will appear here after you add your Featurable ID"
}) => /* @__PURE__ */ jsx("div", { className: "widget-fallback", children: message });
const BeholdWidget = lazy(
  () => import("@behold/react").then((mod) => ({
    default: mod.default || mod.BeholdWidget || BeholdFallback
  })).catch(() => ({ default: BeholdFallback }))
);
const ReactGoogleReviews = lazy(
  () => import("react-google-reviews").then((mod) => ({
    default: mod.ReactGoogleReviews || mod.GoogleReviews || mod.default || ReviewsFallback
  })).catch(() => ({ default: ReviewsFallback }))
);
const ALTEGIO_WIDGET_SCRIPT = "https://w1414364.alteg.io/widgetJS";
const ALTEGIO_BOOKING_URL = "https://b1414364.alteg.io/";
const services = [
  {
    id: "auto",
    title: { EN: "Auto detailing", RU: "Автодетейлинг", AR: "تفاصيل السيارات" },
    mobileTitle: { EN: "Auto", RU: "Авто", AR: "السيارات" },
    state: "active",
    icon: "car"
  },
  {
    id: "moto",
    title: { EN: "Motorcycle detailing", RU: "Мотодетейлинг", AR: "تفاصيل الدراجات النارية" },
    mobileTitle: { EN: "Motorcycle", RU: "Мото", AR: "الدراجات" },
    state: "active",
    icon: "moto"
  },
  {
    id: "motorhome",
    title: { EN: "Motorhome detailing", RU: "Детейлинг автодомов", AR: "تفاصيل سيارات التخييم" },
    mobileTitle: { EN: "Motorhome", RU: "Автодом", AR: "سيارات التخييم" },
    state: "active",
    icon: "motorhome"
  },
  {
    id: "yacht",
    title: { EN: "Yacht detailing", RU: "Яхт детейлинг", AR: "تفاصيل اليخوت" },
    mobileTitle: { EN: "Yacht", RU: "Яхты", AR: "اليخوت" },
    state: "soon",
    icon: "yacht"
  },
  {
    id: "home",
    title: { EN: "Home & Office detailing", RU: "Детейлинг дома и офиса", AR: "تفصيل المنزل والمكتب" },
    mobileTitle: { EN: "Home & Office", RU: "Дом и офис", AR: "المنزل والمكتب" },
    state: "soon",
    icon: "home"
  },
  {
    id: "secret",
    title: { EN: "Secret", RU: "Секрет", AR: "سري" },
    mobileTitle: { EN: "Secret", RU: "Секрет", AR: "سري" },
    state: "secret",
    icon: "secret"
  }
];
const processSteps = [
  {
    id: "improvement",
    number: "01",
    title: {
      EN: "Continuous improvement",
      RU: "Непрерывное совершенствование",
      AR: "تحسين مستمر"
    },
    text: {
      EN: "We constantly refine our techniques and processes",
      RU: "Мы постоянно совершенствуем наши техники и процессы",
      AR: "نحن نعمل باستمرار على تطوير تقنياتنا وعملياتنا"
    },
    image: "/1.webp?v=2"
  },
  {
    id: "quality",
    number: "02",
    title: {
      EN: "Quality control",
      RU: "Контроль качества",
      AR: "مراقبة الجودة"
    },
    text: {
      EN: "Every job is inspected to meet our exacting standards",
      RU: "Каждая работа проходит проверку по нашим строгим стандартам",
      AR: "كل عمل يخضع للفحص وفقًا لمعاييرنا الصارمة"
    },
    image: "/2.webp?v=2"
  },
  {
    id: "materials",
    number: "03",
    title: {
      EN: "Premium materials",
      RU: "Премиальные материалы",
      AR: "مواد فاخرة"
    },
    text: {
      EN: "Only certified, top-tier products and equipment",
      RU: "Только сертифицированные продукты и оборудование высшего класса",
      AR: "فقط المنتجات والمعدات المعتمدة من الدرجة الأولى"
    },
    image: "/3.webp?v=2"
  },
  {
    id: "service",
    number: "04",
    title: {
      EN: "Silent mobile service",
      RU: "Тихий мобильный сервис",
      AR: "خدمة متنقلة هادئة"
    },
    text: {
      EN: "Discreet, professional service right at your doorstep",
      RU: "Деликатный, профессиональный сервис прямо у вашего порога",
      AR: "خدمة احترافية هادئة مباشرة عند بابك"
    },
    image: "/4.webp?v=2"
  }
];
const packages = [
  {
    id: "silver",
    name: { EN: "Silver", RU: "Серебро", AR: "الفضي" },
    note: {
      EN: "Essential clean with wax + leather care",
      RU: "Базовая чистка + воск и уход за кожей",
      AR: "تنظيف أساسي مع شمع وعناية بالجلد"
    },
    featured: false,
    price: { amount: 699, currency: "AED" },
    highlights: {
      EN: [
        "Two-stage wash + wax",
        "Wheels & rims",
        "Interior Tornador + vacuum",
        "Leather cleaned + protected"
      ],
      RU: [
        "Двухфазная мойка + воск",
        "Диски и колёса",
        "Салон: Tornador + пылесос",
        "Кожа: чистка и защита"
      ],
      AR: [
        "غسيل ثنائي + شمع",
        "الجنوط والعجلات",
        "الداخلية: Tornador + مكنسة",
        "تنظيف الجلد وحمايته"
      ]
    },
    includes: {
      EN: [
        "Two-stage wash + wax sealant",
        "Wheels & rims cleaned",
        "Interior refresh (Tornador + vacuum)",
        "Seats, upholstery & mats cleaned",
        "Leather cleaned + protected"
      ],
      RU: [
        "Двухфазная мойка + воск",
        "Чистка дисков и колёс",
        "Чистка салона (Tornador + пылесос)",
        "Сиденья, обивка и коврики: чистка",
        "Кожа: чистка и защита"
      ],
      AR: [
        "غسيل ثنائي المراحل مع شمع حماية",
        "تنظيف الجنوط والعجلات",
        "تنظيف داخلي (Tornador + مكنسة)",
        "تنظيف المقاعد والتنجيد والحصائر",
        "تنظيف الجلد وحمايته"
      ]
    }
  },
  {
    id: "gold",
    name: { EN: "Gold", RU: "Золото", AR: "الذهبي" },
    note: {
      EN: "Deep detail + correction and UV protection",
      RU: "Глубокий детейлинг + полировка и UV-защита",
      AR: "تنظيف عميق مع تلميع وحماية من UV"
    },
    featured: true,
    price: { amount: 1099, currency: "AED" },
    highlights: {
      EN: [
        "Deep interior + mats detail",
        "Wheels deep clean",
        "Scratch-refinement polish",
        "UV protection + water-spot removal"
      ],
      RU: [
        "Глубокая чистка салона и ковриков",
        "Глубокая чистка колёс",
        "Полировка от мелких царапин",
        "UV-защита + удаление водных пятен"
      ],
      AR: [
        "تنظيف داخلي عميق مع الحصائر",
        "تنظيف عميق للعجلات",
        "تلميع للخدوش السطحية",
        "حماية UV مع إزالة بقع الماء"
      ]
    },
    includes: {
      EN: [
        "Two-stage wash",
        "Deep wheels & rims detail",
        "Deep interior + mats detail",
        "Leather deep clean + UV shield",
        "Scratch-refinement polish",
        "Water-spot removal",
        "High-gloss wax sealant",
        "Interior plastics cleaned + UV protection",
        "Final quality inspection"
      ],
      RU: [
        "Двухфазная мойка",
        "Глубокая чистка дисков и колёс",
        "Глубокая чистка салона и ковриков",
        "Кожа: глубокая чистка + UV-защита",
        "Полировка от мелких царапин",
        "Удаление водных пятен и известкового налёта",
        "Воск: глубокий блеск и защита",
        "Пластик в салоне: чистка + UV-защита",
        "Финальный контроль качества"
      ],
      AR: [
        "غسيل ثنائي المراحل",
        "تنظيف عميق للجنوط والعجلات",
        "تنظيف داخلي عميق مع الحصائر",
        "تنظيف عميق للجلد مع حماية من UV",
        "تلميع لإزالة خدوش سطحية",
        "إزالة بقع الماء وآثار الكلس",
        "شمع لمعان عميق وحماية للطلاء",
        "تنظيف بلاستيك المقصورة مع حماية من UV",
        "فحص نهائي وضمان الجودة"
      ]
    }
  },
  {
    id: "platinum",
    name: { EN: "Platinum", RU: "Платина", AR: "البلاتيني" },
    note: {
      EN: "Full correction + ceramic coating",
      RU: "Полная полировка + керамика",
      AR: "تصحيح كامل مع طلاء سيراميك"
    },
    featured: false,
    price: { amount: 1299, currency: "AED" },
    highlights: {
      EN: [
        "Everything in Gold",
        "Tar + brake-dust removal",
        "Full-body machine polish",
        "Ceramic coating"
      ],
      RU: [
        "Всё из пакета «Золото»",
        "Удаление битума и тормозной пыли",
        "Полировка кузова",
        "Керамическое покрытие"
      ],
      AR: [
        "كل ما في الباقة الذهبية",
        "إزالة القطران وغبار الفرامل",
        "تلميع كامل للهيكل",
        "طلاء سيراميك"
      ]
    },
    includes: {
      EN: [
        "Everything in Gold",
        "Hand decontamination wash",
        "Tar & brake-dust removal",
        "Full-body machine polish",
        "Ceramic coating application",
        "Final quality inspection"
      ],
      RU: [
        "Всё из пакета «Золото»",
        "Глубокая ручная чистка кузова",
        "Удаление битума и налёта тормозной пыли",
        "Полировка кузова",
        "Нанесение керамики",
        "Финальный контроль качества"
      ],
      AR: [
        "كل ما في الباقة الذهبية",
        "تنظيف يدوي عميق للهيكل",
        "إزالة القطران وبقايا غبار الفرامل",
        "تلميع كامل للهيكل",
        "تطبيق طلاء سيراميك",
        "فحص نهائي وضمان الجودة"
      ]
    }
  }
];
const pricingCopy = {
  labels: {
    highlights: { EN: "Highlights", RU: "Ключевое", AR: "الأبرز" },
    fullChecklist: { EN: "Full checklist", RU: "Полный список", AR: "القائمة الكاملة" }
  }
};
const portfolioData = {
  Sedan: {
    Exterior: {
      before: "https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=1400&auto=format&fit=crop",
      after: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1400&auto=format&fit=crop"
    },
    Interior: {
      before: "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1400&auto=format&fit=crop",
      after: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?q=80&w=1400&auto=format&fit=crop"
    },
    Wheels: {
      before: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1400&auto=format&fit=crop",
      after: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1400&auto=format&fit=crop"
    }
  },
  SUV: {
    Exterior: {
      before: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1400&auto=format&fit=crop",
      after: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1400&auto=format&fit=crop"
    },
    Interior: {
      before: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1400&auto=format&fit=crop",
      after: "https://images.unsplash.com/photo-1563720300180-c4d62137ebca?q=80&w=1400&auto=format&fit=crop"
    },
    Wheels: {
      before: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1400&auto=format&fit=crop",
      after: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1400&auto=format&fit=crop"
    }
  },
  Supercar: {
    Exterior: {
      before: "https://images.unsplash.com/photo-1544605935-a54194ef4a11?q=80&w=1400&auto=format&fit=crop",
      after: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1400&auto=format&fit=crop"
    },
    Interior: {
      before: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1400&auto=format&fit=crop",
      after: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1400&auto=format&fit=crop"
    },
    Wheels: {
      before: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1400&auto=format&fit=crop",
      after: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1400&auto=format&fit=crop"
    }
  }
};
const DEFAULT_PORTFOLIO_META = {
  title: "BMW M8 2023",
  description: "Premium full-body detailing & protection"
};
function normalizePortfolioConfig(rawPortfolio) {
  if (rawPortfolio && typeof rawPortfolio === "object" && !Array.isArray(rawPortfolio)) {
    return {
      visible: rawPortfolio.visible !== false,
      items: Array.isArray(rawPortfolio.items) ? rawPortfolio.items : []
    };
  }
  if (Array.isArray(rawPortfolio)) {
    return { visible: true, items: rawPortfolio };
  }
  return { visible: true, items: null };
}
function buildPortfolioItems(adminPortfolioItems) {
  if (Array.isArray(adminPortfolioItems)) {
    return adminPortfolioItems.map((item, index) => {
      const legacyParts = item.parts && typeof item.parts === "object" ? Object.values(item.parts) : [];
      const firstLegacyPart = legacyParts[0] || {};
      return {
        id: item.id || `portfolio-${index + 1}`,
        category: item.category || `Tab ${index + 1}`,
        before: item.before || item.firstImage || firstLegacyPart.before || "",
        after: item.after || item.secondImage || firstLegacyPart.after || "",
        title: item.title || item.modelTitle || DEFAULT_PORTFOLIO_META.title,
        description: item.description || item.modelDescription || item.subtitle || DEFAULT_PORTFOLIO_META.description
      };
    }).filter((item) => item.category);
  }
  return Object.entries(portfolioData).map(([category, parts], index) => {
    var _a, _b;
    return {
      id: `${category}-${index + 1}`,
      category,
      before: ((_a = parts == null ? void 0 : parts.Exterior) == null ? void 0 : _a.before) || "",
      after: ((_b = parts == null ? void 0 : parts.Exterior) == null ? void 0 : _b.after) || "",
      title: DEFAULT_PORTFOLIO_META.title,
      description: DEFAULT_PORTFOLIO_META.description
    };
  });
}
const membershipPlans = [
  {
    id: "auto",
    icon: "car",
    title: { EN: "Membership for Auto", RU: "Членство — Авто", AR: "عضوية السيارات" },
    price: { amount: 3990, currency: "AED" },
    perks: {
      EN: ["scheduled services", "weeks of flawless condition", "Priority booking", "Personal detailing manager"],
      RU: ["10 запланированных услуг", "20 Недель безупречного состояния", "Приоритетная запись", "Персональный менеджер"],
      AR: ["خدمات مجدولة", "20 أسبوعًا من الحالة المثالية", "أولوية الحجز", "مدير تفصيل شخصي"]
    }
  },
  {
    id: "moto",
    icon: "moto",
    title: { EN: "Membership for Motorcycle", RU: "Членство — Мотоцикл", AR: "عضوية الدراجات" },
    price: { amount: 2990, currency: "AED" },
    perks: {
      EN: ["scheduled services", "weeks of flawless condition", "Priority booking", "Personal detailing manager"],
      RU: ["запланированных услуг", "недель безупречного состояния", "Приоритетная запись", "Персональный менеджер"],
      AR: ["خدمات مجدولة", "أسبوعًا من الحالة المثالية", "أولوية الحجز", "مدير تفصيل شخصي"]
    }
  }
];
const membershipPackages = {
  title: {
    EN: "Membership packages",
    RU: "Membership packages",
    AR: "باقات العضوية"
  },
  subtitle: {
    EN: "Flexible maintenance options for private clients",
    RU: "Гибкие maintenance-пакеты для частных клиентов",
    AR: "خيارات صيانة مرنة للعملاء الخاصين"
  },
  items: [
    {
      id: "pkg-4-silver",
      label: {
        EN: "4 Silver",
        RU: "4 Silver",
        AR: "4 Silver"
      },
      price: 2e3
    },
    {
      id: "pkg-10-refresh",
      label: {
        EN: "10 Refresh",
        RU: "10 Refresh",
        AR: "10 Refresh"
      },
      price: 2e3
    },
    {
      id: "pkg-1-silver-10-refresh",
      label: {
        EN: "1 Silver + 10 Refresh",
        RU: "1 Silver + 10 Refresh",
        AR: "1 Silver + 10 Refresh"
      },
      price: 2500
    },
    {
      id: "pkg-1-gold-10-refresh",
      label: {
        EN: "1 Gold + 10 Refresh",
        RU: "1 Gold + 10 Refresh",
        AR: "1 Gold + 10 Refresh"
      },
      price: 2900
    },
    {
      id: "pkg-2-silver-20-refresh",
      label: {
        EN: "2 Silver + 20 Refresh",
        RU: "2 Silver + 20 Refresh",
        AR: "2 Silver + 20 Refresh"
      },
      price: 4500
    },
    {
      id: "pkg-2-gold-20-refresh",
      label: {
        EN: "2 Gold + 20 Refresh",
        RU: "2 Gold + 20 Refresh",
        AR: "2 Gold + 20 Refresh"
      },
      price: 5200
    }
  ]
};
const membershipCopy = {
  kicker: { EN: "Membership", RU: "Членство", AR: "العضوية" },
  headline: {
    EN: "Perfection is not achieved once.",
    RU: "Совершенство не достигается единожды.",
    AR: "الكمال لا يُحقَّق مرة واحدة."
  },
  headlineAccent: {
    EN: "It is maintained.",
    RU: "Его поддерживают.",
    AR: "بل يُصان باستمرار."
  },
  body: {
    EN: "After your Silver, Gold or Platinum detailing, you can be invited to become a member of Kaizen Detailers private maintenance program — designed for those who refuse to compromise on standards.",
    RU: "После вашего Silver, Gold или Platinum детейлинга вы можете получить приглашение в частную программу обслуживания Kaizen Detailers — для тех, кто не идёт на компромисс с качеством.",
    AR: "بعد خدمة Silver أو Gold أو Platinum، يمكنك الانضمام إلى برنامج الصيانة الخاص بـ Kaizen Detailers — المصمم لمن يرفضون التنازل عن المعايير."
  },
  schedule: {
    EN: "Every two weeks, we carefully restore, protect and refine your vehicle.",
    RU: "Каждые две недели мы бережно восстанавливаем, защищаем и совершенствуем ваш автомобиль.",
    AR: "كل أسبوعين، نقوم بعناية باستعادة وحماية وتحسين سيارتك."
  },
  stats: {
    services: { EN: "scheduled services", RU: "запланированных услуг", AR: "خدمات مجدولة" },
    weeks: { EN: "weeks of flawless condition", RU: "недель безупречного состояния", AR: "أسبوعًا من الحالة المثالية" }
  }
};
const SUPPORTED_LANGUAGES = ["EN", "RU", "AR"];
function normalizeLocalizedText(value, fallback = {}) {
  return SUPPORTED_LANGUAGES.reduce((result, lang) => {
    result[lang] = (value == null ? void 0 : value[lang]) ?? (fallback == null ? void 0 : fallback[lang]) ?? (fallback == null ? void 0 : fallback.EN) ?? "";
    return result;
  }, {});
}
function normalizeLocalizedList(value, fallback = {}) {
  return SUPPORTED_LANGUAGES.reduce((result, lang) => {
    const list = (value == null ? void 0 : value[lang]) || (fallback == null ? void 0 : fallback[lang]) || (fallback == null ? void 0 : fallback.EN) || [];
    result[lang] = Array.isArray(list) ? list : [];
    return result;
  }, {});
}
function normalizeMembershipPlan(plan, fallback = {}) {
  var _a, _b, _c, _d;
  return {
    id: (plan == null ? void 0 : plan.id) || fallback.id || `membership-plan-${Date.now()}`,
    icon: (plan == null ? void 0 : plan.icon) || fallback.icon || "car",
    title: normalizeLocalizedText(plan == null ? void 0 : plan.title, fallback.title),
    price: {
      amount: Number.isFinite(Number((_a = plan == null ? void 0 : plan.price) == null ? void 0 : _a.amount)) ? Number(plan.price.amount) : Number(((_b = fallback.price) == null ? void 0 : _b.amount) || 0),
      currency: ((_c = plan == null ? void 0 : plan.price) == null ? void 0 : _c.currency) || ((_d = fallback.price) == null ? void 0 : _d.currency) || "AED"
    },
    perks: normalizeLocalizedList(plan == null ? void 0 : plan.perks, fallback.perks)
  };
}
function normalizeMembershipPackageItem(item, fallback = {}) {
  return {
    id: (item == null ? void 0 : item.id) || fallback.id || `membership-package-${Date.now()}`,
    label: normalizeLocalizedText(item == null ? void 0 : item.label, fallback.label),
    price: Number.isFinite(Number(item == null ? void 0 : item.price)) ? Number(item.price) : Number(fallback.price || 0)
  };
}
function normalizeMembershipData(rawValue) {
  const plansSource = Array.isArray(rawValue == null ? void 0 : rawValue.plans) ? rawValue.plans : membershipPlans;
  const packageSource = (rawValue == null ? void 0 : rawValue.packages) && typeof rawValue.packages === "object" ? rawValue.packages : membershipPackages;
  return {
    plans: plansSource.map(
      (plan, index) => normalizeMembershipPlan(plan, membershipPlans[index] || membershipPlans[0])
    ),
    packages: {
      title: normalizeLocalizedText(packageSource.title, membershipPackages.title),
      subtitle: normalizeLocalizedText(packageSource.subtitle, membershipPackages.subtitle),
      items: (Array.isArray(packageSource.items) ? packageSource.items : membershipPackages.items).map(
        (item, index) => normalizeMembershipPackageItem(item, membershipPackages.items[index])
      )
    }
  };
}
const normalizeFeaturableId = (value = "") => value.trim().replace(/^featurable-/i, "");
const DEFAULT_FEATURABLE_WIDGET_ID = "b1506bd1-b1ca-442e-b4b1-95314643ba77";
const DEFAULT_GOOGLE_REVIEWS_URL = "https://maps.google.com/?q=Kaizen+Detailers+-+Madinat+Hind+4+-+Damac+Hills+-+Dubai&ftid=0xa84886aa5ca2212b:0xff2b4b14c6b47169";
const googleReviewsProfileUrl = DEFAULT_GOOGLE_REVIEWS_URL;
const featurableWidgetId = normalizeFeaturableId(
  DEFAULT_FEATURABLE_WIDGET_ID
);
const certifiedBrands = [
  { name: "Koch Chemie", logo: "/koch.png" },
  { name: "Gyeon", logo: "/gyeon.png" },
  { name: "Sonax", logo: "/sonax.webp" },
  { name: "Vonixx", logo: "/vonixx.webp" }
];
const trustLinks = {
  googleReviews: googleReviewsProfileUrl,
  instagram: "https://www.instagram.com/kaizen_detailers_uae"
};
const coverageCopy = {
  titleLine1: {
    EN: "Your location —",
    RU: "Ваша локация —",
    AR: "— موقعك"
  },
  titleLine2: {
    EN: "Our standards",
    RU: "Наши стандарты",
    AR: "معاييرنا"
  },
  subtitle: {
    EN: "Elite car detailing at your doorstep",
    RU: "Элитный детейлинг авто у вашего порога",
    AR: "ديتيلنج سيارات فاخر عند باب منزلك"
  }
};
const reviewsFallbackCopy = {
  EN: "Google Reviews will appear here once the business profile is fully activated.",
  RU: "Google Reviews появятся здесь после полной активации бизнес-профиля.",
  AR: "ستظهر مراجعات Google هنا بعد تفعيل الملف التجاري بالكامل."
};
const DEFAULT_HERO_VIDEO = "/KaizenCarDetailing.mp4";
const BACKUP_HERO_VIDEO = "/videoplayback.mp4";
const LEGACY_HERO_VIDEO = "/dubai.mp4";
const CRITICAL_SERVICE_ASSETS = [
  "/rolls1.webp",
  "/rolls2.webp",
  "/moto.webp",
  "/concord.webp",
  "/yacht.webp",
  "/home.webp",
  "/questionmark.webp"
];
function normalizeHeroVideoUrl(url) {
  if (typeof url !== "string") return "";
  const trimmed = url.trim();
  if (!trimmed || trimmed.startsWith("blob:")) return "";
  return trimmed;
}
function buildHeroVideoFallbackChain(adminUrl) {
  const preferred = normalizeHeroVideoUrl(adminUrl);
  return Array.from(
    new Set([DEFAULT_HERO_VIDEO, preferred, BACKUP_HERO_VIDEO, LEGACY_HERO_VIDEO].filter(Boolean))
  );
}
const uiCopy = {
  nav: {
    home: { EN: "Home", RU: "Главная", AR: "الرئيسية" },
    services: { EN: "Services", RU: "Услуги", AR: "الخدمات" },
    pricing: { EN: "Pricing", RU: "Пакеты", AR: "الأسعار" },
    membership: { EN: "Membership", RU: "Членство", AR: "العضوية" },
    aboutUs: { EN: "About us", RU: "О нас", AR: "من نحن" },
    portfolio: { EN: "Portfolio", RU: "Портфолио", AR: "أعمالنا" },
    partners: { EN: "Partners", RU: "Партнёры", AR: "الشركاء" },
    contact: { EN: "Contact us", RU: "Контакты", AR: "التواصل" },
    bookNow: { EN: "Book now", RU: "Записаться", AR: "احجز الآن" }
  },
  hero: {
    headlineLines: {
      EN: ["Elite car", "detailing at", "your doorstep"],
      RU: ["Элитный детейлинг", "авто у вашего", "порога"],
      AR: ["ديتيلنج سيارات", "فاخر عند", "باب منزلك"]
    },
    title: {
      EN: "Right to your doorstep",
      RU: "Прямо к вашему порогу",
      AR: "حتى باب منزلك"
    },
    ctaQuickBook: { EN: "Book in 1 click", RU: "Записаться", AR: "احجز بنقرة واحدة" },
    ctaWhatsapp: { EN: "WhatsApp chat", RU: "WhatsApp чат", AR: "محادثة WhatsApp" }
  },
  lifestyleStrip: {
    EN: "Your car becomes perfect while you live your live",
    RU: "Ваш автомобиль становится идеальным, пока вы живете своей жизнью",
    AR: "تصبح سيارتك مثالية بينما تعيش حياتك"
  },
  sectionTitles: {
    services: { EN: "Services", RU: "Услуги", AR: "خدمات" },
    process: { EN: "Kaizen Detailers - Perfection in Every Detail", RU: "Kaizen Detailers - Совершенство в каждой детали", AR: "Kaizen Detailers — الكمال في كل تفصيلة" },
    portfolio: { EN: "Our Portfolio", RU: "Наше портфолио", AR: "أعمالنا" },
    portfolioSubtitle: {
      EN: "Real results you can feel",
      RU: "Результат, который видно и ощущается",
      AR: "نتائج حقيقية يمكنك ملاحظتها"
    },
    trust: {
      EN: "Defined by Standards",
      RU: "Определяется стандартами",
      AR: "محددة بالمعايير"
    },
    trustSubtitle: {
      EN: "We work with premium equipment and showcase real client feedback",
      RU: "Мы работаем на премиальном оборудовании и показываем реальные отзывы клиентов",
      AR: "نعمل بمعدات فاخرة ونشارك تقييمات العملاء الفعلية"
    }
  },
  trust: {
    googleReviews: { EN: "Google Reviews", RU: "Google Reviews", AR: "تقييمات Google" },
    instagram: { EN: "Instagram", RU: "Instagram", AR: "إنستغرام" },
    certifiedProducts: { EN: "Certified Products", RU: "Сертифицированные продукты", AR: "منتجات معتمدة" },
    openGoogle: { EN: "Open Google reviews", RU: "Открыть Google Reviews", AR: "فتح تقييمات Google" },
    openInstagram: { EN: "Open Instagram", RU: "Открыть Instagram", AR: "فتح Instagram" }
  },
  portfolio: {
    categories: {
      Sedan: { EN: "Sedan", RU: "Седан", AR: "سيدان" },
      SUV: { EN: "SUV", RU: "SUV", AR: "دفع رباعي" },
      Supercar: { EN: "Supercar", RU: "Суперкар", AR: "سوبركار" }
    },
    parts: {
      Exterior: { EN: "Exterior", RU: "Экстерьер", AR: "الخارج" },
      Interior: { EN: "Interior", RU: "Интерьер", AR: "الداخل" },
      Wheels: { EN: "Wheels", RU: "Диски", AR: "العجلات" }
    },
    dragHint: { EN: "Drag to compare", RU: "Потяните для сравнения", AR: "اسحب للمقارنة" },
    modelSubtitle: {
      EN: "Premium full-body detailing & protection",
      RU: "Премиальный полный детейлинг и защита кузова",
      AR: "تلميع وحماية فاخرة لكامل الهيكل"
    }
  },
  coverage: {
    markers: {
      abu: { EN: "Abu Dhabi", RU: "Абу-Даби", AR: "أبوظبي" },
      dubai: { EN: "Dubai", RU: "Дубай", AR: "دبي" },
      sharjah: { EN: "Sharjah", RU: "Шарджа", AR: "الشارقة" }
    }
  },
  footer: {
    text: {
      EN: "Premium mobile detailing in Dubai - precision, transparency, and quiet excellence",
      RU: "Премиальный мобильный детейлинг в Дубае - точность, прозрачность и спокойное качество",
      AR: "خدمة ديتيلنج متنقلة فاخرة في دبي - دقة، شفافية، ونتيجة راقية"
    },
    contact: { EN: "Contact", RU: "Контакты", AR: "التواصل" },
    social: { EN: "Social", RU: "Соцсети", AR: "المنصات" },
    legal: { EN: "Legal", RU: "Правовая информация", AR: "المعلومات القانونية" },
    legalInfo: {
      EN: "Legal information",
      RU: "Правовая информация",
      AR: "المعلومات القانونية"
    },
    legalTitle: {
      EN: "Legal information",
      RU: "Правовая информация",
      AR: "المعلومات القانونية"
    },
    legalBody: {
      EN: "This website is provided for informational purposes only. Service scope, availability, timelines, and pricing may be updated without prior notice. Final service terms are confirmed directly with Kaizen Detailers before work begins. All trademarks, brand names, and media belong to their respective owners.",
      RU: "Данный сайт носит исключительно информационный характер. Состав услуг, доступность, сроки и стоимость могут изменяться без предварительного уведомления. Окончательные условия оказания услуг согласовываются напрямую с Keizen Detailers до начала работ. Все товарные знаки, названия брендов и медиа-материалы принадлежат их правообладателям.",
      AR: "هذا الموقع لأغراض معلوماتية فقط. قد تتغير نطاقات الخدمات والتوفر والمواعيد والأسعار دون إشعار مسبق. يتم تأكيد الشروط النهائية للخدمة مباشرة مع Kaizen Detailers قبل بدء العمل. جميع العلامات التجارية والأسماء التجارية والمواد الإعلامية تعود إلى مالكيها."
    },
    whatsapp: { EN: "WhatsApp", RU: "WhatsApp", AR: "واتساب" },
    rights: {
      EN: "© KAIZEN DETAILERS PARKING CAR WASHING L.L.C. All rights reserved.",
      RU: "© KAIZEN DETAILERS PARKING CAR WASHING L.L.C. Все права защищены.",
      AR: "© KAIZEN DETAILERS PARKING CAR WASHING L.L.C. جميع الحقوق محفوظة."
    }
  },
  accessibility: {
    primaryNav: { EN: "Primary", RU: "Основная навигация", AR: "التنقل الرئيسي" },
    languageSwitcher: { EN: "Language", RU: "Язык", AR: "اللغة" },
    pricingAmount: { EN: "Price", RU: "Цена", AR: "السعر" },
    packageIncludes: { EN: "Package includes", RU: "Что входит в пакет", AR: "ما تتضمنه الباقة" },
    whatsapp: { EN: "WhatsApp", RU: "WhatsApp", AR: "واتساب" },
    brandMarquee: { EN: "Luxury brands", RU: "Премиальные бренды", AR: "العلامات الفاخرة" },
    closeDialog: { EN: "Close dialog", RU: "Закрыть окно", AR: "إغلاق النافذة" }
  },
  widget: {
    beholdLoading: {
      EN: "Loading Instagram feed...",
      RU: "Загрузка Instagram ленты...",
      AR: "جار تحميل موجز إنستغرام..."
    },
    reviewsLoading: {
      EN: "Loading Google reviews...",
      RU: "Загрузка Google Reviews...",
      AR: "جار تحميل تقييمات Google..."
    }
  },
  common: {
    soon: { EN: "SOON", RU: "СКОРО", AR: "قريبا" }
  }
};
const ADMIN_CONTENT_KEYS = ["heroVideo", "packages", "membership", "portfolio"];
function getInitialAdminContent() {
  return {
    heroVideo: null,
    packages: null,
    membership: null,
    portfolio: null
  };
}
function mergeAdminContent(previousContent, nextContent) {
  return ADMIN_CONTENT_KEYS.reduce((content, key) => {
    if (Object.prototype.hasOwnProperty.call(nextContent || {}, key) && nextContent[key] !== null && nextContent[key] !== void 0) {
      content[key] = nextContent[key];
    }
    return content;
  }, { ...previousContent });
}
function App() {
  var _a;
  const rootRef = useRef(null);
  const portfolioViewerRef = useRef(null);
  const portfolioMetaRef = useRef(null);
  const trustSectionRef = useRef(null);
  const [language, setLanguage] = useState("EN");
  const [adminContent, setAdminContent] = useState(getInitialAdminContent);
  const adminHeroVideo = adminContent.heroVideo;
  const adminPackages = adminContent.packages;
  const adminMembership = adminContent.membership;
  const adminPortfolio = adminContent.portfolio;
  const membershipConfig = normalizeMembershipData(adminMembership);
  const portfolioConfig = normalizePortfolioConfig(adminPortfolio);
  const portfolioVisible = portfolioConfig.visible !== false;
  const [heroVideoSrc, setHeroVideoSrc] = useState(DEFAULT_HERO_VIDEO);
  const heroVideoFallbackChainRef = useRef([DEFAULT_HERO_VIDEO, BACKUP_HERO_VIDEO, LEGACY_HERO_VIDEO]);
  const portfolioItems = buildPortfolioItems(portfolioConfig.items);
  const hasPortfolioContent = portfolioVisible && portfolioItems.length > 0;
  const getPackagesForService = (serviceId) => {
    if (!adminPackages) return packages;
    if (Array.isArray(adminPackages)) return adminPackages;
    return adminPackages[serviceId] || packages;
  };
  const [activePortfolioCategory, setActivePortfolioCategory] = useState(
    ((_a = portfolioItems[0]) == null ? void 0 : _a.category) || "Sedan"
  );
  const [isPortfolioHovered, setIsPortfolioHovered] = useState(false);
  const [hasPortfolioInteracted, setHasPortfolioInteracted] = useState(false);
  const [openPackageIds, setOpenPackageIds] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [isPerformanceLite, setIsPerformanceLite] = useState(false);
  const [shouldLoadTrustWidgets, setShouldLoadTrustWidgets] = useState(false);
  const whatsappPhone = "971543720101";
  const whatsappMessageByLanguage = {
    EN: "Hi Kaizen Detailers! I would like to book mobile detailing in Dubai. Please help me choose the right package and nearest available time.",
    RU: "Здравствуйте, Kaizen Detailers! Хочу записаться на мобильный детейлинг в Дубае. Помогите выбрать подходящий пакет и ближайшее свободное время.",
    AR: "مرحبا فريق كايزن ديتيلرز! أرغب بحجز خدمة التلميع المتنقل في دبي. الرجاء مساعدتي في اختيار الباقة المناسبة وأقرب موعد متاح."
  };
  useEffect(() => {
    const controller = new AbortController();
    fetchAdminContent({ signal: controller.signal }).then((content) => {
      setAdminContent((previousContent) => mergeAdminContent(previousContent, content));
    }).catch((error) => {
      if ((error == null ? void 0 : error.name) !== "AbortError") {
        console.warn("Failed to load admin content", error);
      }
    });
    return () => controller.abort();
  }, []);
  useEffect(() => {
    if (!portfolioItems.length) return;
    const hasActivePortfolioCategory = portfolioItems.some(
      (item) => item.category === activePortfolioCategory
    );
    if (!hasActivePortfolioCategory) {
      setActivePortfolioCategory(portfolioItems[0].category);
    }
  }, [activePortfolioCategory, portfolioItems]);
  useEffect(() => {
    const fallbackChain = buildHeroVideoFallbackChain(adminHeroVideo == null ? void 0 : adminHeroVideo.url);
    heroVideoFallbackChainRef.current = fallbackChain;
    setHeroVideoSrc(fallbackChain[0] || DEFAULT_HERO_VIDEO);
  }, [adminHeroVideo == null ? void 0 : adminHeroVideo.url]);
  useEffect(() => {
    CRITICAL_SERVICE_ASSETS.forEach((src) => {
      const img = new Image();
      img.decoding = "async";
      img.src = src;
    });
  }, []);
  const handleHeroVideoError = () => {
    const fallbackChain = heroVideoFallbackChainRef.current;
    const currentIndex = fallbackChain.indexOf(heroVideoSrc);
    const nextSrc = fallbackChain[currentIndex + 1];
    if (nextSrc) {
      setHeroVideoSrc(nextSrc);
    }
  };
  useEffect(() => {
    const trustSection = trustSectionRef.current;
    if (!trustSection) {
      setShouldLoadTrustWidgets(true);
      return void 0;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoadTrustWidgets(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );
    observer.observe(trustSection);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion || isPerformanceLite) {
      return void 0;
    }
    const ctx = gsap.context(() => {
      gsap.from(".hero-stagger", {
        y: 24,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.06
      });
      const splitTargets = gsap.utils.toArray("[data-split='words']");
      splitTargets.forEach((el) => {
        const source = (el.textContent || "").replace(/\s+/g, " ").trim();
        const alreadySplit = el.querySelector(".word-inner");
        if (!source) return;
        if (alreadySplit && el.dataset.splitSource === source) return;
        const words = source.split(/\s+/);
        el.innerHTML = words.map(
          (word) => `<span class="word"><span class="word-inner">${word}</span></span>`
        ).join(" ");
        el.dataset.splitSource = source;
      });
      gsap.utils.toArray(".reveal-block").forEach((block) => {
        const items = block.querySelectorAll(".reveal-item");
        const words = block.querySelectorAll(".word-inner");
        if (words.length) {
          gsap.set(words, { y: 14, opacity: 0 });
        }
        if (items.length) {
          gsap.set(items, { y: 20, opacity: 0 });
        }
        const tl = gsap.timeline({ paused: true });
        if (words.length) {
          tl.to(words, {
            y: 0,
            opacity: 1,
            stagger: 0.015,
            duration: 0.3,
            ease: "power3.out"
          });
        }
        if (items.length) {
          tl.to(
            items,
            {
              y: 0,
              opacity: 1,
              stagger: 0.06,
              duration: 0.4,
              ease: "power3.out"
            },
            words.length ? "-=0.2" : 0
          );
        }
        ScrollTrigger.create({
          trigger: block,
          start: "top 90%",
          end: "bottom top",
          onEnter: () => tl.play(),
          onEnterBack: () => tl.play()
        });
      });
      gsap.utils.toArray(".parallax").forEach((element) => {
        gsap.to(element, {
          scrollTrigger: {
            trigger: element,
            scrub: true
          },
          y: -40,
          ease: "none"
        });
      });
      const servicesWheels = gsap.utils.toArray(".services-wheel");
      servicesWheels.forEach((wheel) => {
        const wrapper = wheel.closest(".services-process-wrapper");
        if (wrapper) {
          gsap.set(wheel, { rotate: 0, transformOrigin: "50% 50%" });
          gsap.to(wheel, {
            rotate: -180,
            ease: "none",
            scrollTrigger: {
              trigger: wrapper,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5
            }
          });
        }
      });
      ScrollTrigger.refresh();
    }, rootRef);
    return () => ctx.revert();
  }, [language, isPerformanceLite]);
  useEffect(() => {
    if (typeof window === "undefined") return void 0;
    const media = window.matchMedia("(max-width: 780px)");
    const syncViewport = () => setIsMobileViewport(media.matches);
    syncViewport();
    media.addEventListener("change", syncViewport);
    return () => media.removeEventListener("change", syncViewport);
  }, []);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cores = navigator.hardwareConcurrency || 8;
    const ram = navigator.deviceMemory || 8;
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const saveData = !!(connection == null ? void 0 : connection.saveData);
    const slowNetwork = typeof (connection == null ? void 0 : connection.effectiveType) === "string" && (connection.effectiveType.includes("2g") || connection.effectiveType.includes("3g"));
    setIsPerformanceLite(
      reduced || isMobileViewport || saveData || slowNetwork || cores <= 4 || ram <= 4
    );
  }, [isMobileViewport]);
  useEffect(() => {
    const langCode = language === "AR" ? "ar" : language.toLowerCase();
    const dir = language === "AR" ? "rtl" : "ltr";
    document.documentElement.setAttribute("lang", langCode);
    document.documentElement.setAttribute("dir", dir);
    document.body.setAttribute("dir", dir);
  }, [language]);
  useEffect(() => {
    const update = () => {
      const y = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      setIsScrolled(y > 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  useEffect(() => {
    if (!isLegalModalOpen) return void 0;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsLegalModalOpen(false);
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isLegalModalOpen]);
  useEffect(() => {
    if (!portfolioItems.length) return;
    const isCurrentTabPresent = portfolioItems.some(
      (item) => item.category === activePortfolioCategory
    );
    if (!isCurrentTabPresent) {
      setActivePortfolioCategory(portfolioItems[0].category);
    }
  }, [portfolioItems, activePortfolioCategory]);
  const activePortfolioItem = portfolioItems.find((item) => item.category === activePortfolioCategory) || portfolioItems[0] || null;
  useEffect(() => {
    if (!portfolioViewerRef.current) return void 0;
    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out"
      }
    });
    tl.fromTo(
      portfolioViewerRef.current,
      { autoAlpha: 0.58, y: 12, scale: 0.988 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.38 }
    );
    if (portfolioMetaRef.current) {
      tl.fromTo(
        portfolioMetaRef.current,
        { autoAlpha: 0.65, y: 10 },
        { autoAlpha: 1, y: 0, duration: 0.34 },
        0.06
      );
    }
    return () => tl.kill();
  }, [
    activePortfolioCategory,
    activePortfolioItem == null ? void 0 : activePortfolioItem.before,
    activePortfolioItem == null ? void 0 : activePortfolioItem.after,
    activePortfolioItem == null ? void 0 : activePortfolioItem.title,
    activePortfolioItem == null ? void 0 : activePortfolioItem.description
  ]);
  const isRTL = language === "AR";
  const heroHeadlineLines = uiCopy.hero.headlineLines[language] || uiCopy.hero.headlineLines.EN;
  const t = (node) => (node == null ? void 0 : node[language]) || (node == null ? void 0 : node.EN) || "";
  const whatsappMessage = whatsappMessageByLanguage[language] || whatsappMessageByLanguage.EN;
  const whatsappHref = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
    whatsappMessage
  )}`;
  const isGoogleReviewsReady = Boolean(featurableWidgetId);
  const portfolioCategoryOrder = portfolioItems.map((item) => item.category);
  const coverageEdgeMarkers = [
    // Per-city tuning:
    // textOffsetX/Y -> label distance from the dot (px)
    // dotSize -> dot diameter (px)
    // textSize -> city label size (rem)
    { id: "abu", x: 70, y: 45, textOffsetX: -330, textOffsetY: -140, dotSize: 20, textSize: 4 },
    { id: "dubai", x: 80, y: 35, textOffsetX: -230, textOffsetY: -130, dotSize: 20, textSize: 4 },
    { id: "sharjah", x: 85, y: 23, textOffsetX: -275, textOffsetY: -100, dotSize: 10, textSize: 4 }
  ];
  const sharedShinyHeadingProps = {
    speed: 6,
    delay: 0,
    color: "#cdbbb8ff",
    shineColor: "#ffffff",
    spread: 108,
    direction: isRTL ? "right" : "left",
    yoyo: false,
    pauseOnHover: false,
    disabled: isPerformanceLite
  };
  useEffect(() => {
    var _a2;
    if (typeof window === "undefined") return void 0;
    if ((_a2 = window.yWidget) == null ? void 0 : _a2.show) return void 0;
    window.yWidgetSettings = {
      buttonAutoShow: false,
      showNewWidgetAutomatically: false
    };
    const scriptId = "altegio-widget-script";
    const existing = document.getElementById(scriptId);
    if (existing) return void 0;
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = ALTEGIO_WIDGET_SCRIPT;
    script.async = true;
    script.type = "text/javascript";
    script.charset = "UTF-8";
    document.body.appendChild(script);
    return void 0;
  }, []);
  useEffect(() => {
    if (typeof window === "undefined") return void 0;
    const syncOverflowState = () => {
      const isWidgetOpen = document.body.classList.contains("yBodyOverflowHidden");
      document.documentElement.classList.toggle("y-widget-open", isWidgetOpen);
      document.body.classList.toggle("y-widget-open", isWidgetOpen);
    };
    const observer = new MutationObserver(syncOverflowState);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    syncOverflowState();
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("y-widget-open");
      document.body.classList.remove("y-widget-open");
    };
  }, []);
  useEffect(() => {
    if (typeof window === "undefined") return void 0;
    const assetsToWarm = [
      "/keizenCAR.webp",
      "/keizenCARar.webp",
      "/tireFront.webp",
      "/tireBack.webp",
      "/tireFrontar.webp",
      "/tireBackar.webp",
      "/crown3d.webp",
      "/diamond3d.webp",
      "/cam3d.webp",
      "/order3d.webp",
      "/shield3d.webp"
    ];
    const warm = () => {
      assetsToWarm.forEach((src) => {
        const img = new Image();
        img.decoding = "async";
        img.src = src;
        if (typeof img.decode === "function") {
          img.decode().catch(() => {
          });
        }
      });
    };
    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(warm, { timeout: 1200 });
      return () => window.cancelIdleCallback(idleId);
    }
    const timeoutId = window.setTimeout(warm, 120);
    return () => window.clearTimeout(timeoutId);
  }, []);
  const handleOpenBooking = (url = ALTEGIO_BOOKING_URL) => {
    const getScrollbarSize = () => {
      const probe = document.createElement("div");
      probe.style.width = "120px";
      probe.style.height = "120px";
      probe.style.overflow = "scroll";
      probe.style.position = "absolute";
      probe.style.top = "-9999px";
      document.body.appendChild(probe);
      const size = probe.offsetWidth - probe.clientWidth;
      document.body.removeChild(probe);
      return size || 17;
    };
    const tryOpen = (attempt = 0) => {
      var _a2;
      if ((_a2 = window.yWidget) == null ? void 0 : _a2.show) {
        window.yWidget.show(url);
        window.setTimeout(() => {
          const scrollbarSize = getScrollbarSize() + 2;
          const widgetBlock = document.querySelector(".yWidgetBlock-altegio");
          if (widgetBlock) {
            widgetBlock.style.setProperty("--altegio-scrollbar-size", `${scrollbarSize}px`);
          }
        }, 80);
        return;
      }
      if (attempt < 12) {
        window.setTimeout(() => tryOpen(attempt + 1), 120);
      }
    };
    tryOpen();
  };
  const NAV_SCROLL_EXTRA = {
    services: 18,
    servicesFromPricing: -50,
    pricing: 15,
    membership: -80,
    portfolio: -60
  };
  const scrollToSection = (sectionId, customExtra = null) => {
    const target = document.getElementById(sectionId);
    if (!target) return;
    const header = document.querySelector(".site-header");
    const sectionExtra = customExtra ?? NAV_SCROLL_EXTRA[sectionId] ?? 14;
    const headerOffset = ((header == null ? void 0 : header.offsetHeight) || 92) + sectionExtra;
    const targetTop = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    window.scrollTo({
      top: Math.max(targetTop, 0),
      behavior: "smooth"
    });
  };
  const selectedServiceIndex = services.findIndex((service) => service.id === selectedServiceId);
  const mobilePricingInsertAfter = selectedServiceIndex >= 0 ? Math.min(services.length - 1, (Math.floor(selectedServiceIndex / 3) + 1) * 3 - 1) : -1;
  const renderServicePricingSlide = () => /* @__PURE__ */ jsx(
    "div",
    {
      className: `pricing-slide ${selectedServiceId ? "open" : ""} ${selectedServiceId === "auto" ? "auto-selected" : ""} ${selectedServiceId === "motorhome" ? "motorhome-selected" : ""}`,
      children: /* @__PURE__ */ jsx("div", { className: "pricing-slide-inner", children: /* @__PURE__ */ jsx("div", { className: "pricing-grid", children: getPackagesForService(selectedServiceId).map((pack, packIndex) => {
        const title = pack.name[language] || pack.name.EN;
        const note = pack.note[language] || pack.note.EN;
        const highlights = pack.highlights[language] || pack.highlights.EN;
        const includes = pack.includes[language] || pack.includes.EN;
        const isOpen = openPackageIds.includes(pack.id);
        const panelId = `pack-${pack.id}-checklist`;
        return /* @__PURE__ */ jsxs(
          "article",
          {
            className: `pricing-card reveal-item ${pack.featured ? "featured" : ""}`,
            "data-tier": pack.id,
            children: [
              /* @__PURE__ */ jsxs("header", { className: "pricing-card-top", children: [
                /* @__PURE__ */ jsxs("div", { className: "pricing-card-meta", children: [
                  /* @__PURE__ */ jsx("h3", { children: title }),
                  /* @__PURE__ */ jsx("p", { children: note })
                ] }),
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: "pricing-card-price",
                    "aria-label": t(uiCopy.accessibility.pricingAmount),
                    children: [
                      /* @__PURE__ */ jsx("span", { className: "pricing-amount", children: /* @__PURE__ */ jsx(
                        CountUp,
                        {
                          from: 0,
                          to: pack.price.amount,
                          separator: ",",
                          direction: "up",
                          duration: 1.12,
                          delay: packIndex * 0.08,
                          className: "pricing-amount-value",
                          startCounting: !!selectedServiceId
                        }
                      ) }),
                      /* @__PURE__ */ jsx("span", { className: "pricing-currency", children: pack.price.currency })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "pricing-card-body", children: [
                /* @__PURE__ */ jsx("div", { className: "pricing-label", children: pricingCopy.labels.highlights[language] || pricingCopy.labels.highlights.EN }),
                /* @__PURE__ */ jsx("ul", { className: "pricing-highlights", children: highlights.map((item) => /* @__PURE__ */ jsx("li", { children: item }, `${pack.id}-h-${item}`)) }),
                /* @__PURE__ */ jsxs("div", { className: `pricing-accordion ${isOpen ? "open" : ""}`, children: [
                  /* @__PURE__ */ jsxs(
                    "button",
                    {
                      type: "button",
                      className: "pricing-accordion-trigger",
                      "aria-expanded": isOpen,
                      "aria-controls": panelId,
                      onClick: () => {
                        setOpenPackageIds(
                          (prev) => prev.includes(pack.id) ? prev.filter((id) => id !== pack.id) : [...prev, pack.id]
                        );
                      },
                      children: [
                        /* @__PURE__ */ jsx("span", { children: pricingCopy.labels.fullChecklist[language] || pricingCopy.labels.fullChecklist.EN }),
                        /* @__PURE__ */ jsx("span", { className: "pricing-accordion-icon", "aria-hidden": "true", children: "▾" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      id: panelId,
                      className: "pricing-accordion-panel",
                      "aria-hidden": !isOpen,
                      children: /* @__PURE__ */ jsx("div", { className: "pricing-accordion-inner", children: /* @__PURE__ */ jsx(
                        "ul",
                        {
                          className: "pricing-checklist",
                          "aria-label": t(uiCopy.accessibility.packageIncludes),
                          children: includes.map((item) => /* @__PURE__ */ jsx("li", { children: item }, `${pack.id}-c-${item}`))
                        }
                      ) })
                    }
                  )
                ] })
              ] })
            ]
          },
          pack.id
        );
      }) }) })
    }
  );
  return /* @__PURE__ */ jsxs("div", { className: `page${isPerformanceLite ? " perf-lite" : ""}`, ref: rootRef, dir: isRTL ? "rtl" : "ltr", lang: language === "AR" ? "ar" : language.toLowerCase(), children: [
    /* @__PURE__ */ jsx("div", { className: "grain", "aria-hidden": "true" }),
    /* @__PURE__ */ jsx(
      MenuOverlay,
      {
        isOpen: isMenuOpen,
        onClose: () => setIsMenuOpen(false),
        links: uiCopy.nav,
        language,
        onLanguageChange: setLanguage,
        uiCopy,
        onNavigateServices: () => {
          setIsMenuOpen(false);
          scrollToSection("services", NAV_SCROLL_EXTRA.services);
        },
        onNavigatePricing: () => {
          setIsMenuOpen(false);
          setSelectedServiceId("auto");
          scrollToSection("services", NAV_SCROLL_EXTRA.servicesFromPricing);
        },
        onNavigateMembership: () => {
          setIsMenuOpen(false);
          scrollToSection("pricing", NAV_SCROLL_EXTRA.membership);
        },
        onNavigatePortfolio: () => {
          setIsMenuOpen(false);
          scrollToSection("portfolio", NAV_SCROLL_EXTRA.portfolio);
        },
        showPortfolio: hasPortfolioContent
      }
    ),
    /* @__PURE__ */ jsx("header", { className: `site-header ${isScrolled ? "scrolled" : ""}`, children: /* @__PURE__ */ jsxs("div", { className: "header-inner", children: [
      /* @__PURE__ */ jsx("div", { className: "mobile-only menu-btn-wrapper", children: /* @__PURE__ */ jsx(MenuButton, { isOpen: isMenuOpen, onClick: () => setIsMenuOpen(!isMenuOpen) }) }),
      /* @__PURE__ */ jsxs("div", { className: "logo-block", onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }), style: { cursor: "pointer" }, role: "button", tabIndex: 0, onKeyDown: (e) => {
        if (e.key === "Enter") window.scrollTo({ top: 0, behavior: "smooth" });
      }, children: [
        /* @__PURE__ */ jsx("img", { src: "/logo_white.webp", alt: "Kaizen Detailers" }),
        /* @__PURE__ */ jsx(
          "img",
          {
            className: "logo-wordmark",
            src: "/kaizendetailing.png",
            alt: "Kaizen Detailing"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("nav", { className: "nav-links desktop-only", "aria-label": t(uiCopy.accessibility.primaryNav), children: [
        /* @__PURE__ */ jsx("a", { href: "#top", onClick: (e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, children: t(uiCopy.nav.home) }),
        /* @__PURE__ */ jsx("a", { href: "#services", onClick: (e) => {
          e.preventDefault();
          scrollToSection("services", NAV_SCROLL_EXTRA.services);
        }, children: t(uiCopy.nav.services) }),
        /* @__PURE__ */ jsx("a", { href: "#pricing", onClick: (e) => {
          e.preventDefault();
          setSelectedServiceId("auto");
          scrollToSection("services", NAV_SCROLL_EXTRA.servicesFromPricing);
        }, children: t(uiCopy.nav.pricing) }),
        /* @__PURE__ */ jsx("a", { href: "#pricing", onClick: (e) => {
          e.preventDefault();
          scrollToSection("pricing", NAV_SCROLL_EXTRA.membership);
        }, children: t(uiCopy.nav.membership) }),
        /* @__PURE__ */ jsx("a", { href: "#why", children: t(uiCopy.nav.aboutUs) }),
        hasPortfolioContent ? /* @__PURE__ */ jsx("a", { href: "#portfolio", onClick: (e) => {
          e.preventDefault();
          scrollToSection("portfolio", NAV_SCROLL_EXTRA.portfolio);
        }, children: t(uiCopy.nav.portfolio) }) : null,
        /* @__PURE__ */ jsx("a", { href: "#trust", children: t(uiCopy.nav.partners) }),
        /* @__PURE__ */ jsx("a", { href: "#contact", children: t(uiCopy.nav.contact) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "header-actions", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "lang-switch desktop-only",
            role: "group",
            "aria-label": t(uiCopy.accessibility.languageSwitcher),
            children: ["EN", "AR", "RU"].map((lang) => /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                className: language === lang ? "active" : "",
                onClick: () => setLanguage(lang),
                children: lang === "AR" ? "عربي" : lang
              },
              lang
            ))
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "btn btn-primary",
            onClick: handleOpenBooking,
            children: t(uiCopy.nav.bookNow)
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsxs("section", { className: "hero", children: [
        /* @__PURE__ */ jsx(
          "video",
          {
            className: "hero-video",
            src: heroVideoSrc,
            autoPlay: true,
            muted: true,
            loop: true,
            playsInline: true,
            preload: "metadata",
            poster: "/KaizenCarDetailing-poster.webp",
            onError: handleHeroVideoError
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "hero-overlay" }),
        !isPerformanceLite && /* @__PURE__ */ jsx("div", { className: "hero-aurora", "aria-hidden": "true", children: /* @__PURE__ */ jsx(
          Aurora,
          {
            colorStops: ["#220000", "#ff3333", "#cc0000", "#220000"],
            blend: 0.8,
            amplitude: 2,
            speed: 0.5
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "hero-content", children: [
          /* @__PURE__ */ jsx("div", { className: "hero-copy", children: /* @__PURE__ */ jsx("h1", { className: `hero-title hero-stagger ${language === "RU" ? "hero-title-ru" : ""}`, children: heroHeadlineLines.map((line, index) => /* @__PURE__ */ jsx(
            "span",
            {
              className: `hero-line${index === 1 ? " hero-italic" : ""}`,
              children: /* @__PURE__ */ jsx(ShinyText, { text: line, ...sharedShinyHeadingProps })
            },
            `${language}-${line}`
          )) }) }),
          /* @__PURE__ */ jsxs("div", { className: "hero-info hero-stagger", children: [
            /* @__PURE__ */ jsx("h3", { children: t(uiCopy.hero.title) }),
            /* @__PURE__ */ jsxs("div", { className: "hero-actions", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  className: "btn btn-primary",
                  type: "button",
                  onClick: handleOpenBooking,
                  children: t(uiCopy.hero.ctaQuickBook)
                }
              ),
              /* @__PURE__ */ jsx(
                "a",
                {
                  className: "btn btn-ghost",
                  href: whatsappHref,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  children: t(uiCopy.hero.ctaWhatsapp)
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(LogoMarquee, { ariaLabel: t(uiCopy.accessibility.brandMarquee) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "section why reveal-block", id: "why", children: [
        /* @__PURE__ */ jsx("div", { className: "why-stars-static", "aria-hidden": "true" }),
        /* @__PURE__ */ jsx("div", { className: "why-lifestyle-strip reveal-item", children: /* @__PURE__ */ jsx("span", { children: t(uiCopy.lifestyleStrip) }) }),
        /* @__PURE__ */ jsx("div", { className: "section-inner", style: { maxWidth: "100%", padding: 0 }, children: /* @__PURE__ */ jsx(JourneyMap, { language, isRTL, performanceLite: isPerformanceLite }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "services-process-wrapper", style: { position: "relative", overflow: "visible" }, children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            className: "services-wheel",
            src: "/wheel.webp",
            alt: "",
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsx("section", { className: "section services reveal-block", id: "services", children: /* @__PURE__ */ jsxs("div", { className: "section-inner", children: [
          /* @__PURE__ */ jsx("div", { className: "section-heading split", children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h2", { className: "reveal-item", children: /* @__PURE__ */ jsx(
            ShinyText,
            {
              text: t(uiCopy.sectionTitles.services),
              ...sharedShinyHeadingProps
            }
          ) }) }) }),
          /* @__PURE__ */ jsx("div", { className: "services-grid", children: services.map((service, index) => {
            var _a2, _b;
            return /* @__PURE__ */ jsxs(React.Fragment, { children: [
              /* @__PURE__ */ jsx(
                LumenCard,
                {
                  index,
                  title: service.title[language] || service.title.EN,
                  mobileTitle: ((_a2 = service.mobileTitle) == null ? void 0 : _a2[language]) || ((_b = service.mobileTitle) == null ? void 0 : _b.EN),
                  soonLabel: t(uiCopy.common.soon),
                  state: service.state,
                  icon: service.icon,
                  className: "reveal-item",
                  isSelected: selectedServiceId === service.id,
                  onClick: () => {
                    if (service.state === "active") {
                      setSelectedServiceId((prev) => prev === service.id ? null : service.id);
                    }
                  }
                }
              ),
              isMobileViewport && selectedServiceId && index === mobilePricingInsertAfter ? /* @__PURE__ */ jsx("div", { className: "services-mobile-pricing-slot", children: renderServicePricingSlide() }) : null
            ] }, service.id);
          }) }),
          !isMobileViewport ? renderServicePricingSlide() : null
        ] }) }),
        /* @__PURE__ */ jsx("section", { className: "section process reveal-block", id: "process", children: /* @__PURE__ */ jsxs("div", { className: "section-inner", children: [
          /* @__PURE__ */ jsx("div", { className: "section-heading", children: /* @__PURE__ */ jsx("h2", { className: "reveal-item", children: /* @__PURE__ */ jsx(
            ShinyText,
            {
              text: t(uiCopy.sectionTitles.process),
              ...sharedShinyHeadingProps
            }
          ) }) }),
          /* @__PURE__ */ jsx("div", { className: "process-cards", children: processSteps.map((step) => /* @__PURE__ */ jsxs("div", { className: "process-card-new reveal-item", children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "process-card-top",
                style: { backgroundImage: `url(${step.image})` }
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "process-card-bottom", children: [
              /* @__PURE__ */ jsx("h3", { children: step.title[language] || step.title.EN }),
              /* @__PURE__ */ jsx("p", { children: step.text[language] || step.text.EN })
            ] })
          ] }, step.id)) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("div", { id: "pricing", style: { scrollMarginTop: "5rem" } }),
      /* @__PURE__ */ jsx("section", { className: "section membership reveal-block", id: "membership", children: /* @__PURE__ */ jsxs("div", { className: "section-inner", children: [
        /* @__PURE__ */ jsx("div", { className: "section-heading", children: /* @__PURE__ */ jsx("h2", { className: "reveal-item", children: /* @__PURE__ */ jsx(
          ShinyText,
          {
            text: t(membershipCopy.kicker),
            ...sharedShinyHeadingProps
          }
        ) }) }),
        /* @__PURE__ */ jsx("div", { className: "membership-header", children: /* @__PURE__ */ jsxs("h2", { className: "membership-headline reveal-item", children: [
          t(membershipCopy.headline),
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { className: "membership-headline-accent", children: t(membershipCopy.headlineAccent) })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "membership-body reveal-item", children: [
          /* @__PURE__ */ jsx("p", { className: "membership-intro", children: t(membershipCopy.body) }),
          /* @__PURE__ */ jsx("p", { className: "membership-schedule", children: t(membershipCopy.schedule) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "membership-stats reveal-item", children: [
          /* @__PURE__ */ jsxs("div", { className: "membership-stat", children: [
            /* @__PURE__ */ jsx("span", { className: "membership-stat-number", children: "10" }),
            /* @__PURE__ */ jsx("span", { className: "membership-stat-label", children: t(membershipCopy.stats.services) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "membership-stat-divider" }),
          /* @__PURE__ */ jsxs("div", { className: "membership-stat", children: [
            /* @__PURE__ */ jsx("span", { className: "membership-stat-number", children: "20" }),
            /* @__PURE__ */ jsx("span", { className: "membership-stat-label", children: t(membershipCopy.stats.weeks) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "membership-plans-wrapper", children: [
          /* @__PURE__ */ jsx("div", { className: "membership-plans reveal-item", children: membershipConfig.plans.map((plan) => {
            const planTitle = t(plan.title);
            const isAutoDefaultTitle = plan.id === "auto" && language === "EN" && planTitle === "Membership for Auto";
            const isMotoPlan = plan.icon === "moto" || plan.id === "moto";
            return /* @__PURE__ */ jsxs("article", { className: "membership-card", "data-plan": plan.id, children: [
              /* @__PURE__ */ jsx("div", { className: "membership-card-icon", children: isMotoPlan ? /* @__PURE__ */ jsx("img", { src: "/moto.webp", alt: "", loading: "lazy", decoding: "async", style: { width: 90, opacity: 0.8 } }) : /* @__PURE__ */ jsx("img", { src: "/rolls1.webp", alt: "", loading: "lazy", decoding: "async", style: { width: 100, opacity: 0.8 } }) }),
              /* @__PURE__ */ jsx("h3", { className: "membership-card-title", children: isAutoDefaultTitle ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("span", { className: "membership-card-title-line", children: "Membership for" }),
                " ",
                /* @__PURE__ */ jsx("span", { className: "membership-card-title-line membership-card-title-line-secondary", children: "Auto" })
              ] }) : planTitle }),
              /* @__PURE__ */ jsxs("div", { className: "membership-card-price", children: [
                /* @__PURE__ */ jsx("span", { className: "membership-price-amount", children: /* @__PURE__ */ jsx(CountUp, { from: 0, to: plan.price.amount, separator: ",", direction: "up", duration: 1.2, className: "membership-price-value", startCounting: true }) }),
                /* @__PURE__ */ jsx("span", { className: "membership-price-currency", children: plan.price.currency })
              ] }),
              /* @__PURE__ */ jsx("ul", { className: "membership-card-perks", children: (plan.perks[language] || plan.perks.EN).map((perk) => /* @__PURE__ */ jsx("li", { children: perk }, perk)) }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  className: "btn btn-primary membership-card-btn",
                  onClick: handleOpenBooking,
                  children: t(uiCopy.nav.bookNow)
                }
              )
            ] }, plan.id);
          }) }),
          /* @__PURE__ */ jsxs("article", { className: "membership-packages-card reveal-item", children: [
            /* @__PURE__ */ jsxs("div", { className: "membership-packages-head", children: [
              /* @__PURE__ */ jsx("h3", { className: "membership-packages-title", children: t(membershipConfig.packages.title) }),
              /* @__PURE__ */ jsx("p", { className: "membership-packages-subtitle", children: t(membershipConfig.packages.subtitle) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "membership-packages-list", children: membershipConfig.packages.items.map((item) => /* @__PURE__ */ jsxs("div", { className: "membership-package-row", children: [
              /* @__PURE__ */ jsx("span", { className: "membership-package-label", children: t(item.label) }),
              /* @__PURE__ */ jsxs("span", { className: "membership-package-price", children: [
                /* @__PURE__ */ jsx(
                  CountUp,
                  {
                    from: 0,
                    to: item.price,
                    separator: ",",
                    direction: "up",
                    duration: 1,
                    className: "membership-package-price-value",
                    startCounting: true
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "membership-package-price-currency", children: " AED" })
              ] })
            ] }, item.id)) }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                className: "btn btn-primary membership-card-btn membership-packages-btn",
                onClick: handleOpenBooking,
                children: t(uiCopy.nav.bookNow)
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "membership-image-container reveal-item desktop-only", children: /* @__PURE__ */ jsxs("div", { className: "membership-infinity-group", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                className: "membership-infinity-base",
                src: "/infinite.webp",
                alt: "Infinite Membership"
              }
            ),
            /* @__PURE__ */ jsx(
              "span",
              {
                className: "membership-infinity-overlay",
                "aria-hidden": "true"
              }
            )
          ] }) })
        ] })
      ] }) }),
      hasPortfolioContent ? /* @__PURE__ */ jsx("section", { className: "section portfolio reveal-block", id: "portfolio", children: /* @__PURE__ */ jsxs("div", { className: "section-inner", children: [
        /* @__PURE__ */ jsx("div", { className: "section-heading", children: /* @__PURE__ */ jsx("h2", { className: "reveal-item portfolio-title", children: /* @__PURE__ */ jsx(
          ShinyText,
          {
            text: t(uiCopy.sectionTitles.portfolio),
            ...sharedShinyHeadingProps
          }
        ) }) }),
        /* @__PURE__ */ jsxs("div", { className: "portfolio-content reveal-item", children: [
          /* @__PURE__ */ jsxs("div", { className: "portfolio-main", children: [
            /* @__PURE__ */ jsx("div", { className: "portfolio-tabs", children: portfolioCategoryOrder.map((cat) => {
              var _a2;
              return /* @__PURE__ */ jsx(
                "button",
                {
                  className: `portfolio-tab ${activePortfolioCategory === cat ? "active" : ""}`,
                  onClick: () => setActivePortfolioCategory(cat),
                  "aria-pressed": activePortfolioCategory === cat,
                  children: ((_a2 = uiCopy.portfolio.categories) == null ? void 0 : _a2[cat]) ? t(uiCopy.portfolio.categories[cat]) : cat
                },
                cat
              );
            }) }),
            /* @__PURE__ */ jsxs(
              "div",
              {
                ref: portfolioViewerRef,
                className: `portfolio-viewer ${isPortfolioHovered ? "active" : ""} ${hasPortfolioInteracted ? "revealed" : ""}`,
                onMouseEnter: () => {
                  setIsPortfolioHovered(true);
                  setHasPortfolioInteracted(true);
                },
                onMouseLeave: () => setIsPortfolioHovered(false),
                children: [
                  /* @__PURE__ */ jsx("div", { className: "viewer-blur-wrapper", dir: "ltr", children: /* @__PURE__ */ jsx(
                    BeforeAfter,
                    {
                      beforeImage: (activePortfolioItem == null ? void 0 : activePortfolioItem.before) || "",
                      afterImage: (activePortfolioItem == null ? void 0 : activePortfolioItem.after) || ""
                    },
                    `${activePortfolioCategory}-${(activePortfolioItem == null ? void 0 : activePortfolioItem.before) || ""}`
                  ) }),
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "viewer-overlay",
                      style: { opacity: hasPortfolioInteracted ? 0 : 1, pointerEvents: "none" },
                      children: /* @__PURE__ */ jsxs("div", { className: "drag-hint", children: [
                        /* @__PURE__ */ jsx("div", { className: "drag-icon", children: "↔" }),
                        /* @__PURE__ */ jsx("span", { children: t(uiCopy.portfolio.dragHint) })
                      ] })
                    }
                  )
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "portfolio-sidebar", children: /* @__PURE__ */ jsxs("div", { ref: portfolioMetaRef, className: "portfolio-meta", children: [
            /* @__PURE__ */ jsx("h4", { children: (activePortfolioItem == null ? void 0 : activePortfolioItem.title) || DEFAULT_PORTFOLIO_META.title }),
            /* @__PURE__ */ jsx("p", { children: (activePortfolioItem == null ? void 0 : activePortfolioItem.description) || DEFAULT_PORTFOLIO_META.description })
          ] }) })
        ] })
      ] }) }) : null,
      /* @__PURE__ */ jsxs("section", { ref: trustSectionRef, className: "section trust reveal-block", id: "trust", children: [
        !isPerformanceLite ? /* @__PURE__ */ jsxs("div", { className: "trust-aurora", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsx(
            Aurora,
            {
              colorStops: ["#121212", "#fa0000", "#0a0a0a"],
              blend: 0.5,
              amplitude: 1,
              speed: 1
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "trust-aurora-fade" })
        ] }) : null,
        /* @__PURE__ */ jsxs("div", { className: "section-inner trust-layout", children: [
          /* @__PURE__ */ jsxs("div", { className: "trust-header", children: [
            /* @__PURE__ */ jsx("h2", { className: "reveal-item", children: /* @__PURE__ */ jsx(
              ShinyText,
              {
                text: t(uiCopy.sectionTitles.trust),
                ...sharedShinyHeadingProps
              }
            ) }),
            /* @__PURE__ */ jsx("p", { className: "section-subtitle reveal-item", children: t(uiCopy.sectionTitles.trustSubtitle) }),
            /* @__PURE__ */ jsxs("div", { className: "trust-apps reveal-item", children: [
              /* @__PURE__ */ jsxs("a", { href: "https://apps.apple.com", target: "_blank", rel: "noopener noreferrer", className: "app-badge", children: [
                /* @__PURE__ */ jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" }) }),
                "App Store"
              ] }),
              /* @__PURE__ */ jsxs("a", { href: "https://play.google.com", target: "_blank", rel: "noopener noreferrer", className: "app-badge", children: [
                /* @__PURE__ */ jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M3.18 23.67c-.38-.2-.68-.6-.68-1.15V1.48c0-.55.3-.95.68-1.15l11.6 11.67L3.18 23.67zM15.73 15.5l-2.93-2.95 2.93-2.95 3.34 1.9c.95.54.95 1.56 0 2.1l-3.34 1.9zM12.03 11.78L4.14.72l10.82 6.15-2.93 4.91zM4.14 23.28l7.89-11.06 2.93 2.95-10.82 8.11z" }) }),
                "Google Play"
              ] }),
              /* @__PURE__ */ jsxs("a", { href: "https://www.tiktok.com/@kaizen.detailers?_r=1&_t=ZS-943NjVkSflk", target: "_blank", rel: "noopener noreferrer", className: "app-badge", children: [
                /* @__PURE__ */ jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.17a8.16 8.16 0 004.76 1.53V7.25a4.82 4.82 0 01-1-.56z" }) }),
                "TikTok"
              ] }),
              /* @__PURE__ */ jsxs("a", { href: "https://snapchat.com/t/HEebtCIy", target: "_blank", rel: "noopener noreferrer", className: "app-badge", children: [
                /* @__PURE__ */ jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M12.07 2c2.76 0 4.39 1.86 4.85 3.78.24 1.01.16 2.02.08 2.86l-.04.39c-.02.21-.04.41-.04.57 0 .3.13.48.42.6.23.1.48.14.72.18l.14.03c.65.13 1.38.28 1.87.69.32.27.48.62.44 1-.07.65-.76 1.06-1.42 1.33-.09.04-.18.07-.26.11-.56.23-1.08.5-1.16.93-.03.17 0 .35.1.53.67 1.15 1.55 2.07 2.62 2.74.36.22.75.39 1.11.5.38.12.55.38.5.73-.07.42-.52.72-.86.87-.52.23-1.07.35-1.52.55-.17.08-.32.2-.45.38-.22.28-.24.63-.41.95-.2.37-.56.63-1.05.63-.32 0-.66-.1-1.05-.24-.6-.22-1.28-.47-2.28-.36-.93.1-1.57.5-2.14.86-.6.38-1.16.73-1.92.73h-.05c-.76 0-1.33-.36-1.92-.73-.57-.36-1.21-.76-2.14-.86-1-.11-1.68.14-2.28.36-.39.14-.73.24-1.05.24-.54 0-.87-.31-1.05-.63-.17-.32-.19-.67-.41-.95-.13-.18-.28-.3-.45-.38-.45-.2-1-.32-1.52-.55-.34-.15-.79-.45-.86-.87-.05-.35.12-.61.5-.73.36-.11.75-.28 1.11-.5 1.07-.67 1.95-1.59 2.62-2.74.1-.18.13-.36.1-.53-.08-.43-.6-.7-1.16-.93-.08-.04-.17-.07-.26-.11-.66-.27-1.35-.68-1.42-1.33-.04-.38.12-.73.44-1 .49-.41 1.22-.56 1.87-.69l.14-.03c.24-.04.49-.08.72-.18.29-.12.42-.3.42-.6 0-.16-.02-.36-.04-.57l-.04-.39c-.08-.84-.16-1.85.08-2.86C7.68 3.86 9.31 2 12.07 2z" }) }),
                "Snapchat"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "trust-widgets reveal-item", children: [
            /* @__PURE__ */ jsxs("div", { className: "social-block", children: [
              /* @__PURE__ */ jsx("h3", { className: "social-title", children: /* @__PURE__ */ jsxs(
                "a",
                {
                  className: "social-title-link",
                  href: trustLinks.googleReviews,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  "aria-label": t(uiCopy.trust.openGoogle),
                  children: [
                    /* @__PURE__ */ jsx("span", { children: t(uiCopy.trust.googleReviews) }),
                    /* @__PURE__ */ jsx("span", { className: "social-arrow", "aria-hidden": "true", children: "→" })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsx("div", { className: "social-body", children: shouldLoadTrustWidgets ? isGoogleReviewsReady ? /* @__PURE__ */ jsx(
                Suspense,
                {
                  fallback: /* @__PURE__ */ jsx(ReviewsFallback, { message: t(uiCopy.widget.reviewsLoading) }),
                  children: /* @__PURE__ */ jsx(
                    ReactGoogleReviews,
                    {
                      layout: "carousel",
                      featurableId: featurableWidgetId,
                      maxItems: 2,
                      carouselSpeed: 3200
                    }
                  )
                }
              ) : /* @__PURE__ */ jsx("div", { className: "widget-fallback widget-fallback-premium", children: reviewsFallbackCopy[language] || reviewsFallbackCopy.EN }) : /* @__PURE__ */ jsx(
                Suspense,
                {
                  fallback: /* @__PURE__ */ jsx(ReviewsFallback, { message: t(uiCopy.widget.reviewsLoading) }),
                  children: /* @__PURE__ */ jsx(
                    ReviewsFallback,
                    {
                      message: reviewsFallbackCopy[language] || reviewsFallbackCopy.EN
                    }
                  )
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "social-block", children: [
              /* @__PURE__ */ jsx("h3", { className: "social-title", children: /* @__PURE__ */ jsxs(
                "a",
                {
                  className: "social-title-link",
                  href: trustLinks.instagram,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  "aria-label": t(uiCopy.trust.openInstagram),
                  children: [
                    /* @__PURE__ */ jsx("span", { children: t(uiCopy.trust.instagram) }),
                    /* @__PURE__ */ jsx("span", { className: "social-arrow", "aria-hidden": "true", children: "→" })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsx("div", { className: "social-body", children: shouldLoadTrustWidgets ? /* @__PURE__ */ jsx(
                Suspense,
                {
                  fallback: /* @__PURE__ */ jsx(BeholdFallback, { message: t(uiCopy.widget.beholdLoading) }),
                  children: /* @__PURE__ */ jsx(BeholdWidget, { feedId: "MB3EebWs3lODSKN5ljWY" })
                }
              ) : /* @__PURE__ */ jsx(BeholdFallback, { message: t(uiCopy.widget.beholdLoading) }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "trust-brands reveal-item", children: [
            /* @__PURE__ */ jsx("h3", { children: t(uiCopy.trust.certifiedProducts) }),
            /* @__PURE__ */ jsx("div", { className: "brands-row", children: certifiedBrands.map((brand) => /* @__PURE__ */ jsx("div", { className: "brand-mark", children: /* @__PURE__ */ jsx("img", { src: brand.logo, alt: brand.name, loading: "lazy", decoding: "async" }) }, brand.name)) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "section coverage", id: "coverage", children: [
        /* @__PURE__ */ jsxs("div", { className: "coverage-overlay-copy", children: [
          /* @__PURE__ */ jsxs("h2", { className: "coverage-title", children: [
            /* @__PURE__ */ jsx(
              ShinyText,
              {
                text: coverageCopy.titleLine1[language] || coverageCopy.titleLine1.EN,
                ...sharedShinyHeadingProps
              }
            ),
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx(
              ShinyText,
              {
                text: coverageCopy.titleLine2[language] || coverageCopy.titleLine2.EN,
                ...sharedShinyHeadingProps
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "section-subtitle coverage-subtitle", children: [
            coverageCopy.subtitle[language] || coverageCopy.subtitle.EN,
            " ",
            /* @__PURE__ */ jsx("img", { src: "/UAEflag.webp", alt: "UAE", className: "inline-flag coverage-flag" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "coverage-bleed", children: /* @__PURE__ */ jsxs("div", { className: "coverage-map-stack", children: [
          /* @__PURE__ */ jsx("img", { className: "coverage-map-base", src: "/map.webp", alt: "", loading: "lazy", decoding: "async" }),
          /* @__PURE__ */ jsx("div", { className: "coverage-zone zone-abu" }),
          /* @__PURE__ */ jsx("div", { className: "coverage-zone zone-dubai" }),
          /* @__PURE__ */ jsx("div", { className: "coverage-zone zone-sharjah" }),
          /* @__PURE__ */ jsx("div", { className: "coverage-fade" }),
          /* @__PURE__ */ jsx("div", { className: "coverage-edge-markers", "aria-hidden": "true", children: coverageEdgeMarkers.map((marker) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: `coverage-edge-marker coverage-edge-marker-${marker.id}`,
              style: {
                left: `${marker.x}%`,
                top: `${marker.y}%`,
                "--label-offset-x": `${marker.textOffsetX}px`,
                "--label-offset-y": `${marker.textOffsetY}px`,
                "--dot-size": `${marker.dotSize}px`,
                "--label-size": `${marker.textSize}rem`
              },
              children: [
                /* @__PURE__ */ jsx("span", { className: "coverage-edge-dot" }),
                /* @__PURE__ */ jsx("span", { className: "coverage-edge-name", children: t(uiCopy.coverage.markers[marker.id]) })
              ]
            },
            marker.id
          )) })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("footer", { className: "footer", id: "contact", children: [
      /* @__PURE__ */ jsxs("div", { className: "footer-top", children: [
        /* @__PURE__ */ jsx("div", { className: "footer-top-brand", children: /* @__PURE__ */ jsx("img", { src: "/logo_white.webp", alt: "Kaizen Detailers", loading: "lazy", decoding: "async" }) }),
        /* @__PURE__ */ jsx("p", { children: t(uiCopy.footer.text) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "footer-grid", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { children: t(uiCopy.footer.contact) }),
          /* @__PURE__ */ jsxs("div", { className: "footer-contact-list", children: [
            /* @__PURE__ */ jsxs("div", { className: "footer-contact-item", children: [
              /* @__PURE__ */ jsx("span", { className: "footer-contact-icon", "aria-hidden": "true", children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.63 2.63a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6.09 6.09l1.45-1.29a2 2 0 0 1 2.11-.45c.85.3 1.73.51 2.63.63A2 2 0 0 1 22 16.92z" }) }) }),
              /* @__PURE__ */ jsx("a", { className: "footer-contact-text", href: "tel:+971543720101", children: "+971 54 372 0101" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "footer-contact-item", children: [
              /* @__PURE__ */ jsx("span", { className: "footer-contact-icon", "aria-hidden": "true", children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.63 2.63a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6.09 6.09l1.45-1.29a2 2 0 0 1 2.11-.45c.85.3 1.73.51 2.63.63A2 2 0 0 1 22 16.92z" }) }) }),
              /* @__PURE__ */ jsx("a", { className: "footer-contact-text", href: "tel:+971563285050", children: "+971 56 328 5050" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "footer-contact-item footer-email", children: [
              /* @__PURE__ */ jsx("span", { className: "footer-contact-icon", "aria-hidden": "true", children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
                /* @__PURE__ */ jsx("path", { d: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" }),
                /* @__PURE__ */ jsx("path", { d: "m22 6-10 7L2 6" })
              ] }) }),
              /* @__PURE__ */ jsx("a", { className: "footer-contact-text", href: "mailto:kaizen.detailers.uae@gmail.com", children: "kaizen.detailers.uae@gmail.com" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { children: t(uiCopy.footer.social) }),
          /* @__PURE__ */ jsxs("div", { className: "footer-social-links", children: [
            /* @__PURE__ */ jsx("a", { href: trustLinks.instagram, target: "_blank", rel: "noopener noreferrer", children: t(uiCopy.trust.instagram) }),
            /* @__PURE__ */ jsx("a", { href: "https://www.tiktok.com/@kaizen.detailers?_r=1&_t=ZS-943NjVkSflk", target: "_blank", rel: "noopener noreferrer", children: "TikTok" }),
            /* @__PURE__ */ jsx("a", { href: "https://snapchat.com/t/HEebtCIy", target: "_blank", rel: "noopener noreferrer", children: "Snapchat" }),
            /* @__PURE__ */ jsx("a", { href: whatsappHref, target: "_blank", rel: "noopener noreferrer", children: t(uiCopy.footer.whatsapp) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { children: t(uiCopy.footer.legal) }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "footer-link-btn",
              onClick: () => setIsLegalModalOpen(true),
              children: t(uiCopy.footer.legalInfo)
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "footer-bottom", children: [
        /* @__PURE__ */ jsxs("span", { className: "footer-bottom-address", children: [
          /* @__PURE__ */ jsx("span", { className: "footer-bottom-address-icon", "aria-hidden": "true", children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ jsx("path", { d: "M12 21s-6-5.33-6-11a6 6 0 1 1 12 0c0 5.67-6 11-6 11z" }),
            /* @__PURE__ */ jsx("circle", { cx: "12", cy: "10", r: "2.25" })
          ] }) }),
          /* @__PURE__ */ jsx("span", { children: "AL DIYAR - 107, 1457 Dubai" })
        ] }),
        /* @__PURE__ */ jsx("span", { children: t(uiCopy.footer.rights) })
      ] })
    ] }),
    isLegalModalOpen ? /* @__PURE__ */ jsx(
      "div",
      {
        className: "legal-modal-backdrop",
        role: "presentation",
        onClick: () => setIsLegalModalOpen(false),
        children: /* @__PURE__ */ jsxs(
          "div",
          {
            className: "legal-modal",
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": "legal-modal-title",
            onClick: (event) => event.stopPropagation(),
            children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  className: "legal-modal-close",
                  "aria-label": t(uiCopy.accessibility.closeDialog),
                  onClick: () => setIsLegalModalOpen(false),
                  children: "×"
                }
              ),
              /* @__PURE__ */ jsx("h3", { id: "legal-modal-title", children: t(uiCopy.footer.legalTitle) }),
              /* @__PURE__ */ jsx("p", { children: t(uiCopy.footer.legalBody) })
            ]
          }
        )
      }
    ) : null,
    /* @__PURE__ */ jsx(
      "a",
      {
        href: whatsappHref,
        target: "_blank",
        rel: "noopener noreferrer",
        className: `whatsapp-float${isScrolled ? " is-visible" : ""}`,
        "aria-label": "WhatsApp",
        children: /* @__PURE__ */ jsx("img", { src: "/whatsapp.svg", alt: "WhatsApp" })
      }
    )
  ] });
}
function render(_url = "/") {
  return ReactDOMServer.renderToString(/* @__PURE__ */ jsx(App, {}));
}
export {
  render
};
