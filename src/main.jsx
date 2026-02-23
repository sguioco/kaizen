import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import "./styles.css";
import "react-google-reviews/dist/index.css";

const AdminPanel = lazy(() => import("./components/AdminPanel.jsx"));

function registerWarmCacheServiceWorker() {
  if (!("serviceWorker" in navigator)) return;

  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", { scope: "/" });
      registration.update().catch(() => {});

      const requestWarmCache = () => {
        const controller = navigator.serviceWorker.controller;
        if (controller) {
          controller.postMessage({ type: "WARM_CACHE" });
        }
      };

      requestWarmCache();
      navigator.serviceWorker.addEventListener("controllerchange", requestWarmCache, { once: true });
    } catch (_error) {
      // SW is a progressive enhancement; ignore registration failures.
    }
  });
}

function disableServiceWorkerOnLocalDev() {
  if (!("serviceWorker" in navigator)) return false;

  const isLocalhost =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";
  const shouldDisable = import.meta.env.DEV || isLocalhost;
  if (!shouldDisable) return false;

  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => {
      registration.unregister().catch(() => {});
    });
  });

  if ("caches" in window) {
    caches.keys().then((keys) => {
      keys
        .filter((key) => key.startsWith("kaizen-"))
        .forEach((key) => {
          caches.delete(key).catch(() => {});
        });
    });
  }

  return true;
}

if (!disableServiceWorkerOnLocalDev()) {
  registerWarmCacheServiceWorker();
}

function AdminRoute() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#0a0a0a" }} />}>
      <AdminPanel />
    </Suspense>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/kadminsecret" element={<AdminRoute />} />
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
