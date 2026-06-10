import "server-only";
import webpush from "web-push";
import { getSubs, removeSub } from "./store";

const PUBLIC = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
const PRIVATE = process.env.VAPID_PRIVATE_KEY;
const SUBJECT = process.env.VAPID_SUBJECT || "mailto:info@alicilarsigorta.com";

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
