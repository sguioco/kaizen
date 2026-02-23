import React from "react";
import { useInView } from "motion/react";
import { useCallback, useEffect, useRef } from "react";

export default function CountUp({
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
        const progress = Math.min((now - startedAt) / (safeDuration * 1000), 1);
        // Keep movement visible but finish crisp.
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

    delayRef.current = setTimeout(animateFromTo, delay * 1000);

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

  return <span className={className} ref={ref} />;
}
