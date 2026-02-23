import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ShinyText from "./ShinyText.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function JourneyMap({ language = "EN", isRTL = false }) {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const vanRef = useRef(null);
    const tireFrontRef = useRef(null);
    const tireBackRef = useRef(null);
    const mobileTrackRef = useRef(null);
    const mobileVanRef = useRef(null);
    const [isMobileLayout, setIsMobileLayout] = useState(false);
    const [isLowPerformance, setIsLowPerformance] = useState(false);

    // Icon Refs
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
    const vanImage = isRTL ? "/keizenCARar.png" : "/keizenCAR.png";
    // User provided full-canvas tire images
    const tireBackImg = isRTL ? "/tireBackar.png" : "/tireBack.png";
    const tireFrontImg = isRTL ? "/tireFrontar.png" : "/tireFront.png";
    // Exact rotation centers from tire PNG alpha bounds (1280x904 canvas)
    // LTR: back(248.5, 618), front(1086.5, 615.5)
    // RTL: back(1029.5, 607), front(188.5, 605.5)
    const tireBackOrigin = isRTL ? "80.43% 67.15%" : "19.41% 68.36%";
    const tireFrontOrigin = isRTL ? "14.73% 66.98%" : "84.88% 68.09%";

    useEffect(() => {
        const section = sectionRef.current;
        const track = isMobileLayout ? mobileTrackRef.current : trackRef.current;
        const van = isMobileLayout ? mobileVanRef.current : vanRef.current;
        const tireFront = tireFrontRef.current;
        const tireBack = tireBackRef.current;

        if (!section || !track || !van) {
            return undefined;
        }

        const isMobile = isMobileLayout || window.matchMedia("(max-width: 780px)").matches;
        const liteMode = isLowPerformance || isMobile;
        const scrollDistance = liteMode ? 420 : 1000;
        const scrubValue = liteMode ? 0.4 : 1;
        const shouldPin = !liteMode;
        const travelDistance = Math.max(track.clientWidth - van.clientWidth, 0);
        const startX = isRTL ? travelDistance : 0;
        const endX = isRTL ? 0 : travelDistance;

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

        // Move van using precomputed track values to avoid layout reads during scroll.
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

        // Tire rotation while van moves on X: 1px traveled = 1deg wheel rotation.
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

        // --- ICON ANIMATIONS (Triggered One-Shot) ---

        // Reveal Milestones (Checkpoints based on Scroll)
        // 5 milestones at 0%, 20%, 40%, 60%, 80%
        const milestones = section.querySelectorAll(".milestone-marker");
        const positions = isMobile ? [0.12, 0.30, 0.50, 0.70, 0.90] : [0.15, 0.35, 0.58, 0.80, 0.98];

        milestones.forEach((ms, i) => {
            if (ms) {
                tl.fromTo(ms,
                    { scale: 0, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.05, ease: "back.out(1.7)" },
                    positions[i]
                );
            }
        });

        return () => {
            // Cleanup only this timeline/trigger
            tl.scrollTrigger?.kill();
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
    }, [isRTL, isMobileLayout, isLowPerformance]);

    useEffect(() => {
        const media = window.matchMedia("(max-width: 768px)");
        const syncLayout = () => setIsMobileLayout(media.matches);
        syncLayout();
        media.addEventListener("change", syncLayout);
        return () => media.removeEventListener("change", syncLayout);
    }, []);

    useEffect(() => {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const cpuCores = navigator.hardwareConcurrency || 8;
        const ramGb = navigator.deviceMemory || 8;
        setIsLowPerformance(reduceMotion || cpuCores <= 4 || ramGb <= 4);
    }, []);

    const markerPositions = isMobileLayout
        ? (isRTL ? ["94%", "74%", "54%", "34%", "14%"] : ["6%", "26%", "46%", "66%", "86%"])
        : (isRTL ? ["100%", "80%", "60%", "40%", "20%"] : ["0%", "20%", "40%", "60%", "80%"]);
    const milestoneIcons = ["/crown3d.png", "/diamond3d.png", "/cam3d.png", "/order3d.png", "/shield3d.png"];

    if (isMobileLayout) {
        return (
            <div ref={sectionRef} className="journey-wrapper journey-wrapper-mobile">
                <div className="journey-content">
                    <div
                        className="section-heading journey-heading"
                        style={{
                            textAlign: isRTL ? "right" : "left",
                            marginLeft: isRTL ? "auto" : "0",
                            marginRight: isRTL ? "0" : "auto"
                        }}
                    >
                        <h2 className="reveal-item">
                            <ShinyText
                                text={copy.titlePlain}
                                speed={6}
                                delay={0}
                                color="#cdbbb8ff"
                                shineColor="#ffffff"
                                spread={108}
                                direction={isRTL ? "right" : "left"}
                                yoyo={false}
                                pauseOnHover={false}
                                disabled={false}
                            />
                        </h2>
                        <p className="section-subtitle reveal-item journey-subtitle">{copy.subtitle}</p>
                    </div>

                    <div className={`journey-mobile-road-wrap ${isRTL ? "rtl" : ""}`}>
                        <div ref={mobileTrackRef} className="track-container journey-mobile-track">
                            <div ref={mobileVanRef} className="van-wrapper journey-mobile-van">
                                <img src={vanImage} alt="Kaizen Car" className="journey-van-img" />
                            </div>
                        </div>
                    </div>

                    <div className={`journey-mobile-milestones ${isRTL ? "rtl" : ""}`}>
                        {copy.milestones.map((ms, i) => (
                            <div key={ms.key} className="milestone-marker journey-mobile-milestone">
                                <img ref={[geoRef, lightningRef, handshakeRef, inspectionRef, guaranteeRef][i]} src={milestoneIcons[i]} alt={ms.title} />
                                <h4>{ms.title}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div ref={sectionRef} className="journey-wrapper" style={{
            height: "auto", // Removed fixed 100vh to fit content
            minHeight: "600px", // Minimum height for presence
            width: "100%",
            position: "relative",
            backgroundColor: "transparent",
            display: "flex",
            flexDirection: "column",
            alignItems: isRTL ? "flex-end" : "flex-start",
            justifyContent: "flex-start",
            paddingTop: "30px",
            paddingBottom: "40px" // Tighten gap before next section
        }}>

            <div className="journey-content">
                {/* Header Content - Now Pinned with the car */}
                <div
                    className="section-heading journey-heading"
                    style={{
                        textAlign: isRTL ? "right" : "left",
                        marginLeft: isRTL ? "auto" : "0",
                        marginRight: isRTL ? "0" : "auto"
                    }}
                >
                    <h2 className="reveal-item">
                        <ShinyText
                            text={copy.titlePlain}
                            speed={6}
                            delay={0}
                            color="#cdbbb8ff"
                            shineColor="#ffffff"
                            spread={108}
                            direction={isRTL ? "right" : "left"}
                            yoyo={false}
                            pauseOnHover={false}
                            disabled={false}
                        />
                    </h2>
                    <p className="section-subtitle reveal-item journey-subtitle">
                        {copy.subtitle}
                    </p>
                </div>

                {/* The Track Container */}
                <div ref={trackRef} className="track-container" style={{ position: "relative", borderBottom: "2px dashed #333", display: "flex", alignItems: "flex-end" }}>

                    {/* The Van */}
                    <div ref={vanRef} className="van-wrapper" style={{ position: "absolute", left: "0", bottom: "-10px", zIndex: 10 }}>
                        <img src={vanImage} alt="Kaizen Car" className="journey-van-img" style={{ width: "100%", height: "auto", display: "block", position: "relative", zIndex: 1 }} />
                        {/* Tires - Static overlay moving with the van */}
                        <img
                            ref={tireBackRef}
                            src={tireBackImg}
                            alt="Back Tire"
                            className="journey-tire"
                            style={{
                                position: "absolute",
                                left: 0,
                                top: 0,
                                width: "100%",
                                height: "auto",
                                zIndex: 2,
                                display: "block"
                            }}
                        />
                        <img
                            ref={tireFrontRef}
                            src={tireFrontImg}
                            alt="Front Tire"
                            className="journey-tire"
                            style={{
                                position: "absolute",
                                left: 0,
                                top: 0,
                                width: "100%",
                                height: "auto",
                                zIndex: 2,
                                display: "block"
                            }}
                        />
                    </div>

                    {/* Milestones — 5 points */}
                    {copy.milestones.map((ms, i) => {
                        const iconRefs = [geoRef, lightningRef, handshakeRef, inspectionRef, guaranteeRef];
                        const icons = milestoneIcons;
                        const isFirst = i === 0;
                        return (
                            <div key={ms.key} className="milestone-marker" style={{ position: "absolute", left: markerPositions[i], bottom: "-1px", width: "12px", height: "12px", borderRadius: "50%", background: "#fff", transform: "translate(-50%, 50%)", zIndex: 20 }}>
                                <div className="journey-icon-wrap" style={{ position: "absolute", bottom: "25px", left: "50%", transform: "translateX(-50%)", textAlign: "center", display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
                                    <img ref={iconRefs[i]} src={icons[i]} alt={ms.title} style={{ width: "100%", height: "auto", display: "block" }} />
                                </div>
                                <div
                                    className="journey-text-wrap"
                                    style={{
                                        position: "absolute",
                                        top: "25px",
                                        left: isFirst && !isRTL ? "0" : "50%",
                                        right: isFirst && isRTL ? "0" : "auto",
                                        transform: isFirst ? "none" : "translateX(-50%)",
                                        textAlign: isFirst && !isRTL ? "left" : isFirst && isRTL ? "right" : "center",
                                        width: isRuLanguage ? "210px" : undefined
                                    }}
                                >
                                    <h4
                                        className="journey-title"
                                        style={{
                                            margin: "0 0 0.3rem 0",
                                            color: "#fff",
                                            whiteSpace: isRuLanguage ? "normal" : "nowrap",
                                            fontFamily: "'Montserrat', sans-serif",
                                            fontWeight: 600,
                                            fontSize: isRuLanguage ? "1.08rem" : undefined,
                                            lineHeight: isRuLanguage ? "1.18" : undefined
                                        }}
                                    >
                                        {ms.title}
                                    </h4>
                                    <p
                                        className="journey-desc"
                                        style={{
                                            color: "#888",
                                            margin: 0,
                                            lineHeight: "1.3",
                                            fontSize: isRuLanguage ? "0.96rem" : undefined
                                        }}
                                    >
                                        {ms.text}
                                    </p>
                                </div>
                            </div>
                        );
                    })}

                </div>
            </div>

        </div>
    );
}
