const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;
const MAX_KEYS = 2_000;
const CLEANUP_INTERVAL_MS = 60 * 1000;
const hits = new Map<string, number[]>();
let lastCleanup = 0;

function pruneExpired(now: number) {
  if (now - lastCleanup < CLEANUP_INTERVAL_MS && hits.size < MAX_KEYS) return;
  lastCleanup = now;
  for (const [key, times] of hits) {
    const recent = times.filter((time) => now - time < WINDOW_MS);
    if (recent.length === 0) {
      hits.delete(key);
    } else if (recent.length !== times.length) {
      hits.set(key, recent);
    }
  }
}

export function allowRequest(key: string) {
  const now = Date.now();
  pruneExpired(now);

  const existing = hits.get(key);
  const recent = existing ? existing.filter((time) => now - time < WINDOW_MS) : [];

  if (!existing && hits.size >= MAX_KEYS) {
    const oldestKey = hits.keys().next().value;
    if (oldestKey !== undefined) hits.delete(oldestKey);
  }

  // Refresh key order (LRU) so active/rate-limited clients are not evicted first.
  if (existing) hits.delete(key);

  if (recent.length >= MAX_HITS) {
    hits.set(key, recent);
    return false;
  }

  recent.push(now);
  hits.set(key, recent);
  return true;
}

export function clientKey(request: Request) {
  const trustedHeader = process.env.TRUSTED_IP_HEADER?.trim().toLowerCase();
  const trustedIp = trustedHeader
    ? request.headers.get(trustedHeader)?.split(",")[0]?.trim()
    : undefined;
  const realIp = request.headers.get("x-real-ip")?.trim();
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = trustedIp || realIp || forwarded || "unknown";
  return ip.slice(0, 80);
}
