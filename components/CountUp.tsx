"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * Smart number reveal — parses a target value like "20+", "1.2M", "%99",
 * "₺850M" and animates the numeric portion on first scroll-into-view.
 * Designed for hero stat strips and impact bars.
 */

interface CountUpProps {
  /** Display string. Examples: "20+", "500K", "%99", "₺1.2B", "1.247.000+". */
  value: string;
  /** Animation duration in ms. */
  duration?: number;
  /** Optional className for the span. */
  className?: string;
}

// Parse leading numeric portion (with decimals/dots/commas) and split into prefix/number/suffix.
function parse(value: string): { prefix: string; num: number; suffix: string; decimals: number; useTurkishSep: boolean } {
  // Match optional non-digit prefix, then number (with . , as separators), then suffix
  const m = value.match(/^([^\d-]*)([\d.,]+)([^\d]*)$/);
  if (!m) return { prefix: "", num: 0, suffix: value, decimals: 0, useTurkishSep: false };

  const [, prefix, rawNum, suffix] = m;
  // Determine if Turkish thousands separator: dots used as thousands, no comma
  const useTurkishSep = /^\d{1,3}(\.\d{3})+$/.test(rawNum);
  let normalized = rawNum;
  if (useTurkishSep) normalized = rawNum.replace(/\./g, "");
  else normalized = rawNum.replace(/,/g, ".");

  const num = parseFloat(normalized);
  const decimalMatch = normalized.match(/\.(\d+)$/);
  const decimals = decimalMatch ? decimalMatch[1].length : 0;

  return { prefix, num: isNaN(num) ? 0 : num, suffix, decimals, useTurkishSep };
}

function formatNumber(n: number, decimals: number, useTurkishSep: boolean): string {
  if (decimals > 0) {
    return n.toFixed(decimals).replace(".", ",");
  }
  const rounded = Math.round(n);
  if (useTurkishSep) {
    return rounded.toLocaleString("tr-TR");
  }
  return rounded.toString();
}

export default function CountUp({ value, duration = 1600, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState<string>(() => {
    const p = parse(value);
    return `${p.prefix}${formatNumber(0, p.decimals, p.useTurkishSep)}${p.suffix}`;
  });

  useEffect(() => {
    if (!inView) return;
    const { prefix, num, suffix, decimals, useTurkishSep } = parse(value);

    if (num === 0) {
      setDisplay(value);
      return;
    }

    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      const current = num * eased;
      setDisplay(`${prefix}${formatNumber(current, decimals, useTurkishSep)}${suffix}`);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className} aria-label={value}>
      {display}
    </span>
  );
}
