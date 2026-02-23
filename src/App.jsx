import React, { Suspense, lazy, useEffect, useRef, useState } from "react";
import { BeforeAfter } from "react-simple-before-after";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LumenCard } from "./components/LumenCard.jsx";
import { Sparkles } from "./components/Sparkles.jsx"; // Replaced SmokeOverlay
import { LogoMarquee } from "./components/LogoMarquee.jsx";
import JourneyMap from "./components/JourneyMap";
import LiquidGlassCard from "./components/LiquidGlassCard.jsx";
import Aurora from "./components/Aurora.jsx";
import CountUp from "./components/CountUp.jsx";
import ShinyText from "./components/ShinyText.jsx";
import MenuOverlay from "./components/MenuOverlay.jsx"; // New import
import MenuButton from "./components/MenuButton.jsx";   // New import
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

const BeholdFallback = ({
  message = "Instagram feed will appear here after you add your Behold feedId"
}) => <div className="widget-fallback">{message}</div>;

const ReviewsFallback = ({
  message = "Google reviews widget will appear here after you add your Featurable ID"
}) => <div className="widget-fallback">{message}</div>;

const BeholdWidget = lazy(() =>
  import("@behold/react")
    .then((mod) => ({
      default: mod.default || mod.BeholdWidget || BeholdFallback
    }))
    .catch(() => ({ default: BeholdFallback }))
);

const ReactGoogleReviews = lazy(() =>
  import("react-google-reviews")
    .then((mod) => ({
      default:
        mod.ReactGoogleReviews ||
        mod.GoogleReviews ||
        mod.default ||
        ReviewsFallback
    }))
    .catch(() => ({ default: ReviewsFallback }))
);

const ALTEGIO_WIDGET_SCRIPT = "https://w1414364.alteg.io/widgetJS";
const ALTEGIO_BOOKING_URL = "https://b1414364.alteg.io/";

const whyMobile = [
  {
    title: "Saving Time",
    text: "Handle your day while we work right at your home or office"
  },
  {
    title: "Transparency",
    text: "See every stage of the process with our on-site workflow"
  },
  {
    title: "Pro Equipment",
    text: "Fully equipped mobile units with premium chemistry"
  }
];

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
  kicker: { EN: "Packages", RU: "Пакеты", AR: "الباقات" },
  title: {
    EN: "Signature care. Find your package",
    RU: "Фирменный уход. Под любой уровень детейлинга.",
    AR: "عناية مميزة مصممة لكل مستوى تشطيب."
  },
  subtitle: {
    EN: "Choose your level of clean and protection",
    RU: "Выберите уровень чистоты и защиты.",
    AR: "اختر مستوى النظافة والحماية."
  },
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
    return adminPortfolioItems
      .map((item, index) => {
        const legacyParts = item.parts && typeof item.parts === "object"
          ? Object.values(item.parts)
          : [];
        const firstLegacyPart = legacyParts[0] || {};
        return {
          id: item.id || `portfolio-${index + 1}`,
          category: item.category || `Tab ${index + 1}`,
          before: item.before || item.firstImage || firstLegacyPart.before || "",
          after: item.after || item.secondImage || firstLegacyPart.after || "",
          title: item.title || item.modelTitle || DEFAULT_PORTFOLIO_META.title,
          description:
            item.description ||
            item.modelDescription ||
            item.subtitle ||
            DEFAULT_PORTFOLIO_META.description
        };
      })
      .filter((item) => item.category);
  }

  return Object.entries(portfolioData).map(([category, parts], index) => ({
    id: `${category}-${index + 1}`,
    category,
    before: parts?.Exterior?.before || "",
    after: parts?.Exterior?.after || "",
    title: DEFAULT_PORTFOLIO_META.title,
    description: DEFAULT_PORTFOLIO_META.description
  }));
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
      EN: ["10 scheduled services", "weeks of flawless condition", "Priority booking", "Personal detailing manager"],
      RU: ["10 запланированных услуг", "20 недель безупречного состояния", "Приоритетная запись", "Персональный менеджер"],
      AR: ["10 خدمات مجدولة", "20 أسبوعًا من الحالة المثالية", "أولوية الحجز", "مدير تفصيل شخصي"]
    }
  }
];

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
    services: { EN: "10 scheduled services", RU: "10 запланированных услуг", AR: "10 خدمات مجدولة" },
    weeks: { EN: "20 weeks of flawless condition", RU: "20 недель безупречного состояния", AR: "20 أسبوعًا من الحالة المثالية" }
  },
  closing: {
    EN: "Because a truly exceptional car is not cleaned occasionally.",
    RU: "Потому что по-настоящему исключительный автомобиль не моют изредка.",
    AR: "لأن السيارة الاستثنائية حقًا لا تُنظَّف أحيانًا."
  }
};

const certifiedBrands = [
  { name: "Koch Chemie", logo: "/koch.png" },
  { name: "Gyeon", logo: "/gyeon.png" },
  { name: "Sonax", logo: "/sonax.webp" },
  { name: "Vonixx", logo: "/vonixx.webp" }
];

const trustLinks = {
  // Replace with your exact Google Business Profile reviews link if you have it.
  googleReviews: "https://www.google.com/maps/search/?api=1&query=Kaizen%20Detailers%20Dubai%20reviews",
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
    EN: "Elite Detailing Services in UAE",
    RU: "Элитный Детейлинг Сервис в ОАЭ",
    AR: "خدمات ديتيلنج فاخرة في الإمارات"
  }
};

const reviewsFallbackCopy = {
  EN: "Google Reviews will appear here once the business profile is fully activated.",
  RU: "Google Reviews появятся здесь после полной активации бизнес-профиля.",
  AR: "ستظهر مراجعات Google هنا بعد تفعيل الملف التجاري بالكامل."
};

const DEFAULT_HERO_VIDEO = "/videoplayback.mp4";
const BACKUP_HERO_VIDEO = "/dubai.mp4";
const CRITICAL_SERVICE_ASSETS = [
  "/rolls1.webp",
  "/rolls2.webp",
  "/moto.webp",
  "/concord.webp",
  "/yacht.webp",
  "/home.png",
  "/questionmark.png"
];

function normalizeHeroVideoUrl(url) {
  if (typeof url !== "string") return "";
  const trimmed = url.trim();
  if (!trimmed || trimmed.startsWith("blob:")) return "";
  return trimmed;
}

function buildHeroVideoFallbackChain(adminUrl) {
  const preferred = normalizeHeroVideoUrl(adminUrl);
  return Array.from(new Set([preferred, DEFAULT_HERO_VIDEO, BACKUP_HERO_VIDEO].filter(Boolean)));
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
    line1: { EN: "Elite", RU: "Элитный", AR: "خدمات" },
    line2Part1: { EN: "Detailing", RU: "Детейлинг", AR: "ديتيلنج" },
    line2Part2: { EN: "Services", RU: "Сервис", AR: "فاخرة" },
    line3: { EN: "in UAE", RU: "в ОАЭ", AR: "في الإمارات" },
    title: {
      EN: "Right to your doorstep",
      RU: "Прямо к вашему порогу",
      AR: "حتى باب منزلك"
    },
    ctaQuickBook: { EN: "Book in 1 click", RU: "Записаться", AR: "احجز بنقرة واحدة" },
    ctaWhatsapp: { EN: "WhatsApp chat", RU: "WhatsApp чат", AR: "محادثة WhatsApp" }
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
      EN: "© 2026 Kaizen Detailers. All rights reserved.",
      RU: "© 2026 Kaizen Detailers. Все права защищены.",
      AR: "© 2026 Kaizen Detailers. جميع الحقوق محفوظة."
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

function getAdminData(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const rootRef = useRef(null);
  const portfolioViewerRef = useRef(null);
  const portfolioMetaRef = useRef(null);
  const trustSectionRef = useRef(null);
  const [language, setLanguage] = useState("EN");

  // Admin-managed data (falls back to hardcoded defaults)
  const adminHeroVideo = getAdminData("kaizen_admin_heroVideo", null);
  const adminPackages = getAdminData("kaizen_admin_packages", null);
  const adminPortfolio = getAdminData("kaizen_admin_portfolio", null);
  const portfolioConfig = normalizePortfolioConfig(adminPortfolio);
  const portfolioVisible = portfolioConfig.visible !== false;
  const [heroVideoSrc, setHeroVideoSrc] = useState(DEFAULT_HERO_VIDEO);
  const heroVideoFallbackChainRef = useRef([DEFAULT_HERO_VIDEO, BACKUP_HERO_VIDEO]);
  const portfolioItems = buildPortfolioItems(portfolioConfig.items);
  const hasPortfolioContent = portfolioVisible && portfolioItems.length > 0;
  // Per-service pricing: adminPackages is { auto: [...], moto: [...], ... } or old flat array
  const getPackagesForService = (serviceId) => {
    if (!adminPackages) return packages;
    if (Array.isArray(adminPackages)) return adminPackages; // old flat format
    return adminPackages[serviceId] || packages;
  };

  const [activePortfolioCategory, setActivePortfolioCategory] = useState(
    portfolioItems[0]?.category || "Sedan"
  );
  const [isPortfolioHovered, setIsPortfolioHovered] = useState(false);
  const [hasPortfolioInteracted, setHasPortfolioInteracted] = useState(false);
  const [openPackageIds, setOpenPackageIds] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [shouldLoadTrustWidgets, setShouldLoadTrustWidgets] = useState(false);
  const whatsappPhone = "971543720101";
  const whatsappMessageByLanguage = {
    EN: "Hi Kaizen Detailers! I would like to book mobile detailing in Dubai. Please help me choose the right package and nearest available time.",
    RU: "Здравствуйте, Kaizen Detailers! Хочу записаться на мобильный детейлинг в Дубае. Помогите выбрать подходящий пакет и ближайшее свободное время.",
    AR: "مرحبا فريق كايزن ديتيلرز! أرغب بحجز خدمة التلميع المتنقل في دبي. الرجاء مساعدتي في اختيار الباقة المناسبة وأقرب موعد متاح."
  };

  useEffect(() => {
    const fallbackChain = buildHeroVideoFallbackChain(adminHeroVideo?.url);
    heroVideoFallbackChainRef.current = fallbackChain;
    setHeroVideoSrc(fallbackChain[0] || DEFAULT_HERO_VIDEO);
  }, [adminHeroVideo?.url]);

  useEffect(() => {
    // Warm up key service assets so cards render instantly when section appears.
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
      return undefined;
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
    if (prefersReducedMotion) {
      return undefined;
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
        el.innerHTML = words
          .map(
            (word) =>
              `<span class="word"><span class="word-inner">${word}</span></span>`
          )
          .join(" ");
        el.dataset.splitSource = source;
      });

      gsap.utils.toArray(".reveal-block").forEach((block) => {
        const items = block.querySelectorAll(".reveal-item");
        const words = block.querySelectorAll(".word-inner");

        if (words.length) {
          gsap.set(words, { y: 18, opacity: 0, filter: "blur(6px)" });
        }
        if (items.length) {
          gsap.set(items, { y: 28, opacity: 0, filter: "blur(6px)" });
        }

        const tl = gsap.timeline({ paused: true });

        if (words.length) {
          tl.to(words, {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
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
              filter: "blur(0px)",
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
        // Trigger on the shared wrapper since wheel is now a sibling of sections
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
  }, [language]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const media = window.matchMedia("(max-width: 780px)");
    const syncViewport = () => setIsMobileViewport(media.matches);
    syncViewport();
    media.addEventListener("change", syncViewport);
    return () => media.removeEventListener("change", syncViewport);
  }, []);

  useEffect(() => {
    const langCode = language === "AR" ? "ar" : language.toLowerCase();
    const dir = language === "AR" ? "rtl" : "ltr";
    document.documentElement.setAttribute("lang", langCode);
    document.documentElement.setAttribute("dir", dir);
    document.body.setAttribute("dir", dir);
  }, [language]);

  useEffect(() => {
    // Hide WhatsApp button on the hero/header; reveal after user reaches the next section.
    // Also update header state
    const update = () => {
      const y =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
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
    if (!isLegalModalOpen) return undefined;
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

  const activePortfolioItem =
    portfolioItems.find((item) => item.category === activePortfolioCategory) ||
    portfolioItems[0] ||
    null;

  useEffect(() => {
    if (!portfolioViewerRef.current) return undefined;

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
    activePortfolioItem?.before,
    activePortfolioItem?.after,
    activePortfolioItem?.title,
    activePortfolioItem?.description
  ]);

  const isRTL = language === "AR";
  const t = (node) => node?.[language] || node?.EN || "";
  const whatsappMessage =
    whatsappMessageByLanguage[language] || whatsappMessageByLanguage.EN;
  const whatsappHref = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
    whatsappMessage
  )}`;
  const isGoogleReviewsReady = false;
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
    disabled: false
  };

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    if (window.yWidget?.show) return undefined;

    window.yWidgetSettings = {
      buttonAutoShow: false,
      showNewWidgetAutomatically: false
    };

    const scriptId = "altegio-widget-script";
    const existing = document.getElementById(scriptId);
    if (existing) return undefined;

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = ALTEGIO_WIDGET_SCRIPT;
    script.async = true;
    script.type = "text/javascript";
    script.charset = "UTF-8";
    document.body.appendChild(script);
    return undefined;
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

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
    if (typeof window === "undefined") return undefined;

    const assetsToWarm = [
      "/keizenCAR.png",
      "/keizenCARar.png",
      "/tireFront.png",
      "/tireBack.png",
      "/tireFrontar.png",
      "/tireBackar.png",
      "/crown3d.webp",
      "/diamond3d.webp",
      "/cam3d.webp",
      "/order3d.png",
      "/shield3d.png"
    ];

    const warm = () => {
      assetsToWarm.forEach((src) => {
        const img = new Image();
        img.decoding = "async";
        img.src = src;
        if (typeof img.decode === "function") {
          img.decode().catch(() => {});
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

  const handleOpenBooking = () => {
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
      if (window.yWidget?.show) {
        window.yWidget.show(ALTEGIO_BOOKING_URL);
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
    const sectionExtra =
      customExtra ?? NAV_SCROLL_EXTRA[sectionId] ?? 14;
    const headerOffset = (header?.offsetHeight || 92) + sectionExtra;
    const targetTop = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    window.scrollTo({
      top: Math.max(targetTop, 0),
      behavior: "smooth"
    });
  };

  const selectedServiceIndex = services.findIndex((service) => service.id === selectedServiceId);
  const mobilePricingInsertAfter =
    selectedServiceIndex >= 0
      ? Math.min(services.length - 1, (Math.floor(selectedServiceIndex / 3) + 1) * 3 - 1)
      : -1;

  const renderServicePricingSlide = () => (
    <div
      className={`pricing-slide ${selectedServiceId ? "open" : ""} ${selectedServiceId === "auto" ? "auto-selected" : ""} ${selectedServiceId === "motorhome" ? "motorhome-selected" : ""}`}
    >
      <div className="pricing-slide-inner">
        <div className="pricing-grid">
          {getPackagesForService(selectedServiceId).map((pack, packIndex) => {
            const title = pack.name[language] || pack.name.EN;
            const note = pack.note[language] || pack.note.EN;
            const highlights = pack.highlights[language] || pack.highlights.EN;
            const includes = pack.includes[language] || pack.includes.EN;
            const isOpen = openPackageIds.includes(pack.id);
            const panelId = `pack-${pack.id}-checklist`;

            return (
              <article
                key={pack.id}
                className={`pricing-card reveal-item ${pack.featured ? "featured" : ""}`}
                data-tier={pack.id}
              >
                <header className="pricing-card-top">
                  <div className="pricing-card-meta">
                    <h3>{title}</h3>
                    <p>{note}</p>
                  </div>
                  <div
                    className="pricing-card-price"
                    aria-label={t(uiCopy.accessibility.pricingAmount)}
                  >
                    <span className="pricing-amount">
                      <CountUp
                        from={0}
                        to={pack.price.amount}
                        separator=","
                        direction="up"
                        duration={1.12}
                        delay={packIndex * 0.08}
                        className="pricing-amount-value"
                        startCounting={!!selectedServiceId}
                      />
                    </span>
                    <span className="pricing-currency">{pack.price.currency}</span>
                  </div>
                </header>

                <div className="pricing-card-body">
                  <div className="pricing-label">
                    {pricingCopy.labels.highlights[language] ||
                      pricingCopy.labels.highlights.EN}
                  </div>
                  <ul className="pricing-highlights">
                    {highlights.map((item) => (
                      <li key={`${pack.id}-h-${item}`}>{item}</li>
                    ))}
                  </ul>

                  <div className={`pricing-accordion ${isOpen ? "open" : ""}`}>
                    <button
                      type="button"
                      className="pricing-accordion-trigger"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => {
                        setOpenPackageIds((prev) =>
                          prev.includes(pack.id)
                            ? prev.filter((id) => id !== pack.id)
                            : [...prev, pack.id]
                        );
                      }}
                    >
                      <span>
                        {pricingCopy.labels.fullChecklist[language] ||
                          pricingCopy.labels.fullChecklist.EN}
                      </span>
                      <span className="pricing-accordion-icon" aria-hidden="true">
                        ▾
                      </span>
                    </button>

                    <div
                      id={panelId}
                      className="pricing-accordion-panel"
                      aria-hidden={!isOpen}
                    >
                      <div className="pricing-accordion-inner">
                        <ul
                          className="pricing-checklist"
                          aria-label={t(uiCopy.accessibility.packageIncludes)}
                        >
                          {includes.map((item) => (
                            <li key={`${pack.id}-c-${item}`}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="page" ref={rootRef} dir={isRTL ? "rtl" : "ltr"} lang={language === "AR" ? "ar" : language.toLowerCase()}>
      <div className="grain" aria-hidden="true" />
      {/* Menu Overlay */}
      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        links={uiCopy.nav}
        language={language}
        onLanguageChange={setLanguage}
        uiCopy={uiCopy}
        onNavigateServices={() => {
          setIsMenuOpen(false);
          scrollToSection("services", NAV_SCROLL_EXTRA.services);
        }}
        onNavigatePricing={() => {
          setIsMenuOpen(false);
          setSelectedServiceId("auto");
          scrollToSection("services", NAV_SCROLL_EXTRA.servicesFromPricing);
        }}
        onNavigateMembership={() => {
          setIsMenuOpen(false);
          scrollToSection("pricing", NAV_SCROLL_EXTRA.membership);
        }}
        onNavigatePortfolio={() => {
          setIsMenuOpen(false);
          scrollToSection("portfolio", NAV_SCROLL_EXTRA.portfolio);
        }}
        showPortfolio={hasPortfolioContent}
      />

      <header className={`site-header ${isScrolled ? "scrolled" : ""}`}>
        <div className="header-inner">
          {/* Mobile: Burger Button (Left) */}
          <div className="mobile-only menu-btn-wrapper">
            <MenuButton isOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)} />
          </div>

          <div className="logo-block" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ cursor: "pointer" }} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter") window.scrollTo({ top: 0, behavior: "smooth" }); }}>
            <img src="/logo_white.svg" alt="Kaizen Detailers" />
            <img
              className="logo-wordmark"
              src="/kaizendetailing.png"
              alt="Kaizen Detailing"
            />
          </div>

          <nav className="nav-links desktop-only" aria-label={t(uiCopy.accessibility.primaryNav)}>
            <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>{t(uiCopy.nav.home)}</a>
            <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection("services", NAV_SCROLL_EXTRA.services); }}>{t(uiCopy.nav.services)}</a>
            <a href="#pricing" onClick={(e) => { e.preventDefault(); setSelectedServiceId("auto"); scrollToSection("services", NAV_SCROLL_EXTRA.servicesFromPricing); }}>{t(uiCopy.nav.pricing)}</a>
            <a href="#pricing" onClick={(e) => { e.preventDefault(); scrollToSection("pricing", NAV_SCROLL_EXTRA.membership); }}>{t(uiCopy.nav.membership)}</a>
            <a href="#why">{t(uiCopy.nav.aboutUs)}</a>
            {hasPortfolioContent ? (
              <a href="#portfolio" onClick={(e) => { e.preventDefault(); scrollToSection("portfolio", NAV_SCROLL_EXTRA.portfolio); }}>{t(uiCopy.nav.portfolio)}</a>
            ) : null}
            <a href="#trust">{t(uiCopy.nav.partners)}</a>
            <a href="#contact">{t(uiCopy.nav.contact)}</a>
          </nav>

          <div className="header-actions">
            <div
              className="lang-switch desktop-only"
              role="group"
              aria-label={t(uiCopy.accessibility.languageSwitcher)}
            >
              {["EN", "AR", "RU"].map((lang) => (
                <button
                  key={lang}
                  type="button"
                  className={language === lang ? "active" : ""}
                  onClick={() => setLanguage(lang)}
                >
                  {lang === "AR" ? "عربي" : lang}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleOpenBooking}
            >
              {t(uiCopy.nav.bookNow)}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <video
            className="hero-video"
            src={heroVideoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/dubai.png"
            onError={handleHeroVideoError}
          />
          <div className="hero-overlay" />

          {/* Aurora glow - right edge */}
          <div className="hero-aurora" aria-hidden="true">
            <Aurora
              colorStops={["#220000", "#ff3333", "#cc0000", "#220000"]}
              blend={0.8}
              amplitude={2}
              speed={0.5}
            />
          </div>

          <div className="hero-content">
            <div className="hero-copy">
              <h1 className={`hero-title hero-stagger ${language === "RU" ? "hero-title-ru" : ""}`}>
                <>
                  <span className="hero-line">
                    <ShinyText text={t(uiCopy.hero.line1)} {...sharedShinyHeadingProps} />
                  </span>
                  <span className="hero-line hero-italic">
                    <ShinyText text={t(uiCopy.hero.line2Part1)} {...sharedShinyHeadingProps} />
                  </span>
                  <span className="hero-line hero-italic">
                    <ShinyText text={t(uiCopy.hero.line2Part2)} {...sharedShinyHeadingProps} />
                  </span>
                  <span className="hero-line">
                    <ShinyText text={t(uiCopy.hero.line3)} {...sharedShinyHeadingProps} />
                    {" "}
                    <img src="/UAEflag.webp" alt="UAE" className="inline-flag hero-flag" />
                  </span>
                </>
              </h1>
            </div>
            <div className="hero-info hero-stagger">
              <h3>{t(uiCopy.hero.title)}</h3>
              <div className="hero-actions">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleOpenBooking}
                >
                  {t(uiCopy.hero.ctaQuickBook)}
                </button>
                <a
                  className="btn btn-ghost"
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t(uiCopy.hero.ctaWhatsapp)}
                </a>
              </div>
            </div>
          </div>
          <LogoMarquee ariaLabel={t(uiCopy.accessibility.brandMarquee)} />
        </section>

        <section className="section why reveal-block" id="why">
          {/* Replaced SmokeOverlay with Sparkles */}
          <Sparkles
            id="why-sparkles"
            background="transparent"
            minSize={0.6}
            size={1.5}
            opacity={0.5}
            speed={2.6}
            density={isMobileViewport ? 170 : 240}
            className="why-particles"
            direction="bottom"
            options={{
              fpsLimit: isMobileViewport ? 40 : 60,
              interactivity: {
                events: {
                  onClick: { enable: false },
                  onHover: { enable: false },
                  resize: true
                },
                modes: {
                  push: { quantity: 0 }
                }
              }
            }}
          />
          <div className="section-inner" style={{ maxWidth: "100%", padding: 0 }}>
            {/* Replaced Cards with Journey Animation */}
            <JourneyMap language={language} isRTL={isRTL} />
          </div>
        </section>

        {/* Shared background container for services and process */}
        <div className="services-process-wrapper" style={{ position: "relative", overflow: "visible" }}>
          <img
            className="services-wheel"
            src="/wheel.webp"
            alt=""
            aria-hidden="true"
          />

          <section className="section services reveal-block" id="services">
            <div className="section-inner">
              <div className="section-heading split">
                <div>
                  <h2 className="reveal-item">
                    <ShinyText
                      text={t(uiCopy.sectionTitles.services)}
                      {...sharedShinyHeadingProps}
                    />
                  </h2>
                </div>
              </div>
              <div className="services-grid">
                {services.map((service, index) => (
                  <React.Fragment key={service.id}>
                    <LumenCard
                      index={index}
                      title={service.title[language] || service.title.EN}
                      mobileTitle={service.mobileTitle?.[language] || service.mobileTitle?.EN}
                      soonLabel={t(uiCopy.common.soon)}
                      state={service.state}
                      icon={service.icon}
                      className="reveal-item"
                      isSelected={selectedServiceId === service.id}
                      onClick={() => {
                        if (service.state === "active") {
                          setSelectedServiceId(prev => prev === service.id ? null : service.id);
                        }
                      }}
                    />
                    {isMobileViewport && selectedServiceId && index === mobilePricingInsertAfter ? (
                      <div className="services-mobile-pricing-slot">
                        {renderServicePricingSlide()}
                      </div>
                    ) : null}
                  </React.Fragment>
                ))}
              </div>

              {/* Pricing slides out below the selected service */}
              {!isMobileViewport ? renderServicePricingSlide() : null}
            </div>
          </section>

          <section className="section process reveal-block" id="process">
            <div className="section-inner">
              <div className="section-heading">
                <h2 className="reveal-item">
                  <ShinyText
                    text={t(uiCopy.sectionTitles.process)}
                    {...sharedShinyHeadingProps}
                  />
                </h2>
              </div>
              <div className="process-cards">
                {processSteps.map((step) => (
                  <div key={step.id} className="process-card-new reveal-item">
                    <div
                      className="process-card-top"
                      style={{ backgroundImage: `url(${step.image})` }}
                    />
                    <div className="process-card-bottom">
                      <h3>{step.title[language] || step.title.EN}</h3>
                      <p>{step.text[language] || step.text.EN}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Pricing is now inside the services section above */}
        <div id="pricing" style={{ scrollMarginTop: "5rem" }} />

        <section className="section membership reveal-block" id="membership">
          <div className="section-inner">
            {/* Section heading — same style as Services, Portfolio, etc. */}
            <div className="section-heading">
              <h2 className="reveal-item">
                <ShinyText
                  text={t(membershipCopy.kicker)}
                  {...sharedShinyHeadingProps}
                />
              </h2>
            </div>

            {/* Headline */}
            <div className="membership-header">
              <h2 className="membership-headline reveal-item">
                {t(membershipCopy.headline)}<br />
                <span className="membership-headline-accent">{t(membershipCopy.headlineAccent)}</span>
              </h2>
            </div>

            {/* Body copy */}
            <div className="membership-body reveal-item">
              <p className="membership-intro">{t(membershipCopy.body)}</p>
              <p className="membership-schedule">{t(membershipCopy.schedule)}</p>
            </div>

            {/* Stats ribbon */}
            <div className="membership-stats reveal-item">
              <div className="membership-stat">
                <span className="membership-stat-number">10</span>
                <span className="membership-stat-label">{t(membershipCopy.stats.services)}</span>
              </div>
              <div className="membership-stat-divider" />
              <div className="membership-stat">
                <span className="membership-stat-number">20</span>
                <span className="membership-stat-label">{t(membershipCopy.stats.weeks)}</span>
              </div>
            </div>

            {/* Plan cards */}
            <div className="membership-plans-wrapper">
              <div className="membership-plans reveal-item">
                {membershipPlans.map((plan) => (
                  <article key={plan.id} className="membership-card" data-plan={plan.id}>
                    <div className="membership-card-icon">
                      {plan.id === "auto" ? (
                        <img src="/rolls1.webp" alt="" loading="lazy" decoding="async" style={{ width: 100, opacity: 0.8 }} />
                      ) : (
                        <img src="/moto.webp" alt="" loading="lazy" decoding="async" style={{ width: 90, opacity: 0.8 }} />
                      )}
                    </div>
                    <h3 className="membership-card-title">{t(plan.title)}</h3>
                    <div className="membership-card-price">
                      <span className="membership-price-amount">
                        <CountUp from={0} to={plan.price.amount} separator="," direction="up" duration={1.2} className="membership-price-value" startCounting />
                      </span>
                      <span className="membership-price-currency">{plan.price.currency}</span>
                    </div>
                    <ul className="membership-card-perks">
                      {(plan.perks[language] || plan.perks.EN).map((perk) => (
                        <li key={perk}>{perk}</li>
                      ))}
                    </ul>
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary membership-card-btn"
                    >
                      {t(uiCopy.nav.bookNow)}
                    </a>
                  </article>
                ))}
              </div>
              <div className="membership-image-container reveal-item desktop-only">
                <div className="membership-infinity-group">
                  <img
                    className="membership-infinity-base"
                    src="/infinite.webp"
                    alt="Infinite Membership"
                  />
                  <span
                    className="membership-infinity-overlay"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>

            {/* Closing line */}
            <p className="membership-closing reveal-item">{t(membershipCopy.closing)}</p>
          </div>
        </section>

        {hasPortfolioContent ? (
          <section className="section portfolio reveal-block" id="portfolio">
            <div className="section-inner">
              <div className="section-heading">
                <h2 className="reveal-item portfolio-title">
                  <ShinyText
                    text={t(uiCopy.sectionTitles.portfolio)}
                    {...sharedShinyHeadingProps}
                  />
                </h2>
              </div>

              <div className="portfolio-content reveal-item">
                <div className="portfolio-main">
                  {/* Folder Tabs */}
                  <div className="portfolio-tabs">
                    {portfolioCategoryOrder.map((cat) => (
                      <button
                        key={cat}
                        className={`portfolio-tab ${activePortfolioCategory === cat ? "active" : ""}`}
                        onClick={() => setActivePortfolioCategory(cat)}
                        aria-pressed={activePortfolioCategory === cat}
                      >
                        {uiCopy.portfolio.categories?.[cat]
                          ? t(uiCopy.portfolio.categories[cat])
                          : cat}
                      </button>
                    ))}
                  </div>

                  {/* Viewer Window */}
                  <div
                    ref={portfolioViewerRef}
                    className={`portfolio-viewer ${isPortfolioHovered ? "active" : ""} ${hasPortfolioInteracted ? "revealed" : ""}`}
                    onMouseEnter={() => {
                      setIsPortfolioHovered(true);
                      setHasPortfolioInteracted(true);
                    }}
                    onMouseLeave={() => setIsPortfolioHovered(false)}
                  >
                    <div className="viewer-blur-wrapper" dir="ltr">
                      <BeforeAfter
                        key={`${activePortfolioCategory}-${activePortfolioItem?.before || ""}`}
                        beforeImage={activePortfolioItem?.before || ""}
                        afterImage={activePortfolioItem?.after || ""}
                      />
                    </div>

                    <div
                      className="viewer-overlay"
                      style={{ opacity: hasPortfolioInteracted ? 0 : 1, pointerEvents: "none" }}
                    >
                      <div className="drag-hint">
                        <div className="drag-icon">↔</div>
                        <span>{t(uiCopy.portfolio.dragHint)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="portfolio-sidebar">
                  <div ref={portfolioMetaRef} className="portfolio-meta">
                    <h4>{activePortfolioItem?.title || DEFAULT_PORTFOLIO_META.title}</h4>
                    <p>{activePortfolioItem?.description || DEFAULT_PORTFOLIO_META.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        <section ref={trustSectionRef} className="section trust reveal-block" id="trust">
          <div className="trust-aurora" aria-hidden="true">
            <Aurora
              colorStops={["#121212", "#fa0000", "#0a0a0a"]}
              blend={0.5}
              amplitude={1.0}
              speed={1}
            />
            <div className="trust-aurora-fade" />
          </div>
          <div className="section-inner trust-layout">
            {/* Header */}
            <div className="trust-header">
              <h2 className="reveal-item">
                <ShinyText
                  text={t(uiCopy.sectionTitles.trust)}
                  {...sharedShinyHeadingProps}
                />
              </h2>
              <p className="section-subtitle reveal-item">
                {t(uiCopy.sectionTitles.trustSubtitle)}
              </p>
              <div className="trust-apps reveal-item">
                <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className="app-badge">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" /></svg>
                  App Store
                </a>
                <a href="https://play.google.com" target="_blank" rel="noopener noreferrer" className="app-badge">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.18 23.67c-.38-.2-.68-.6-.68-1.15V1.48c0-.55.3-.95.68-1.15l11.6 11.67L3.18 23.67zM15.73 15.5l-2.93-2.95 2.93-2.95 3.34 1.9c.95.54.95 1.56 0 2.1l-3.34 1.9zM12.03 11.78L4.14.72l10.82 6.15-2.93 4.91zM4.14 23.28l7.89-11.06 2.93 2.95-10.82 8.11z" /></svg>
                  Google Play
                </a>
                <a href="https://www.tiktok.com/@kaizen_detailers_uae" target="_blank" rel="noopener noreferrer" className="app-badge">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.17a8.16 8.16 0 004.76 1.53V7.25a4.82 4.82 0 01-1-.56z" /></svg>
                  TikTok
                </a>
                <a href="https://www.snapchat.com/add/kaizen_detailers" target="_blank" rel="noopener noreferrer" className="app-badge">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.07 2c2.76 0 4.39 1.86 4.85 3.78.24 1.01.16 2.02.08 2.86l-.04.39c-.02.21-.04.41-.04.57 0 .3.13.48.42.6.23.1.48.14.72.18l.14.03c.65.13 1.38.28 1.87.69.32.27.48.62.44 1-.07.65-.76 1.06-1.42 1.33-.09.04-.18.07-.26.11-.56.23-1.08.5-1.16.93-.03.17 0 .35.1.53.67 1.15 1.55 2.07 2.62 2.74.36.22.75.39 1.11.5.38.12.55.38.5.73-.07.42-.52.72-.86.87-.52.23-1.07.35-1.52.55-.17.08-.32.2-.45.38-.22.28-.24.63-.41.95-.2.37-.56.63-1.05.63-.32 0-.66-.1-1.05-.24-.6-.22-1.28-.47-2.28-.36-.93.1-1.57.5-2.14.86-.6.38-1.16.73-1.92.73h-.05c-.76 0-1.33-.36-1.92-.73-.57-.36-1.21-.76-2.14-.86-1-.11-1.68.14-2.28.36-.39.14-.73.24-1.05.24-.54 0-.87-.31-1.05-.63-.17-.32-.19-.67-.41-.95-.13-.18-.28-.3-.45-.38-.45-.2-1-.32-1.52-.55-.34-.15-.79-.45-.86-.87-.05-.35.12-.61.5-.73.36-.11.75-.28 1.11-.5 1.07-.67 1.95-1.59 2.62-2.74.1-.18.13-.36.1-.53-.08-.43-.6-.7-1.16-.93-.08-.04-.17-.07-.26-.11-.66-.27-1.35-.68-1.42-1.33-.04-.38.12-.73.44-1 .49-.41 1.22-.56 1.87-.69l.14-.03c.24-.04.49-.08.72-.18.29-.12.42-.3.42-.6 0-.16-.02-.36-.04-.57l-.04-.39c-.08-.84-.16-1.85.08-2.86C7.68 3.86 9.31 2 12.07 2z" /></svg>
                  Snapchat
                </a>
              </div>
            </div>

            {/* Widgets Row: Google Reviews (left) + Instagram (right) */}
            <div className="trust-widgets reveal-item">
              <div className="social-block">
                <h3 className="social-title">
                  <a
                    className="social-title-link"
                    href={trustLinks.googleReviews}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t(uiCopy.trust.openGoogle)}
                  >
                    <span>{t(uiCopy.trust.googleReviews)}</span>
                    <span className="social-arrow" aria-hidden="true">
                      →
                    </span>
                  </a>
                </h3>
                <div className="social-body">
                  {shouldLoadTrustWidgets ? (
                    isGoogleReviewsReady ? (
                      <Suspense
                        fallback={<ReviewsFallback message={t(uiCopy.widget.reviewsLoading)} />}
                      >
                        <ReactGoogleReviews
                          layout="carousel"
                          featurableId="featurable-b1506bd1-b1ca-442e-b4b1-95314643ba77"
                          maxItems={5}
                          carouselSpeed={3200}
                        />
                      </Suspense>
                    ) : (
                      <div className="widget-fallback widget-fallback-premium">
                        {reviewsFallbackCopy[language] || reviewsFallbackCopy.EN}
                      </div>
                    )
                  ) : (
                    <Suspense
                      fallback={<ReviewsFallback message={t(uiCopy.widget.reviewsLoading)} />}
                    >
                      <ReviewsFallback
                        message={reviewsFallbackCopy[language] || reviewsFallbackCopy.EN}
                      />
                    </Suspense>
                  )}
                </div>
              </div>

              <div className="social-block">
                <h3 className="social-title">
                  <a
                    className="social-title-link"
                    href={trustLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t(uiCopy.trust.openInstagram)}
                  >
                    <span>{t(uiCopy.trust.instagram)}</span>
                    <span className="social-arrow" aria-hidden="true">
                      →
                    </span>
                  </a>
                </h3>
                <div className="social-body">
                  {shouldLoadTrustWidgets ? (
                    <Suspense
                      fallback={<BeholdFallback message={t(uiCopy.widget.beholdLoading)} />}
                    >
                      <BeholdWidget feedId="MB3EebWs3lODSKN5ljWY" />
                    </Suspense>
                  ) : (
                    <BeholdFallback message={t(uiCopy.widget.beholdLoading)} />
                  )}
                </div>
              </div>
            </div>

            {/* Brands Row */}
            <div className="trust-brands reveal-item">
              <h3>{t(uiCopy.trust.certifiedProducts)}</h3>
              <div className="brands-row">
                {certifiedBrands.map((brand) => (
                  <div key={brand.name} className="brand-mark">
                    <img src={brand.logo} alt={brand.name} loading="lazy" decoding="async" />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        <section className="section coverage" id="coverage">
          <div className="coverage-overlay-copy">
            <h2 className="coverage-title">
              <ShinyText
                text={coverageCopy.titleLine1[language] || coverageCopy.titleLine1.EN}
                {...sharedShinyHeadingProps}
              />
              <br />
              <ShinyText
                text={coverageCopy.titleLine2[language] || coverageCopy.titleLine2.EN}
                {...sharedShinyHeadingProps}
              />
            </h2>
            <p className="section-subtitle coverage-subtitle">
              {coverageCopy.subtitle[language] || coverageCopy.subtitle.EN} <img src="/UAEflag.webp" alt="UAE" className="inline-flag coverage-flag" />
            </p>
          </div>
          <div className="coverage-bleed">
            <div className="coverage-map-stack">
              <img className="coverage-map-base" src="/map.png" alt="" loading="lazy" decoding="async" />
              <div className="coverage-zone zone-abu" />
              <div className="coverage-zone zone-dubai" />
              <div className="coverage-zone zone-sharjah" />
              <div className="coverage-fade" />
              <div className="coverage-edge-markers" aria-hidden="true">
                {coverageEdgeMarkers.map((marker) => (
                  <div
                    key={marker.id}
                    className={`coverage-edge-marker coverage-edge-marker-${marker.id}`}
                    style={{
                      left: `${marker.x}%`,
                      top: `${marker.y}%`,
                      "--label-offset-x": `${marker.textOffsetX}px`,
                      "--label-offset-y": `${marker.textOffsetY}px`,
                      "--dot-size": `${marker.dotSize}px`,
                      "--label-size": `${marker.textSize}rem`
                    }}
                  >
                    <span className="coverage-edge-dot" />
                    <span className="coverage-edge-name">
                      {t(uiCopy.coverage.markers[marker.id])}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer" id="contact">
        <div className="footer-top">
          <div className="footer-top-brand">
            <img src="/logo_white.svg" alt="Kaizen Detailers" loading="lazy" decoding="async" />
          </div>
          <p>
            {t(uiCopy.footer.text)}
          </p>
        </div>
        <div className="footer-grid">
          <div>
            <h4>{t(uiCopy.footer.contact)}</h4>
            <p>
              <span className="footer-contact-label">Phone: </span>
              +971 54 372 0101
            </p>
            <p className="footer-email">
              <span className="footer-contact-label">Email: </span>
              <a href="mailto:kaizen.detailers.uae@gmail.com">kaizen.detailers.uae@gmail.com</a>
            </p>
          </div>
          <div>
            <h4>{t(uiCopy.footer.social)}</h4>
            <div className="footer-social-links">
              <a href={trustLinks.instagram} target="_blank" rel="noopener noreferrer">
                {t(uiCopy.trust.instagram)}
              </a>
              <a href="https://www.tiktok.com/@kaizen.detailers?_r=1&_t=ZS-943NjVkSflk" target="_blank" rel="noopener noreferrer">
                TikTok
              </a>
              <a href="https://snapchat.com/t/HEebtCIy" target="_blank" rel="noopener noreferrer">
                Snapchat
              </a>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                {t(uiCopy.footer.whatsapp)}
              </a>
            </div>
          </div>
          <div>
            <h4>{t(uiCopy.footer.legal)}</h4>
            <button
              type="button"
              className="footer-link-btn"
              onClick={() => setIsLegalModalOpen(true)}
            >
              {t(uiCopy.footer.legalInfo)}
            </button>
          </div>
        </div>
        <div className="footer-bottom">
          <span>{t(uiCopy.footer.rights)}</span>
        </div>
      </footer>

      {isLegalModalOpen ? (
        <div
          className="legal-modal-backdrop"
          role="presentation"
          onClick={() => setIsLegalModalOpen(false)}
        >
          <div
            className="legal-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="legal-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="legal-modal-close"
              aria-label={t(uiCopy.accessibility.closeDialog)}
              onClick={() => setIsLegalModalOpen(false)}
            >
              ×
            </button>
            <h3 id="legal-modal-title">{t(uiCopy.footer.legalTitle)}</h3>
            <p>{t(uiCopy.footer.legalBody)}</p>
          </div>
        </div>
      ) : null}

      {/* Floating WhatsApp Button */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className={`whatsapp-float${isScrolled ? " is-visible" : ""}`}
        aria-label="WhatsApp"
      >
        <img src="/whatsapp.svg" alt="WhatsApp" />
      </a>
    </div>
  );
}
