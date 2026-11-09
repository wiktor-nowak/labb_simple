"use client";

import { useEffect } from "react";
import { preloadRouteVideo } from "../lib/routeVideo";

const DELAY_AFTER_LOAD_MS = 1000;

/* Starts after the page has loaded, so it never competes with the hero. */
export default function RouteVideoPreloader() {
  useEffect(() => {
    let timer: number | undefined;
    const schedule = () => {
      timer = window.setTimeout(preloadRouteVideo, DELAY_AFTER_LOAD_MS);
    };

    if (document.readyState === "complete") {
      schedule();
    } else {
      window.addEventListener("load", schedule, { once: true });
    }

    return () => {
      window.removeEventListener("load", schedule);
      window.clearTimeout(timer);
    };
  }, []);

  return null;
}
