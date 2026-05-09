import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls window to the top on every route change.
 * Skips when navigation state has preventScroll:true
 * (used by TopNav's IntersectionObserver during homepage section scrolling).
 * Also skips if navigating between different sections of the home page,
 * allowing smooth scrolling to function properly without being interrupted.
 */
export default function ScrollToTop() {
  const { pathname, state } = useLocation();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    // These paths all render the HomePage component and use smooth scroll to jump to sections
    const homePagePaths = [
      "/", 
      "/services", 
      "/testimonials", 
      "/offers", 
      "/contact", 
      "/faqs", 
      "/bmi-calculator", 
      "/blog-section",
      "/transformations-section"
    ];

    const wasHome = homePagePaths.includes(prevPathname.current);
    const isHome = homePagePaths.includes(pathname);

    prevPathname.current = pathname;

    if (state?.preventScroll) return;

    // If navigating from one home section to another, don't snap to top
    if (wasHome && isHome) return;

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, state]);

  return null;
}
