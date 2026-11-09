/* Test switch: flip to "imagekit" to bring back the preloaded player. */
export const ROUTE_VIDEO_SOURCE: "youtube" | "imagekit" = "youtube";

export const ROUTE_VIDEO_YOUTUBE_ORIGIN = "https://www.youtube-nocookie.com";
export const ROUTE_VIDEO_YOUTUBE_EMBED_URL = `${ROUTE_VIDEO_YOUTUBE_ORIGIN}/embed/jF5cUhPLU-k?enablejsapi=1&rel=0&playsinline=1`;

export const ROUTE_VIDEO_URL =
  "https://ik.imagekit.io/wn3496/LABB/common/LABB-items.mp4";

/* ImageKit serves the video's first frame at this path. */
export const ROUTE_VIDEO_POSTER_URL = `${ROUTE_VIDEO_URL}/ik-thumbnail.jpg`;

/*
 * The video is downloaded by script rather than with the <video> preload
 * attribute, which iPhones ignore. Module state outlives client-side
 * navigation, so the download made on any page is ready on /jak-dotrzec.
 */
let preloadedUrl: string | null = null;
let preloadStarted = false;
const listeners = new Set<() => void>();

type NavigatorWithConnection = Navigator & {
  connection?: { saveData?: boolean };
};

/** Downloads the video once per page load; skipped in data-saver mode. */
export function preloadRouteVideo(): void {
  if (ROUTE_VIDEO_SOURCE !== "imagekit" || preloadStarted) return;
  preloadStarted = true;

  if ((navigator as NavigatorWithConnection).connection?.saveData) return;

  fetch(ROUTE_VIDEO_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Route video request failed: ${response.status}`);
      }
      return response.blob();
    })
    .then((blob) => {
      preloadedUrl = URL.createObjectURL(blob);
      listeners.forEach((listener) => listener());
    })
    .catch((error) => {
      // The player falls back to streaming ROUTE_VIDEO_URL.
      console.error("Failed to preload route video:", error);
    });
}

export function subscribeToPreloadedRouteVideo(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getPreloadedRouteVideo(): string | null {
  return preloadedUrl;
}
