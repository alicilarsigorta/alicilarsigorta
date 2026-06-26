import "server-only";
import webpush from "web-push";
import { getSubs, removeSub } from "./store";

// VAPID anahtarları koda gömülü. Bu dosya "server-only" olduğundan PRIVATE
// anahtar tarayıcıya ASLA gönderilmez. Env değişkeni yanlış/eksik girilse bile
// push çalışsın diye env'e bağlı değiliz (public anahtar zaten gizli değildir).
const PUBLIC = "BLbMOFeXsVXjHdserussSDBCW-Vx4aVOfGE4hBPp0sEBlt8HA6FpMydZA07eyO0mSX2G8axX1Vd54tuI9uSMV5I";
const PRIVATE = "btQ3EUNj-qjpaqEH_LUCo9yRj9-ZiQ498mHVjlRs4rU";
const SUBJECT = (process.env.VAPID_SUBJECT || "mailto:info@alicilarsigorta.com").trim();

export const pushConfigured = Boolean(PUBLIC && PRIVATE);

if (pushConfigured) {
  webpush.setVapidDetails(SUBJECT, PUBLIC!, PRIVATE!);
}

export interface PushPayload {
  title: string;
  body: string;
  url?: string;
}

/** Send a Web Push notification to every saved subscription. Prunes dead ones. */
export async function sendPushToAll(payload: PushPayload): Promise<{ sent: number; failed: number }> {
  if (!pushConfigured) return { sent: 0, failed: 0 };
  const subs = await getSubs();
  let sent = 0;
  let failed = 0;
  await Promise.all(
    subs.map(async (sub) => {
      try {
        await webpush.sendNotification(
          sub as unknown as webpush.PushSubscription,
          JSON.stringify(payload)
        );
        sent++;
      } catch (err: unknown) {
        failed++;
        const code = (err as { statusCode?: number })?.statusCode;
        // 404/410 = subscription gone — remove it.
        if (code === 404 || code === 410) {
          await removeSub(sub.endpoint);
        }
      }
    })
  );
  return { sent, failed };
}
