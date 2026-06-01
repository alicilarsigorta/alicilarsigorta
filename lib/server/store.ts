import "server-only";
import { kv } from "@vercel/kv";

/**
 * KV-backed data store (Vercel KV / Upstash Redis).
 * Single-key JSON collections — simple and plenty for an agency's volume.
 * Degrades gracefully when KV env is not yet configured.
 */

export const kvConfigured = Boolean(
  process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
);

const OFFERS_KEY = "offers";
const CONTENT_KEY = "site:content";
const SUBS_KEY = "push:subs";

export type OfferStatus = "pending" | "contacted" | "completed" | "rejected";

export interface Offer {
  id: string;
  name?: string;
  phone: string;
  tcNo?: string;
  birthDate?: string;
  insuranceType: string;
  city?: string;
  notes?: string;
  source?: string;
  status: OfferStatus;
  createdAt: string;
}

/* ── Offers ── */
export async function getOffers(): Promise<Offer[]> {
  if (!kvConfigured) return [];
  return (await kv.get<Offer[]>(OFFERS_KEY)) ?? [];
}

export async function addOffer(
  data: Omit<Offer, "id" | "status" | "createdAt">
): Promise<Offer> {
  if (!kvConfigured) throw new Error("KV_NOT_CONFIGURED");
  const offer: Offer = {
    ...data,
    id: `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  const list = await getOffers();
  list.unshift(offer);
  await kv.set(OFFERS_KEY, list.slice(0, 5000));
  return offer;
}

export async function updateOffer(
  id: string,
  patch: Partial<Pick<Offer, "status" | "notes">>
): Promise<Offer | null> {
  if (!kvConfigured) return null;
  const list = await getOffers();
  let updated: Offer | null = null;
  const next = list.map((o) => {
    if (o.id === id) {
      updated = { ...o, ...patch };
      return updated;
    }
    return o;
  });
  if (updated) await kv.set(OFFERS_KEY, next);
  return updated;
}

export async function deleteOffer(id: string): Promise<boolean> {
  if (!kvConfigured) return false;
  const list = await getOffers();
  const next = list.filter((o) => o.id !== id);
  await kv.set(OFFERS_KEY, next);
  return next.length !== list.length;
}

/* ── Content ── */
export async function getStoredContent<T = unknown>(): Promise<T | null> {
  if (!kvConfigured) return null;
  return (await kv.get<T>(CONTENT_KEY)) ?? null;
}

export async function setStoredContent(content: unknown): Promise<void> {
  if (!kvConfigured) throw new Error("KV_NOT_CONFIGURED");
  await kv.set(CONTENT_KEY, content);
}

/* ── Push subscriptions ── */
export interface PushSub {
  endpoint: string;
  keys: { p256dh: string; auth: string };
}

export async function getSubs(): Promise<PushSub[]> {
  if (!kvConfigured) return [];
  return (await kv.get<PushSub[]>(SUBS_KEY)) ?? [];
}

export async function addSub(sub: PushSub): Promise<void> {
  if (!kvConfigured) throw new Error("KV_NOT_CONFIGURED");
  const subs = await getSubs();
  if (subs.some((s) => s.endpoint === sub.endpoint)) return;
  subs.push(sub);
  await kv.set(SUBS_KEY, subs);
}

export async function removeSub(endpoint: string): Promise<void> {
  if (!kvConfigured) return;
  const subs = await getSubs();
  await kv.set(
    SUBS_KEY,
    subs.filter((s) => s.endpoint !== endpoint)
  );
}
