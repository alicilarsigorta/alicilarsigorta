import "server-only";
import { Redis } from "@upstash/redis";

/**
 * Redis-backed data store (Vercel KV / Upstash).
 * Accepts either env naming — Vercel KV (KV_REST_API_*) or the Upstash
 * marketplace integration (UPSTASH_REDIS_REST_*).
 * Degrades gracefully when no Redis env is configured yet.
 */
const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

export const kvConfigured = Boolean(REDIS_URL && REDIS_TOKEN);

const redis = kvConfigured ? new Redis({ url: REDIS_URL!, token: REDIS_TOKEN! }) : null;

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
  if (!redis) return [];
  return (await redis.get<Offer[]>(OFFERS_KEY)) ?? [];
}

export async function addOffer(
  data: Omit<Offer, "id" | "status" | "createdAt">
): Promise<Offer> {
  if (!redis) throw new Error("KV_NOT_CONFIGURED");
  const offer: Offer = {
    ...data,
    id: `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  const list = await getOffers();
  list.unshift(offer);
  await redis.set(OFFERS_KEY, list.slice(0, 5000));
  return offer;
}

export async function updateOffer(
  id: string,
  patch: Partial<Pick<Offer, "status" | "notes">>
): Promise<Offer | null> {
  if (!redis) return null;
  const list = await getOffers();
  let updated: Offer | null = null;
  const next = list.map((o) => {
    if (o.id === id) {
      updated = { ...o, ...patch };
      return updated;
    }
    return o;
  });
  if (updated) await redis.set(OFFERS_KEY, next);
  return updated;
}

export async function deleteOffer(id: string): Promise<boolean> {
  if (!redis) return false;
  const list = await getOffers();
  const next = list.filter((o) => o.id !== id);
  await redis.set(OFFERS_KEY, next);
  return next.length !== list.length;
}

/* ── Content ── */
export async function getStoredContent<T = unknown>(): Promise<T | null> {
  if (!redis) return null;
  return (await redis.get<T>(CONTENT_KEY)) ?? null;
}

export async function setStoredContent(content: unknown): Promise<void> {
  if (!redis) throw new Error("KV_NOT_CONFIGURED");
  await redis.set(CONTENT_KEY, content);
}

/* ── Push subscriptions ── */
export interface PushSub {
  endpoint: string;
  keys: { p256dh: string; auth: string };
}

export async function getSubs(): Promise<PushSub[]> {
  if (!redis) return [];
  return (await redis.get<PushSub[]>(SUBS_KEY)) ?? [];
}

export async function addSub(sub: PushSub): Promise<void> {
  if (!redis) throw new Error("KV_NOT_CONFIGURED");
  const subs = await getSubs();
  if (subs.some((s) => s.endpoint === sub.endpoint)) return;
  subs.push(sub);
  await redis.set(SUBS_KEY, subs);
}

export async function removeSub(endpoint: string): Promise<void> {
  if (!redis) return;
  const subs = await getSubs();
  await redis.set(
    SUBS_KEY,
    subs.filter((s) => s.endpoint !== endpoint)
  );
}
