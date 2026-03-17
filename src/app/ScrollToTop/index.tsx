import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/** Tracks first run across all ScrollToTop instances (main + admin trees). */
let hasRunOnce = false;
let lastPathname = "";

/**
 * Scrolls window to top on client-side navigation (Link/navigate).
 * Does not scroll on refresh or initial load, so the browser can restore scroll.
 */
const ScrollToTop: React.FC = () => {
  const location = useLocation();
  const isFirstRun = useRef(!hasRunOnce);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      hasRunOnce = true;
      lastPathname = location.pathname;
      return;
    }
    if (location.pathname !== lastPathname) {
      lastPathname = location.pathname;
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return null;
};

export default ScrollToTop;
