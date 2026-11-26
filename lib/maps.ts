export type MapPoint = [number, number] | string;

const MAX_CACHE_ENTRIES = 200;
const ALLOWED_MAP_HOSTS = new Set(["maps.app.goo.gl", "goo.gl", "maps.google.com", "www.google.com"]);
const resolvedLinkCache = new Map<string, string>();

function isAllowedMapUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "https:" && ALLOWED_MAP_HOSTS.has(parsed.hostname.toLowerCase());
  } catch {
    return false;
  }
}

export function extractPlaceCid(url: string): string | null {
  const match = url.match(/!1s0x[0-9a-fA-F]+:0x([0-9a-fA-F]+)/);
  return match ? BigInt(`0x${match[1]}`).toString() : null;
}

export function extractCoords(url: string): [number, number] | null {
  const pinMatch = url.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/);
  if (pinMatch) return [Number(pinMatch[1]), Number(pinMatch[2])];
  const atMatch = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (atMatch) return [Number(atMatch[1]), Number(atMatch[2])];
  const searchMatch = url.match(/\/(?:search|place)\/(-?\d+\.\d+),(?:\+|%20|\s)*(-?\d+\.\d+)/);
  if (searchMatch) return [Number(searchMatch[1]), Number(searchMatch[2])];
  return null;
}

export async function resolveMapEmbed(query: string, point?: MapPoint): Promise<string> {
  if (Array.isArray(point)) {
    const q = `${point[0]},${point[1]}`;
    return `https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=16&hl=tr&output=embed`;
  }

  if (typeof point === "string" && point.trim()) {
    const raw = point.trim();
    if (raw.includes("output=embed") || raw.includes("/maps/embed")) {
      return raw;
    }

    let resolvedUrl = resolvedLinkCache.get(raw) ?? raw;
    if (!extractCoords(resolvedUrl) && !extractPlaceCid(resolvedUrl) && isAllowedMapUrl(resolvedUrl)) {
      try {
        const res = await fetch(resolvedUrl, {
          method: "HEAD",
          redirect: "manual",
          next: { revalidate: 86400 },
          signal: AbortSignal.timeout(4_000),
        });
        const location = res.headers.get("location");
        if (location) {
          resolvedUrl = location;
          if (resolvedLinkCache.size >= MAX_CACHE_ENTRIES) {
            const oldestKey = resolvedLinkCache.keys().next().value;
            if (oldestKey !== undefined) resolvedLinkCache.delete(oldestKey);
          }
          resolvedLinkCache.set(raw, location);
        }
      } catch {
        // Fallback to mapQuery below if short link cannot be resolved
      }
    }

    const coords = extractCoords(resolvedUrl);
    if (coords) {
      const q = `${coords[0]},${coords[1]}`;
      return `https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=16&hl=tr&output=embed`;
    }

    const cid = extractPlaceCid(resolvedUrl);
    if (cid) {
      return `https://maps.google.com/maps?cid=${cid}&z=16&hl=tr&output=embed`;
    }
  }

  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=16&hl=tr&output=embed`;
}
