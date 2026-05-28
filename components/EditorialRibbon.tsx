"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useContent } from "@/lib/content-context";

/**
 * EditorialRibbon — magazine-style top ticker that replaces the old auto-rotating
 * campaign carousel. Sits below the header, above the hero. Conveys "ongoing
 * campaigns" as a continuous, newsroom-feeling ticker rather than an attention-
 * stealing slider. Dark ink background, gold accent, infinite horizontal scroll.
 */
export default function EditorialRibbon() {
  const { content } = useContent();
  const campaigns = content.campaigns;

  if (campaigns.length === 0) return null;

  // Duplicate the array so the marquee loop is seamless.
  const items = [...campaigns, ...campaigns];

  return (
    <div className="ed-ribbon" aria-label="Güncel kampanyalar">
      <div className="ed-ribbon-inner">
        <span className="ed-ribbon-label">
          Bültende · Güncel
        </span>

        <div className="ed-ribbon-track-wrap">
          <div className="ed-ribbon-track">
            {items.map((c, i) => (
              <span className="ed-ribbon-item" key={`${c.id}-${i}`} aria-hidden={i >= campaigns.length}>
                <span className="byline" style={{ color: "var(--gold-light)" }}>
                  {c.tag}
                </span>
                <span className="ed-ribbon-item-sep">/</span>
                <em>{c.title}</em>
                <span className="ed-ribbon-item-sep">·</span>
                <strong>Teklif al →</strong>
              </span>
            ))}
          </div>
        </div>

        <Link href="/teklif-al" className="ed-ribbon-cta">
          Hemen Teklif
          <ArrowUpRight size={14} strokeWidth={2.4} />
        </Link>
      </div>
    </div>
  );
}
