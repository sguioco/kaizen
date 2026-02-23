import React, { useState, useEffect } from "react";
import "../admin.css";

const ADMIN_PASSWORD = "DetailersK00";
const STORAGE_KEYS = {
  heroVideo: "kaizen_admin_heroVideo",
  packages: "kaizen_admin_packages",
  portfolio: "kaizen_admin_portfolio",
};

function useAdminData(key, defaultValue) {
  const [data, setData] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  const save = (newData) => {
    setData(newData);
    localStorage.setItem(key, JSON.stringify(newData));
  };

  return [data, save];
}

/* ── Hero Video Tab ─────────────────────────────────── */
function HeroVideoEditor() {
  const [video, setVideo] = useAdminData(STORAGE_KEYS.heroVideo, {
    url: "/videoplayback.mp4",
  });
  const [draft, setDraft] = useState(video.url);
  const [file, setFile] = useState(null);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setVideo({ url: draft });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    const objectUrl = URL.createObjectURL(f);
    setDraft(objectUrl);
  };

  return (
    <div className="admin-section">
      <h3>Hero Video</h3>
      <p className="admin-hint">Enter a URL or upload a video file for the hero section.</p>

      <label className="admin-label">Video URL</label>
      <input
        type="text"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        className="admin-input"
        placeholder="/videoplayback.mp4 or https://..."
      />

      <label className="admin-label" style={{ marginTop: "1rem" }}>Or upload file</label>
      <input type="file" accept="video/*" onChange={handleFile} className="admin-file" />

      {draft && (
        <div className="admin-preview" style={{ marginTop: "1rem" }}>
          <video src={draft} controls muted style={{ width: "100%", maxWidth: 480, borderRadius: 8 }} />
        </div>
      )}

      <button className="admin-btn" onClick={handleSave}>
        {saved ? "Saved!" : "Save"}
      </button>
    </div>
  );
}

/* ── Pricing Editor Tab ─────────────────────────────── */
const defaultPackages = [
  {
    id: "silver",
    name: { EN: "Silver", RU: "Серебро", AR: "الفضي" },
    note: { EN: "Essential clean with wax + leather care", RU: "Базовая чистка + воск и уход за кожей", AR: "تنظيف أساسي مع شمع وعناية بالجلد" },
    price: { amount: 699, currency: "AED" },
    featured: false,
    highlights: {
      EN: ["Two-stage wash + wax", "Wheels & rims", "Interior Tornador + vacuum", "Leather cleaned + protected"],
      RU: ["Двухфазная мойка + воск", "Диски и колёса", "Салон: Tornador + пылесос", "Кожа: чистка и защита"],
      AR: ["غسيل ثنائي + شمع", "الجنوط والعجلات", "الداخلية: Tornador + مكنسة", "تنظيف الجلد وحمايته"]
    },
    includes: {
      EN: ["Two-stage wash + wax sealant", "Wheels & rims cleaned", "Interior refresh (Tornador + vacuum)", "Seats, upholstery & mats cleaned", "Leather cleaned + protected"],
      RU: ["Двухфазная мойка + воск", "Чистка дисков и колёс", "Чистка салона (Tornador + пылесос)", "Сиденья, обивка и коврики: чистка", "Кожа: чистка и защита"],
      AR: ["غسيل ثنائي المراحل مع شمع حماية", "تنظيف الجنوط والعجلات", "تنظيف داخلي (Tornador + مكنسة)", "تنظيف المقاعد والتنجيد والحصائر", "تنظيف الجلد وحمايته"]
    }
  },
  {
    id: "gold",
    name: { EN: "Gold", RU: "Золото", AR: "الذهبي" },
    note: { EN: "Deep detail + correction and UV protection", RU: "Глубокий детейлинг + полировка и UV-защита", AR: "تنظيف عميق مع تلميع وحماية من UV" },
    price: { amount: 1099, currency: "AED" },
    featured: true,
    highlights: {
      EN: ["Deep interior + mats detail", "Wheels deep clean", "Scratch-refinement polish", "UV protection + water-spot removal"],
      RU: ["Глубокая чистка салона и ковриков", "Глубокая чистка колёс", "Полировка от мелких царапин", "UV-защита + удаление водных пятен"],
      AR: ["تنظيف داخلي عميق مع الحصائر", "تنظيف عميق للعجلات", "تلميع للخدوش السطحية", "حماية UV مع إزالة بقع الماء"]
    },
    includes: {
      EN: ["Two-stage wash", "Deep wheels & rims detail", "Deep interior + mats detail", "Leather deep clean + UV shield", "Scratch-refinement polish", "Water-spot removal", "High-gloss wax sealant", "Interior plastics cleaned + UV protection", "Final quality inspection"],
      RU: ["Двухфазная мойка", "Глубокая чистка дисков и колёс", "Глубокая чистка салона и ковриков", "Кожа: глубокая чистка + UV-защита", "Полировка от мелких царапин", "Удаление водных пятен и известкового налёта", "Воск: глубокий блеск и защита", "Пластик в салоне: чистка + UV-защита", "Финальный контроль качества"],
      AR: ["غسيل ثنائي المراحل", "تنظيف عميق للجنوط والعجلات", "تنظيف داخلي عميق مع الحصائر", "تنظيف عميق للجلد مع حماية من UV", "تلميع لإزالة خدوش سطحية", "إزالة بقع الماء وآثار الكلس", "شمع لمعان عميق وحماية للطلاء", "تنظيف بلاستيك المقصورة مع حماية من UV", "فحص نهائي وضمان الجودة"]
    }
  },
  {
    id: "platinum",
    name: { EN: "Platinum", RU: "Платина", AR: "البلاتيني" },
    note: { EN: "Full correction + ceramic coating", RU: "Полная полировка + керамика", AR: "تصحيح كامل مع طلاء سيراميك" },
    price: { amount: 1299, currency: "AED" },
    featured: false,
    highlights: {
      EN: ["Everything in Gold", "Tar + brake-dust removal", "Full-body machine polish", "Ceramic coating"],
      RU: ["Всё из пакета «Золото»", "Удаление битума и тормозной пыли", "Полировка кузова", "Керамическое покрытие"],
      AR: ["كل ما في الباقة الذهبية", "إزالة القطران وغبار الفرامل", "تلميع كامل للهيكل", "طلاء سيراميك"]
    },
    includes: {
      EN: ["Everything in Gold", "Hand decontamination wash", "Tar & brake-dust removal", "Full-body machine polish", "Ceramic coating application", "Final quality inspection"],
      RU: ["Всё из пакета «Золото»", "Глубокая ручная чистка кузова", "Удаление битума и налёта тормозной пыли", "Полировка кузова", "Нанесение керамики", "Финальный контроль качества"],
      AR: ["كل ما في الباقة الذهبية", "تنظيف يدوي عميق للهيكل", "إزالة القطران وبقايا غبار الفرامل", "تلميع كامل للهيكل", "تطبيق طلاء سيراميك", "فحص نهائي وضمان الجودة"]
    }
  }
];

function PackageEditor({ pkg, onChange, onRemove, canRemove }) {
  const [lang, setLang] = useState("EN");

  const updateField = (field, value) => {
    onChange({ ...pkg, [field]: value });
  };

  const updateLangField = (field, value) => {
    onChange({ ...pkg, [field]: { ...pkg[field], [lang]: value } });
  };

  const updateListItem = (field, index, value) => {
    const list = [...(pkg[field][lang] || [])];
    list[index] = value;
    onChange({ ...pkg, [field]: { ...pkg[field], [lang]: list } });
  };

  const addListItem = (field) => {
    const list = [...(pkg[field][lang] || []), ""];
    onChange({ ...pkg, [field]: { ...pkg[field], [lang]: list } });
  };

  const removeListItem = (field, index) => {
    const list = (pkg[field][lang] || []).filter((_, i) => i !== index);
    onChange({ ...pkg, [field]: { ...pkg[field], [lang]: list } });
  };

  return (
    <div className="admin-package-card">
      <div className="admin-package-header">
        <h4>{pkg.name.EN} ({pkg.id})</h4>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {canRemove && (
            <button className="admin-btn-sm admin-btn-danger" onClick={onRemove}>Remove</button>
          )}
          <div className="admin-lang-tabs">
            {["EN", "RU", "AR"].map(l => (
              <button key={l} className={`admin-lang-tab ${lang === l ? "active" : ""}`} onClick={() => setLang(l)}>{l}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="admin-row">
        <div>
          <label className="admin-label">ID</label>
          <input className="admin-input" value={pkg.id || ""} onChange={e => updateField("id", e.target.value)} />
        </div>
        <div>
          <label className="admin-label">Name ({lang})</label>
          <input className="admin-input" value={pkg.name[lang] || ""} onChange={e => updateLangField("name", e.target.value)} />
        </div>
        <div>
          <label className="admin-label">Price (AED)</label>
          <input className="admin-input" type="number" value={pkg.price.amount} onChange={e => updateField("price", { ...pkg.price, amount: Number(e.target.value) })} />
        </div>
      </div>

      <label className="admin-label">Note ({lang})</label>
      <input className="admin-input" value={pkg.note[lang] || ""} onChange={e => updateLangField("note", e.target.value)} />

      <label className="admin-label">Featured</label>
      <label className="admin-checkbox">
        <input type="checkbox" checked={pkg.featured} onChange={e => updateField("featured", e.target.checked)} />
        Mark as featured (gold border)
      </label>

      <label className="admin-label" style={{ marginTop: "1rem" }}>Highlights ({lang})</label>
      {(pkg.highlights[lang] || []).map((item, i) => (
        <div key={i} className="admin-list-row">
          <input className="admin-input" value={item} onChange={e => updateListItem("highlights", i, e.target.value)} />
          <button className="admin-btn-sm admin-btn-danger" onClick={() => removeListItem("highlights", i)}>x</button>
        </div>
      ))}
      <button className="admin-btn-sm" onClick={() => addListItem("highlights")}>+ Add highlight</button>

      <label className="admin-label" style={{ marginTop: "1rem" }}>Full checklist ({lang})</label>
      {(pkg.includes[lang] || []).map((item, i) => (
        <div key={i} className="admin-list-row">
          <input className="admin-input" value={item} onChange={e => updateListItem("includes", i, e.target.value)} />
          <button className="admin-btn-sm admin-btn-danger" onClick={() => removeListItem("includes", i)}>x</button>
        </div>
      ))}
      <button className="admin-btn-sm" onClick={() => addListItem("includes")}>+ Add item</button>
    </div>
  );
}

const SERVICE_CATEGORIES = [
  { id: "auto", label: "Auto detailing" },
  { id: "moto", label: "Moto detailing" },
  { id: "motorhome", label: "Motorhome detailing" },
  { id: "yacht", label: "Yacht detailing" },
  { id: "home", label: "Home & Office detailing" },
];

function buildDefaultByService() {
  const map = {};
  SERVICE_CATEGORIES.forEach(s => {
    map[s.id] = JSON.parse(JSON.stringify(defaultPackages));
  });
  return map;
}

function createEmptyPackage() {
  const uniqueId = `package-${Date.now()}`;
  return {
    id: uniqueId,
    name: { EN: "New package", RU: "Новый пакет", AR: "باقة جديدة" },
    note: { EN: "", RU: "", AR: "" },
    price: { amount: 0, currency: "AED" },
    featured: false,
    highlights: { EN: [], RU: [], AR: [] },
    includes: { EN: [], RU: [], AR: [] }
  };
}

function PricingEditor() {
  const [allPricing, setAllPricing] = useAdminData(STORAGE_KEYS.packages, buildDefaultByService());
  const [activeService, setActiveService] = useState("auto");
  const [saved, setSaved] = useState(false);

  // Migration: if old flat array format is stored, convert to per-service
  const pricing = (() => {
    if (Array.isArray(allPricing)) {
      // Old format — wrap into per-service
      const migrated = buildDefaultByService();
      SERVICE_CATEGORIES.forEach(s => { migrated[s.id] = JSON.parse(JSON.stringify(allPricing)); });
      return migrated;
    }
    // Ensure every service has an entry
    const result = { ...allPricing };
    SERVICE_CATEGORIES.forEach(s => {
      if (!result[s.id]) result[s.id] = JSON.parse(JSON.stringify(defaultPackages));
    });
    return result;
  })();

  const currentPackages = pricing[activeService] || defaultPackages;

  const updatePackage = (index, updated) => {
    const next = [...currentPackages];
    next[index] = updated;
    const newPricing = { ...pricing, [activeService]: next };
    setAllPricing(newPricing);
  };

  const addPackage = () => {
    const next = [...currentPackages, createEmptyPackage()];
    const newPricing = { ...pricing, [activeService]: next };
    setAllPricing(newPricing);
  };

  const removePackage = (index) => {
    if (currentPackages.length <= 1) return;
    if (!window.confirm("Remove this package?")) return;
    const next = currentPackages.filter((_, i) => i !== index);
    const newPricing = { ...pricing, [activeService]: next };
    setAllPricing(newPricing);
  };

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEYS.packages, JSON.stringify(pricing));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (window.confirm(`Reset pricing for "${SERVICE_CATEGORIES.find(s => s.id === activeService)?.label}" to defaults?`)) {
      const newPricing = { ...pricing, [activeService]: JSON.parse(JSON.stringify(defaultPackages)) };
      setAllPricing(newPricing);
      localStorage.setItem(STORAGE_KEYS.packages, JSON.stringify(newPricing));
    }
  };

  const handleResetAll = () => {
    if (window.confirm("Reset ALL service pricing to defaults?")) {
      const def = buildDefaultByService();
      setAllPricing(def);
      localStorage.setItem(STORAGE_KEYS.packages, JSON.stringify(def));
    }
  };

  return (
    <div className="admin-section">
      <h3>Pricing Packages</h3>
      <p className="admin-hint">Select a service category, then edit its packages. Each service has its own Silver / Gold / Platinum pricing.</p>

      <div className="admin-service-tabs">
        {SERVICE_CATEGORIES.map(s => (
          <button
            key={s.id}
            className={`admin-service-tab ${activeService === s.id ? "active" : ""}`}
            onClick={() => setActiveService(s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>

      {currentPackages.map((pkg, i) => (
        <PackageEditor
          key={`${activeService}-${pkg.id}-${i}`}
          pkg={pkg}
          onChange={(updated) => updatePackage(i, updated)}
          onRemove={() => removePackage(i)}
          canRemove={currentPackages.length > 1}
        />
      ))}

      <div className="admin-actions">
        <button className="admin-btn admin-btn-outline" onClick={addPackage}>
          + Add package
        </button>
        <button className="admin-btn" onClick={handleSave}>
          {saved ? "Saved!" : "Save all packages"}
        </button>
        <button className="admin-btn admin-btn-outline" onClick={handleReset}>
          Reset this service
        </button>
        <button className="admin-btn admin-btn-outline" onClick={handleResetAll}>
          Reset all services
        </button>
      </div>
    </div>
  );
}

/* ── Portfolio Manager Tab ──────────────────────────── */
const defaultPortfolio = [
  {
    id: "1",
    category: "Sedan",
    title: "BMW M8 2023",
    description: "Premium full-body detailing & protection",
    before: "https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=1400&auto=format&fit=crop",
    after: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1400&auto=format&fit=crop"
  }
];

function normalizePortfolioItems(items) {
  if (!Array.isArray(items)) return defaultPortfolio;
  return items.map((item, index) => {
    const legacyParts = item.parts && typeof item.parts === "object"
      ? Object.values(item.parts)
      : [];
    const firstLegacyPart = legacyParts[0] || {};
    return {
      id: item.id || String(Date.now() + index),
      category: item.category || `Tab ${index + 1}`,
      title: item.title || item.modelTitle || "BMW M8 2023",
      description: item.description || item.modelDescription || item.subtitle || "Premium full-body detailing & protection",
      before: item.before || item.firstImage || firstLegacyPart.before || "",
      after: item.after || item.secondImage || firstLegacyPart.after || ""
    };
  });
}

function normalizePortfolioConfig(rawValue) {
  if (rawValue && typeof rawValue === "object" && !Array.isArray(rawValue)) {
    return {
      visible: rawValue.visible !== false,
      items: normalizePortfolioItems(rawValue.items)
    };
  }

  return {
    visible: true,
    items: normalizePortfolioItems(rawValue)
  };
}

async function fileToOptimizedDataUrl(file, { maxWidth = 1600, quality = 0.82 } = {}) {
  const objectUrl = URL.createObjectURL(file);
  try {
    const img = await new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = objectUrl;
    });

    const ratio = img.width > maxWidth ? maxWidth / img.width : 1;
    const targetWidth = Math.max(1, Math.round(img.width * ratio));
    const targetHeight = Math.max(1, Math.round(img.height * ratio));

    const canvas = document.createElement("canvas");
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

    const isPng = file.type === "image/png";
    const mimeType = isPng ? "image/png" : "image/jpeg";
    return canvas.toDataURL(mimeType, quality);
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

function PortfolioItemEditor({ item, onChange, onRemove }) {
  const [uploadingField, setUploadingField] = useState(null);

  const updateField = (field, value) => {
    onChange({ ...item, [field]: value });
  };

  const handleImageUpload = async (field, event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      window.alert("Please select an image file.");
      return;
    }

    try {
      setUploadingField(field);
      const optimizedDataUrl = await fileToOptimizedDataUrl(file);
      updateField(field, optimizedDataUrl);
    } catch {
      window.alert("Failed to process image. Please try another file.");
    } finally {
      setUploadingField(null);
      event.target.value = "";
    }
  };

  return (
    <div className="admin-portfolio-card">
      <div className="admin-portfolio-header">
        <h4>{item.category || "New tab"}</h4>
        <button className="admin-btn-sm admin-btn-danger" onClick={onRemove}>Remove</button>
      </div>

      <label className="admin-label">Tab name (top button)</label>
      <input
        className="admin-input"
        value={item.category}
        onChange={(e) => updateField("category", e.target.value)}
        placeholder="Sedan"
      />

      <label className="admin-label" style={{ marginTop: "1rem" }}>Card title (right side)</label>
      <input
        className="admin-input"
        value={item.title || ""}
        onChange={(e) => updateField("title", e.target.value)}
        placeholder="BMW M8 2023"
      />

      <label className="admin-label" style={{ marginTop: "1rem" }}>Card description (right side)</label>
      <input
        className="admin-input"
        value={item.description || ""}
        onChange={(e) => updateField("description", e.target.value)}
        placeholder="Premium full-body detailing & protection"
      />

      <label className="admin-label" style={{ marginTop: "1rem" }}>1st photo (Before)</label>
      <input
        className="admin-input"
        value={item.before || ""}
        onChange={(e) => updateField("before", e.target.value)}
        placeholder="https://..."
      />
      <label className="admin-label" style={{ marginTop: "0.65rem" }}>Or upload from files</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleImageUpload("before", e)}
        className="admin-file"
      />
      {uploadingField === "before" && (
        <p className="admin-hint" style={{ marginTop: "0.4rem", marginBottom: 0 }}>Uploading...</p>
      )}
      {item.before && <img src={item.before} alt="before" className="admin-thumb" />}

      <label className="admin-label" style={{ marginTop: "1rem" }}>2nd photo (After)</label>
      <input
        className="admin-input"
        value={item.after || ""}
        onChange={(e) => updateField("after", e.target.value)}
        placeholder="https://..."
      />
      <label className="admin-label" style={{ marginTop: "0.65rem" }}>Or upload from files</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleImageUpload("after", e)}
        className="admin-file"
      />
      {uploadingField === "after" && (
        <p className="admin-hint" style={{ marginTop: "0.4rem", marginBottom: 0 }}>Uploading...</p>
      )}
      {item.after && <img src={item.after} alt="after" className="admin-thumb" />}
    </div>
  );
}

function PortfolioManager() {
  const [portfolioState, setPortfolioState] = useAdminData(STORAGE_KEYS.portfolio, {
    visible: true,
    items: defaultPortfolio
  });
  const [saved, setSaved] = useState(false);
  const normalizedPortfolio = normalizePortfolioConfig(portfolioState);
  const normalizedItems = normalizedPortfolio.items;

  useEffect(() => {
    const hasLegacyShape = Array.isArray(portfolioState) && portfolioState.some((item) => item.parts);
    if (hasLegacyShape) {
      setPortfolioState({
        visible: true,
        items: normalizedItems
      });
    }
  }, [portfolioState, normalizedItems, setPortfolioState]);

  const updateItem = (index, updated) => {
    const next = [...normalizedItems];
    next[index] = updated;
    setPortfolioState({
      ...normalizedPortfolio,
      items: next
    });
  };

  const addItem = () => {
    setPortfolioState({
      ...normalizedPortfolio,
      items: [...normalizedItems, {
        id: String(Date.now()),
        category: "New tab",
        title: "BMW M8 2023",
        description: "Premium full-body detailing & protection",
        before: "",
        after: ""
      }]
    });
  };

  const removeItem = (index) => {
    if (window.confirm("Remove this portfolio item?")) {
      setPortfolioState({
        ...normalizedPortfolio,
        items: normalizedItems.filter((_, i) => i !== index)
      });
    }
  };

  const handleToggleVisibility = (checked) => {
    setPortfolioState({
      ...normalizedPortfolio,
      visible: checked
    });
  };

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEYS.portfolio, JSON.stringify({
      visible: normalizedPortfolio.visible !== false,
      items: normalizedItems
    }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="admin-section">
      <h3>Portfolio</h3>
      <p className="admin-hint">Add top tabs for portfolio and assign exactly two images for the compare widget (1st photo / 2nd photo).</p>
      <p className="admin-hint" style={{ marginTop: "-0.9rem" }}>
        You can paste image URLs or upload files directly.
      </p>

      <label className="admin-checkbox" style={{ marginBottom: "1rem" }}>
        <input
          type="checkbox"
          checked={normalizedPortfolio.visible !== false}
          onChange={(e) => handleToggleVisibility(e.target.checked)}
        />
        Show "Our Portfolio" section on site (header + section block)
      </label>

      {normalizedItems.map((item, i) => (
        <PortfolioItemEditor
          key={item.id}
          item={item}
          onChange={(updated) => updateItem(i, updated)}
          onRemove={() => removeItem(i)}
        />
      ))}

      <div className="admin-actions">
        <button className="admin-btn admin-btn-outline" onClick={addItem}>+ Add portfolio item</button>
        <button className="admin-btn" onClick={handleSave}>
          {saved ? "Saved!" : "Save portfolio"}
        </button>
      </div>
    </div>
  );
}

/* ── Main Admin Panel ───────────────────────────────── */
export default function AdminPanel() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [tab, setTab] = useState("video");

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      setError("");
    } else {
      setError("Wrong password");
    }
  };

  if (!authed) {
    return (
      <div className="admin-login-page">
        <form className="admin-login-box" onSubmit={handleLogin}>
          <img src="/logo_white.svg" alt="Kaizen Detailers" style={{ width: 48, marginBottom: 16 }} />
          <h2>Admin Panel</h2>
          <p>Enter password to continue</p>
          <input
            type="password"
            className="admin-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
          />
          {error && <p className="admin-error">{error}</p>}
          <button type="submit" className="admin-btn" style={{ width: "100%", marginTop: 12 }}>Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div className="admin-header-inner">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img src="/logo_white.svg" alt="Kaizen Detailers" style={{ width: 32 }} />
            <h1>Kaizen Admin</h1>
          </div>
          <a href="/" className="admin-btn admin-btn-outline" style={{ fontSize: "0.85rem" }}>Back to site</a>
        </div>
      </header>

      <nav className="admin-tabs">
        {[
          { id: "video", label: "Hero Video" },
          { id: "pricing", label: "Pricing" },
          { id: "portfolio", label: "Portfolio" },
        ].map(t => (
          <button
            key={t.id}
            className={`admin-tab ${tab === t.id ? "active" : ""}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <main className="admin-main">
        {tab === "video" && <HeroVideoEditor />}
        {tab === "pricing" && <PricingEditor />}
        {tab === "portfolio" && <PortfolioManager />}
      </main>
    </div>
  );
}

export { STORAGE_KEYS };
