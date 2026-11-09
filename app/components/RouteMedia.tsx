"use client";

import Image from "next/image";
import { useRef, useState, useSyncExternalStore } from "react";
import {
  getPreloadedRouteVideo,
  ROUTE_VIDEO_POSTER_URL,
  ROUTE_VIDEO_SOURCE,
  ROUTE_VIDEO_URL,
  ROUTE_VIDEO_YOUTUBE_EMBED_URL,
  ROUTE_VIDEO_YOUTUBE_ORIGIN,
  subscribeToPreloadedRouteVideo,
} from "../lib/routeVideo";

type Tab = "video" | "scheme";

const TABS: { id: Tab; label: string }[] = [
  { id: "video", label: "trasa" },
  { id: "scheme", label: "mapa" },
];

export default function RouteMedia() {
  const [activeTab, setActiveTab] = useState<Tab>("video");
  const [lockedSrc, setLockedSrc] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const youtubeRef = useRef<HTMLIFrameElement>(null);

  const preloadedSrc = useSyncExternalStore(
    subscribeToPreloadedRouteVideo,
    getPreloadedRouteVideo,
    () => null,
  );

  /* Changing src restarts the video, so it is fixed once the visitor engages. */
  const src = lockedSrc ?? preloadedSrc ?? ROUTE_VIDEO_URL;
  const lockSrc = () => setLockedSrc(src);

  const selectTab = (tab: Tab) => {
    if (tab !== "video") {
      videoRef.current?.pause();
      youtubeRef.current?.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func: "pauseVideo", args: [] }),
        ROUTE_VIDEO_YOUTUBE_ORIGIN,
      );
    }
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="py-2">
        {/* Equal columns let the highlight slide by exactly one tab width. */}
        <div
          role="group"
          aria-label="Sposób pokazania trasy"
          className="relative inline-grid grid-cols-2"
        >
          <span
            aria-hidden
            className={`absolute inset-y-0 left-0 w-1/2 rounded-sm border border-signal transition-transform duration-300 ease-out motion-reduce:transition-none ${
              activeTab === "video" ? "translate-x-0" : "translate-x-full"
            }`}
          />
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              aria-pressed={id === activeTab}
              onClick={() => selectTab(id)}
              className="relative cursor-pointer rounded-sm px-4 py-2 text-center font-magion text-sm uppercase tracking-[0.2em] text-paper"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative aspect-video overflow-hidden rounded-lg bg-ink">
        {/* Stays mounted on the other tab, so the video keeps its position. */}
        {ROUTE_VIDEO_SOURCE === "youtube" ? (
          <iframe
            ref={youtubeRef}
            src={ROUTE_VIDEO_YOUTUBE_EMBED_URL}
            title="Film pokazujący drogę do drzwi studia"
            className={`h-full w-full border-0 ${activeTab === "video" ? "" : "hidden"}`}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <video
            ref={videoRef}
            src={src}
            poster={ROUTE_VIDEO_POSTER_URL}
            aria-label="Film pokazujący drogę do drzwi studia"
            className={`h-full w-full ${activeTab === "video" ? "" : "hidden"}`}
            preload="metadata"
            controls
            controlsList="nodownload noplaybackrate"
            disablePictureInPicture
            muted
            playsInline
            onPlay={lockSrc}
            onSeeking={lockSrc}
          />
        )}
        {activeTab === "scheme" && (
          <>
            <Image
              src="/schemes/route_scheme.png"
              alt="Trasa dojazdu do studia"
              fill
              sizes="(max-width: 719px) 100vw, 60vw"
              className="object-cover"
            />
            <span className="absolute right-2 bottom-2 rounded-sm bg-ink/60 px-1.5 py-0.5 text-[11px] leading-none text-paper">
              © Google
            </span>
          </>
        )}
      </div>
    </div>
  );
}
